import { randomInt, styleElem } from "./globalFunctions";
/* 2.3 - Circle Object */
export function Circle(value, randomX, randomY) {
  // Prototyping
  this.value = value;
  this.randomX = randomX;
  this.randomY = randomY;
  let moveCircle;
  let circle = document.createElement("input");
  circle.setAttribute("type", "button");
  circle.setAttribute("value", value);
  let cSTYLE =
    "width: 60px; height: 60px; max-width: 60px; max-height: 60px;" +
    "box-sizing: border-box; -webkit-box-sizing: border-box;" +
    "font-size: 50px; border-radius: 100%; text-decoration: none;" +
    "color: #F5A623; border: 4px solid #F5A623; cursor: pointer; position: absolute;" +
    "left: " +
    randomX +
    "px;" +
    "top: " +
    randomY +
    "px;" +
    "transition: box-shadow 0.3s, background-color 0.5s;" +
    "background-color: transparent;" +
    "outline: 0; padding: 0; margin: 0; text-align: center;" +
    "font-weight: 500;";
  styleElem(circle, cSTYLE);
  const style = circle.style;
  /* chage style with hover effect */
  circle.onmouseover = function () {
    style.boxShadow = "0px 0px 20px #F5A623";
  };
  circle.onmouseout = function () {
    style.boxShadow = "none";
  };
  circle.onfocus = function () {
    style.outline = "none";
  };
  // disable circle
  function disable() {
    circle.setAttribute("disabled", "disabled");
    style.opacity = "0.7";
    style.cursor = "default";
    style.boxShadow = "none";
  }
  /* properties for moving the object */
  // frame per second
  const FPS = 60;
  // element size
  // let elementSize = "60px";
  // element x position, y Position
  let elementXPos;
  let elementYPos;
  // element X speed, Y speed
  let Xspeed;
  let Yspeed;
  // edges
  let width = 260;
  let height = 260;
  // element starting position
  elementXPos = randomX;
  elementYPos = randomY;
  // element speed
  Xspeed = 15 / FPS;
  Yspeed = 15 / FPS;
  // random direction
  if (randomInt(0, 1) == 0) {
    Xspeed = -Xspeed;
  }
  if (randomInt(0, 1) == 0) {
    Yspeed = -Yspeed;
  }
  // UPDATE FUNCTION
  function update() {
    elementXPos += Xspeed;
    elementYPos += Yspeed;
    circle.style.left = elementXPos + "px";
    circle.style.top = elementYPos + "px";
    // change direction randomly
    if (randomInt(0, 150) == 1) {
      Xspeed = -Xspeed;
    }
    if (randomInt(0, 150) == 1) {
      Yspeed = -Yspeed;
    }
    // Horizontal movement
    if (elementXPos < 0 && Xspeed < 0) {
      Xspeed = -Xspeed;
    }
    if (elementXPos > width && Xspeed > 0) {
      Xspeed = -Xspeed;
    }
    // Vertical movement
    if (elementYPos < 0 && Yspeed < 0) {
      Yspeed = -Yspeed;
    }
    if (elementYPos > height && Yspeed > 0) {
      Yspeed = -Yspeed;
    }
  } // update
  // methodes for the circle
  return {
    circle,
    hideValue: function () {
      style.fontSize = "0px";
    },
    showValue: function () {
      style.fontSize = "54px";
    },
    move: function () {
      moveCircle = setInterval(update, 800 / FPS);
    },
    stop: function () {
      for (let i = 0; i < 100; i++) {
        window.clearInterval(moveCircle);
      }
      disable();
    },
    rightPlay: function () {
      disable();
      //      style.backgroundColor = '#138b13';
    },
    wrongPlay: function () {
      disable();
      circle.setAttribute("value", "X");
      //      style.backgroundColor = colors.redOrange;
    },
    disable: function () {
      disable();
    },
  };
}
