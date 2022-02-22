import React from "react";

export default function Player(props) {
  return (
    <div>
      <h1>{props.name}</h1>
      <p>Score: {props.score}</p>
    </div>
  );
}
