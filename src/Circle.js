
/*
  CIRCLE OBJECT
*/



import { randomInt } from "./globalFunctions"; 

export class Circle {
  constructor(value, randomX, randomY) {

    // Prototyping
    this.value = value;
    this.randomX = randomX;
    this.randomY = randomY;


    let moveCircle;
    let circle = document.createElement("input");
    circle.setAttribute("type", "button");
    circle.setAttribute("value", value);


    // STYLE OF THE CIRCLE
    const style = circle.style;
    style.width = "65px";
    style.height = "65px";
    style.position = "absolute";
    style.left = randomX + "px";
    style.top = randomY + "px";
    style.backgroundColor = "#f77436";
    style.color = "#ffffff";
    style.fontSize = "54px";
    style.textAlign = "center";
    style.borderRadius = "100%";
    style.cursor = "pointer";
    style.outline = "none";
    style.opacity = "0.8";
    style.transition = "box-shadow 0.3s, background-color 0.5s";
    
   


    /* chage style with hover effect */
    this.onmouseover = function () {
      style.boxShadow = "0px 4px 11px rgba(255, 112, 46, 0.32);";
    };
    this.onmouseout = function () {
      style.boxShadow = "none";
    };
    this.onfocus = function () {
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
}




