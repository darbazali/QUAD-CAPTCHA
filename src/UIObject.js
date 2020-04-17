import { createDiv, styleElem, append } from "./globalFunctions";
import { SVG } from "./SVG";
import {  ICON, UI, SCROLL, reStart } from "./G-SHIELD";



/* 2.2 - UI */
export function UIObject() {
  /*--------- private functions --------*/
  function fade(element) {
    let style = element.style;
    let styled = window
      .getComputedStyle(element, null)
      .getPropertyValue("opacity");
    if (styled == 0) {
      style.visibility = "visible";
      style.opacity = "1";
    }
    else {
      style.visibility = "hidden";
      style.opacity = "0";
    }
  }

  function toggle(node, element, toggle, func) {
    // node: parent node for the element.
    // element: the element to be toggled.
    // toggle: if true? toggle, else: remove element.
    // func: a callback tha runs when elment is toggled.
    if (toggle) {
      if (node.lastChild == element) {
        node.removeChild(element);
        func();
      }
      else {
        append(node, element);
      }
    }
    else {
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
    }
    else {
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

  const timer = createDiv();
  const info = createDiv();
  const buttonBlock = createDiv();
  const popUPBlock = createDiv();
  const successPOPUP = createDiv();
  const failPOPUP = createDiv();

//   const { overlay, wrapper, backGround, frame, container, titleBlock, timer, info, buttonBlock, popUPBlock, successPOPUP, failPOPUP } = document.createElement('div');


  /*--------- Styles of the UI --------*/
  const STYLES = {
    // styles / general
    resetStyle: "font-family: Arial; paddng: 0; margin: 0; box-sizing: border-box;",
    centerStyle: "left: 50%; top: 50%; transform: translate(-50%, -50%);",
    boxShadow: "box-shadow: 0 0 20px #333333;",
    absPos: "position: absolute;",
    borderBox: "box-sizing: border-box; -webkit-box-sizing: border-box;",
    // styles / specific
    // overlay style
    overlayStyle: "position: absolute;" +
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
    wrapperStyle: "width: 320px; height: 450px; border-radius: 30px;" +
      "background-color: transparent;  position: relative;",
    frameStyle: "width: 320px; height: 450px; border-radius: 30px;" +
      " background-color: transparent;",
    // info style
    infoStyle: "width: 300px; height: 300px; font-size: 22px; text-align: left;" +
      "margin: 5px 5px; border-radius: 10px; cursor: default; position: absolute;" +
      "background-color: transparent; padding: 5px 10px; opacity: 0.9;" +
      "color: #F5A623;",



    infoSytle2: 
    `
        width: 300px;
        height: 300px;
        font-size: 22px;
        texte-align: left;
    `,



    /* title style */
    titleBlockStyle: "width: 100%; height: 70px; margin: 0; padding: 5px 0;" +
      "font-size: 26px; font-weight: bold; background-color: " +
      "rgba(0,0,0,0)" +
      "; text-align: center;",
    titleStyle: "margin: 0; padding: 0; cursor: default; color: #F5A623",
    // button container style
    buttonBlockStyle: "width: 320; height: 60px; margin-top: 5px; padding: 0;" +
      "background-color: " +
      "rgba(0,0,0,0)" +
      ";",
    // container style
    containerStyle: "width: 320px; height: 320px; margin: 0 auto; position: relative;" +
      "background-color: transparent;" +
      "border-top: 1px solid #915f0b; border-bottom: 1px solid #915f0b;",
    timerStyle: "width: 100px; height: 40px; border: 4px solid #F5A623; border-radius: 5px;" +
      "text-align: center; font-size: 28px; position: absolute; cursor: default; color: #F5A623;" +
      "background-color:" +
      "rgba(0,0,0,0)" +
      "; font-weight: 500; padding: 8px;",
    popUPBlockStyle: "width: 320px; height: 320px; background-color: #4A4A4A;" +
      "font-size: 32px;",
    faded: "display: block; opacity: 0; visibility: hidden; transition: visibility .5s linear, opacity .5s linear;",
  };
  // TODO: modify UI style
  // horizontal line breaker
  const lineBreak = '<hr style="height:1px;border:none;color:#ccc;background-color:#F5A623; margin: 10px 0; opacity: 0.9;"/>';
  /* 1. instruction message */
  const infoMSG = "<p>Look at the Circles for 3sec, after the numbers desapeard, click them One-by-One in the Ascending Order." +
    lineBreak +
    "Click on the reload button for new game.</p>" +
    lineBreak;


  // text for title
  const titleMSg = "<p>Memorize the numbers<br/>" + " in the Ascending Order.</p>";
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
  styleElem(overlay, STYLES.resetStyle + STYLES.overlayStyle + STYLES.borderBox);
  styleElem(wrapper, STYLES.wrapperStyle + STYLES.centerStyle);
  styleElem(backGround, STYLES.absPos + STYLES.frameStyle + STYLES.centerStyle);
  styleElem(frame, STYLES.absPos + STYLES.frameStyle + STYLES.centerStyle);
  styleElem(titleBlock, STYLES.titleBlockStyle + STYLES.resetStyle);
  styleElem(title, STYLES.titleStyle);
  styleElem(container, STYLES.containerStyle);
  styleElem(buttonBlock, STYLES.resetStyle + STYLES.buttonBlockStyle);
  styleElem(timer, STYLES.timerStyle + STYLES.centerStyle + STYLES.boxShadow);
  styleElem(info, STYLES.infoStyle + STYLES.centerStyle);
  styleElem(popUPBlock, STYLES.centerStyle + STYLES.absPos + STYLES.popUPBlockStyle + STYLES.faded);
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
