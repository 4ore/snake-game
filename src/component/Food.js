import React from "react";

export default (props) => {
  const style = {
    left: `${props.dot[0]}%`,
    top: `${props.dot[1]}%`,
    background: `green`,
  };

  switch (props.dot[2]) {
    case 1:
      style.background = `green`;
      break;
    case 5:
      style.background = `yellow`;
      break;
    case 10:
      style.background = `red`;
      break;
  }

  return <div className="snake-food" style={style}></div>;
};
