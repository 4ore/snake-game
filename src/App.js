import { Component } from "react";
import "./App.css";
import Snake from "./component/Snake";
import Food from "./component/Food";
import Player from "./component/Player";

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let typesOfFood = [1, 5, 10];
  let score = typesOfFood[Math.floor(Math.random() * typesOfFood.length)];
  return [x, y, score];
};

const getUserName = () => {
  const userName = prompt("Whats your name?");
  return userName;
};

const initialState = {
  food: getRandomCoordinates(),
  speed: 200,
  gear: 1,
  direction: "RIGHT",
  snakeDots: [
    [0, 0],
    [2, 0],
  ],
  score: 0,
  timer: null,
};

class App extends Component {
  state = {
    ...initialState,
    players: [{ name: "UserBord", score: "---" }],
  };
  componentDidMount() {
    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }
  componentWillUpdate() {
    /*this.checkIfOutBorders();*/
    this.checkIfCollapsed();
    this.checkIfEat();
  }

  runGame() {
    clearInterval(this.state.timer);
    let timer = setInterval(this.moveSnake, this.state.speed);
    this.setState({ timer });
  }

  onKeyDown = (e) => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({ direction: "UP" });
        break;
      case 40:
        this.setState({ direction: "DOWN" });
        break;
      case 37:
        this.setState({ direction: "LEFT" });
        break;
      case 39:
        this.setState({ direction: "RIGHT" });
        break;
    }
  };

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
    }
    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots,
    });
  };

  /*checkIfOutBorders() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.setState({ direction: "NONE" });
      this.onGameOver();
      console.log("out");
    }
  }*/

  checkIfCollapsed() {
    let snake = [...this.state.snakeDots];
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach((dot) => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver();
      }
    });
  }

  checkIfEat() {
    let head = this.state.snakeDots[this.state.snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({
        food: getRandomCoordinates(),
        score: this.state.score + this.state.food[2],
      });
      this.enLargeSnake();
      console.log(this.state.score / 50);
      if (this.state.score / 50 >= this.state.gear) {
        this.setState({ gear: this.state.gear + 1 });
        this.increaseSpeed();
      }
    }
  }

  enLargeSnake() {
    let newSnake = [...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState({
      snakeDots: newSnake,
    });
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({
        speed: this.state.speed - 10,
      });
      clearInterval(this.state.timer);
      this.runGame();
    }
  }

  onGameOver() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }
    alert(`Game Over, Snake length is ${this.state.score}`);
    let player = {
      name: getUserName(),
      score: this.state.score,
    };
    let players2 = [...this.state.players];
    players2.push(player);
    this.setState({ players: players2 });
    this.setState(initialState);
  }

  render() {
    return (
      <div>
        <div className="game-area">
          <Snake snakeDots={this.state.snakeDots} />
          <Food dot={this.state.food} />
        </div>
        <div>
          {this.state.players
            .sort((a, b) => b.score - a.score)
            .map((player, id) => (
              <Player key={id} name={player.name} score={player.score} />
            ))}
        </div>
      </div>
    );
  }
}

export default App;
