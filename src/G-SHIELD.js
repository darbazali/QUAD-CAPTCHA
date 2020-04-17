/*

Software Name   : gCAPTCHA (game CAPTCHA)
Version         : 1.0
Author          : Darbaz Ali
Date            : july / 2018
Location        : Kurdistan / Iraq
Technology      : javascript, Web
Aim             : Internet Bot

Description:

gCAPTCHA is a brand new, GAME based
CAPTCHA system that focuses on human thinking
and memorizing.

*/

/*---------- general purpose functions ----------*/

import {
  createDiv,
  styleElem,
  append,
  shuffle,
  createCircles,
  makeSortedModel,
} from "./globalFunctions";
import { Circle } from "./Circle";
import { Scroll } from "./Scroll";
import { Icons } from "./Icons";
import { SVG } from "./SVG";

//let println = console.log;

const gCLink =
  'Home Page: <a href="https://darbaz.design/projects/g-shield.html" style="color: #F5A623">Learn More</a>';

// IIFE: deploying viewport meta tag to the page.
(function () {
  let viewPort = document.createElement("meta");
  viewPort.setAttribute("name", "viewport");
  viewPort.setAttribute("content", "width=device-width, initial-scale=1.0");

  document.getElementsByTagName("head")[0].appendChild(viewPort);
})();

/* 2.1 - Anchor */
function Anchor() {
  // common styles for checkBox element
  function styleCheckbox(element) {
    const style = element.style;

    style.height = "30px";
    style.width = "30px";
    style.border = "1px solid #999";
    style.borderRadius = "2px";
    style.backgroundColor = "fff";
    style.color = "#00ff00";
    style.marginRight = "10px";
    style.padding = "0";
    style.fontSize = "30px";
    style.textAlign = "center";
    style.cursor = "pointer";
  }

  // elements
  const anchor = document.createElement("div");
  const checkbox = document.createElement("div");
  const checkedBox = checkbox.cloneNode(true);
  const title = document.createElement("div");
  const target = document.querySelector(".d-captcha-div");
  const submit = document.querySelector(".d-captcha-submit");
  //  const d_c_anchor = target[0];
  const checkMark = "&#10003";

  // assembling
  title.innerHTML = "I'm not a robot";
  append(anchor, checkbox);
  append(anchor, title);
  append(target, anchor);

  // styles
  var style = anchor.style;
  var title_style = title.style;

  // anchor style
  style.width = "300px";
  style.height = "80px";
  style.boxSizing = "border-box";
  style.backgroundColor = "#999";
  style.color = "#0000ff";
  style.border = "1px solid #0000ff";
  style.borderRadius = "8px";
  style.display = "flex";
  style.fontSize = "25px";
  style.padding = "20px 10px";
  style.marginBottom = "10px";

  // checkBox style
  styleCheckbox(checkbox);
  checkbox.style.transition = "box-shadow 0.3s";
  checkbox.style.borderRadius = "3px";
  checkbox.onmousemove = function () {
    checkbox.style.boxShadow = "0 0 10px #7b7b7b";
  };

  checkbox.onmouseout = function () {
    checkbox.style.boxShadow = "none";
  };

  // checkedBox style
  styleCheckbox(checkedBox);
  checkedBox.innerHTML = checkMark;
  checkedBox.style.cursor = "default";

  // title stile
  title_style.cursor = "default";
  title_style.color = "inherit";

  checkbox.onclick = function () {
    let wHeight = window.innerHeight;

    if (wHeight < 450) {
      alert("Please put your device in Portraite mode, and try again!");
    } else {
      UI.open();
      UI.centerUI();
      buildGame();
      SCROLL.disable();
    }
  };

  return {
    checked: function () {
      checkbox.parentNode.replaceChild(checkedBox, checkbox);
      submit.setAttribute("disabled", "false");
    },
  };
}

const ICON = new Icons();

/* 2.2 - UI */
function UIObject() {
  /*--------- private functions --------*/

  function fade(element) {
    let style = element.style;
    let styled = window
      .getComputedStyle(element, null)
      .getPropertyValue("opacity");

    if (styled == 0) {
      style.visibility = "visible";
      style.opacity = "1";
    } else {
      style.visibility = "hidden";
      style.opacity = "0";
    }
  }

  // function fadeCont(element) {
  //   let style = element.style;
  //   style.opacity = "0";
  //   style.visibility = "hidden";
  // }

  function toggle(node, element, toggle, func) {
    // node: parent node for the element.
    // element: the element to be toggled.
    // toggle: if true? toggle, else: remove element.
    // func: a callback tha runs when elment is toggled.

    if (toggle) {
      if (node.lastChild == element) {
        node.removeChild(element);
        func();
      } else {
        append(node, element);
      }
    } else {
      if (node.lastChild == element) {
        node.removeChild(element);
      }
    }
  }

  // clear all intervals
  function clearIntervals() {
    for (let i = 0; i < 100; i++) {
      window.clearInterval(i);
    }
  }

  // check if a node is in page
  function isInPage(node) {
    if (document.body.contains(node)) {
      return true;
    } else {
      return false;
    }
  }

  /*--------- creating elements --------*/

  const overlay = createDiv();
  const wrapper = createDiv();
  const backGround = createDiv();
  const frame = createDiv();

  const container = createDiv();

  const titleBlock = createDiv();

  // const popUp = createDiv();
  const timer = createDiv();
  const info = createDiv();
  const buttonBlock = createDiv();

  const popUPBlock = createDiv();
  const successPOPUP = createDiv();
  const failPOPUP = createDiv();

  /*--------- Styles of the UI --------*/
  const STYLES = {
    // styles / general
    resetStyle:
      "font-family: Arial; paddng: 0; margin: 0; box-sizing: border-box;",
    centerStyle: "left: 50%; top: 50%; transform: translate(-50%, -50%);",
    boxShadow: "box-shadow: 0 0 20px #333333;",
    absPos: "position: absolute;",
    borderBox: "box-sizing: border-box; -webkit-box-sizing: border-box;",

    // styles / specific
    // overlay style
    overlayStyle:
      "position: absolute;" +
      "width: " +
      window.innerWidth +
      "px;" +
      "height: " +
      window.innerHeight +
      "px;" +
      "top: " +
      window.pageYOffset +
      "px;" +
      "left: " +
      window.pageXOffset +
      "px;" +
      "background-color: rgba(72, 72, 72, 0.8);" +
      "color: #fff; font-family: Arial;",

    // wrapper style
    wrapperStyle:
      "width: 320px; height: 450px; border-radius: 30px;" +
      "background-color: transparent;  position: relative;",

    frameStyle:
      "width: 320px; height: 450px; border-radius: 30px;" +
      " background-color: transparent;",

    // info style
    infoStyle:
      "width: 300px; height: 300px; font-size: 22px; text-align: left;" +
      "margin: 5px 5px; border-radius: 10px; cursor: default; position: absolute;" +
      "background-color: transparent; padding: 5px 10px; opacity: 0.9;" +
      "color: #F5A623;",

    /* title style */
    titleBlockStyle:
      "width: 100%; height: 70px; margin: 0; padding: 5px 0;" +
      "font-size: 26px; font-weight: bold; background-color: " +
      "rgba(0,0,0,0)" +
      "; text-align: center;",

    titleStyle: "margin: 0; padding: 0; cursor: default; color: #F5A623",

    // button container style
    buttonBlockStyle:
      "width: 320; height: 60px; margin-top: 5px; padding: 0;" +
      "background-color: " +
      "rgba(0,0,0,0)" +
      ";",

    // container style
    containerStyle:
      "width: 320px; height: 320px; margin: 0 auto; position: relative;" +
      "background-color: transparent;" +
      "border-top: 1px solid #915f0b; border-bottom: 1px solid #915f0b;",

    timerStyle:
      "width: 100px; height: 40px; border: 4px solid #F5A623; border-radius: 5px;" +
      "text-align: center; font-size: 28px; position: absolute; cursor: default; color: #F5A623;" +
      "background-color:" +
      "rgba(0,0,0,0)" +
      "; font-weight: 500; padding: 8px;",

    popUPBlockStyle:
      "width: 320px; height: 320px; background-color: #4A4A4A;" +
      "font-size: 32px;",

    faded:
      "display: block; opacity: 0; visibility: hidden; transition: visibility .5s linear, opacity .5s linear;",
  };

  // TODO: modify UI style

  // horizontal line breaker
  const lineBreak =
    '<hr style="height:1px;border:none;color:#ccc;background-color:#F5A623; margin: 10px 0; opacity: 0.9;"/>';

  /* 1. instruction message */
  const infoMSG =
    "<p>Look at the Circles for 3sec, after the numbers desapeard, click them One-by-One in the Ascending Order." +
    lineBreak +
    "Click on the reload button for new game.</p>" +
    lineBreak +
    gCLink;

  // text for title
  const titleMSg =
    "<p>Memorize the numbers<br/>" + " in the Ascending Order.</p>";

  backGround.innerHTML = SVG.frameBack;
  info.innerHTML = infoMSG;
  successPOPUP.innerHTML = SVG.successPopUP;
  failPOPUP.innerHTML = SVG.failPopUP;

  // Assembling
  append(overlay, wrapper);
  append(wrapper, backGround);
  append(wrapper, frame);
  append(frame, titleBlock);
  append(frame, container);
  append(frame, buttonBlock);
  //  append(frame, popUPBlock);
  append(frame, failPOPUP);
  append(frame, successPOPUP);

  append(buttonBlock, ICON.infoBtn);
  append(buttonBlock, ICON.restartBtn);
  append(buttonBlock, ICON.closeBtn);

  titleBlock.innerHTML = titleMSg;
  const title = titleBlock.firstChild;

  /*--------- Styling the components --------*/

  styleElem(
    overlay,
    STYLES.resetStyle + STYLES.overlayStyle + STYLES.borderBox
  );
  styleElem(wrapper, STYLES.wrapperStyle + STYLES.centerStyle);
  styleElem(backGround, STYLES.absPos + STYLES.frameStyle + STYLES.centerStyle);
  styleElem(frame, STYLES.absPos + STYLES.frameStyle + STYLES.centerStyle);
  styleElem(titleBlock, STYLES.titleBlockStyle + STYLES.resetStyle);
  styleElem(title, STYLES.titleStyle);
  styleElem(container, STYLES.containerStyle);
  styleElem(buttonBlock, STYLES.resetStyle + STYLES.buttonBlockStyle);
  styleElem(timer, STYLES.timerStyle + STYLES.centerStyle + STYLES.boxShadow);
  styleElem(info, STYLES.infoStyle + STYLES.centerStyle);

  styleElem(
    popUPBlock,
    STYLES.centerStyle + STYLES.absPos + STYLES.popUPBlockStyle + STYLES.faded
  );
  styleElem(successPOPUP, STYLES.centerStyle + STYLES.absPos + STYLES.faded);
  styleElem(failPOPUP, STYLES.centerStyle + STYLES.absPos + STYLES.faded);

  // Centering with resize event
  window.onresize = function () {
    // center the UI to the screen
    if (isInPage(overlay)) {
      overlay.style.width = window.innerWidth + "px";
      overlay.style.height = window.innerHeight + "px";
      overlay.style.top = window.pageYOffset + "px";
      overlay.style.left = window.pageXOffset + "px";
    }

    // close the game if width of the window is < 500px.
    if (window.innerHeight < 500) {
      if (isInPage(overlay)) {
        UI.close();
        SCROLL.enable();
      }
    }

    // scale size of the UI with 1.3 for bigger screens.
    if (window.innerHeight > 700 && window.innerWidth > 1200) {
      overlay.style.transform = "scale(1.4)";
      overlay.style.msTransform = "scale(1.4)";
    }
  };

  window.onscroll = function () {
    overlay.style.top = window.pageYOffset + "px";
    overlay.style.left = window.pageXOffset + "px";
  };

  // close button event
  ICON.closeBtn.onclick = function () {
    // at this point we have to clear all intervals
    clearIntervals();
    UI.close();
    SCROLL.enable();
    this.style.transform = "scale(1)";
    this.style.opacity = "0.8";

    toggle(frame, info);
  };

  // restart button action
  ICON.restartBtn.onclick = function () {
    //    UI.removeTimer();
    UI.clearContainer();

    toggle(frame, info);
    toggle(frame, failPOPUP);
    clearIntervals();

    //    fadeCont(popUPBlock);

    reStart();
  };

  ICON.infoBtn.onclick = function () {
    clearIntervals();
    UI.removeTimer();
    UI.clearContainer();
    //    popUp.innerHTML = infoMSG;
    fade(popUPBlock);
    toggle(frame, info, true, reStart);
  };

  /*--------- properties and methodes --------*/
  return {
    container: function () {
      return container;
    },

    centerUI: function () {
      if (isInPage(overlay)) {
        let style = overlay.style;
        style.width = window.innerWidth + "px";
        style.height = window.innerHeight + "px";
        style.top = window.pageYOffset + "px";
        style.left = window.pageXOffset + "px";
      }
    },

    open: function () {
      return document.body.appendChild(overlay);
    },

    close: function () {
      clearIntervals();
      if (isInPage(overlay)) {
        document.body.removeChild(overlay);
      }
    },

    //    timer: function (func) {
    //      popUPBlock.style.opacity = '1';
    //      popUPBlock.style.visibility = 'visible';
    //      append(wrapper, timer);
    //      let seconds = 1;
    //      let timerId = setInterval(updateTimer, 1000);
    //
    //      timer.innerHTML = seconds;
    //
    //      function updateTimer() {
    //        seconds--;
    //        timer.innerHTML = seconds;
    //
    //        if (seconds === 0) {
    //          clearInterval(timerId);
    //          setTimeout(function () {
    //            wrapper.removeChild(timer);
    //
    //            popUPBlock.style.opacity = '0';
    //            popUPBlock.style.visibility = 'hidden';
    //
    //            func()
    //          }, 1000);
    //
    //        }
    //      }
    //    },

    ready: function (func) {
      popUPBlock.style.opacity = "1";
      popUPBlock.style.visibility = "visible";
      append(frame, timer);
      timer.innerHTML = "Ready!";
      setTimeout(function () {
        frame.removeChild(timer);
        popUPBlock.style.opacity = "0";
        popUPBlock.style.visibility = "hidden";
        func(); // start game after showing ready alert.
      }, 1500);
    },

    failPOPUp: function () {
      fade(failPOPUP);
    },

    successPOPUp: function () {
      fade(successPOPUP);
    },

    clearContainer: function () {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    },

    removeTimer: function () {
      toggle(wrapper, timer);
    },

    fadeContainer: function () {
      fade(popUPBlock);
    },
  }; // return
}

/* 2.5 SUBMIT button */
function Submit() {
  // this is what the system is targetting
  const submit = document.getElementsByClassName("d-captcha-submit");
  const d_c_submit = submit[0];
  const style = d_c_submit.style;

  d_c_submit.disabled = true;

  style.cursor = "default";

  return {
    enable: function () {
      d_c_submit.disabled = false;
      style.cursor = "pointer";
      style.opacity = "1";
      style.filter = "alpha(opacity=1)";
    },
  };
}

/*---------- SET UP ----------*/

const ANCHOR = new Anchor();
const UI = new UIObject();
const SCROLL = new Scroll();
const SUBMIT = new Submit();

// start playing game with the circles.
function game(elements) {
  /* sorted copy of the circles */
  const sortedModel = makeSortedModel(elements);

  elements.forEach(function (element) {
    element.circle.onclick = function () {
      // value of the current circle
      const value = parseInt(this.getAttribute("value"));
      const baseNumber = sortedModel[0];

      if (value === baseNumber) {
        sortedModel.shift();
        element.rightPlay();
        element.stop();
        element.showValue();

        if (sortedModel.length === 0) {
          UI.fadeContainer();
          UI.successPOPUp();

          setTimeout(function () {
            SUBMIT.enable();
            UI.close();
            SCROLL.enable();
            ANCHOR.checked();
          }, 1500);
        }
      } else {
        elements.forEach(function (element) {
          element.stop();
          element.showValue();
          element.disable();
        });

        element.wrongPlay();

        setTimeout(function () {
          UI.fadeContainer();
          UI.failPOPUp();

          setTimeout(function () {
            UI.failPOPUp();
            UI.fadeContainer();
            reStart();
          }, 2000); // restart
        }, 200);
      }
    };
  });
}

/* set up the game */
function buildGame() {
  // container for the circles(playground).
  const container = UI.container();

  /* clear container before start */
  UI.clearContainer();

  /* create the circles */
  const allCirlces = createCircles(Circle);
  const circles = shuffle(allCirlces, 4);

  /* start the game */
  function startGame() {
    /* deploy circles to the container. */
    append(container, circles);

    setTimeout(function () {
      circles.forEach(function (itme) {
        itme.hideValue();
      });

      /* ready the circles to be playd with */
      circles.forEach(function (itme) {
        itme.move();
      });

      setTimeout(function () {
        game(circles);
      }, 300);
    }, 2000);
  }

  // show the timer, then start game.
  UI.ready(startGame);
}

/* restart the game with wrong play or restart button.*/
function reStart() {
  // container for the circles(playground).
  const container = UI.container();

  /* clear container before start */
  UI.clearContainer();

  /* create the circles */
  const allCirlces = createCircles(Circle);
  const circles = shuffle(allCirlces, 4);

  /* start the game */

  /* deploy circles to the container. */
  append(container, circles);

  /* remove pop up */
  //  UI.failPOPUp();
  setTimeout(function () {
    circles.forEach(function (itme) {
      itme.hideValue();
    });

    setTimeout(function () {
      /* ready the circles to be playd with */
      circles.forEach(function (itme) {
        itme.move();
      });

      game(circles);
    }, 200);
  }, 2000);
}

/*---------- END ----------*/
