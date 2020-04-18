import { createDiv, styleElem, append } from "./globalFunctions";
import { SVG } from "./SVG";
import { ICON, UI, SCROLL, reStart } from "./G-SHIELD";
import UIStyle from "./UIStyle";

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
    } else {
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

  const timer = createDiv();
  const info = createDiv();
  const buttonBlock = createDiv();
  const popUPBlock = createDiv();
  const successPOPUP = createDiv();
  const failPOPUP = createDiv();

  //   const { overlay, wrapper, backGround, frame, container, titleBlock, timer, info, buttonBlock, popUPBlock, successPOPUP, failPOPUP } = document.createElement('div');

  // TODO: modify UI style
  // horizontal line breaker
  const lineBreak =
    '<hr style="height:1px;border:none;color:#ccc;background-color:#F5A623; margin: 10px 0; opacity: 0.9;"/>';
  /* 1. instruction message */
  const infoMSG =
    "<p>Look at the Circles for 3sec, after the numbers desapeard, click them One-by-One in the Ascending Order." +
    lineBreak +
    "Click on the reload button for new game.</p>" +
    lineBreak;

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
    UIStyle.resetStyle + UIStyle.overlayStyle + UIStyle.borderBox
  );
  styleElem(wrapper, UIStyle.wrapperStyle + UIStyle.centerStyle);
  styleElem(
    backGround,
    UIStyle.absPos + UIStyle.frameStyle + UIStyle.centerStyle
  );
  styleElem(frame, UIStyle.absPos + UIStyle.frameStyle + UIStyle.centerStyle);
  styleElem(titleBlock, UIStyle.titleBlockStyle + UIStyle.resetStyle);
  styleElem(title, UIStyle.titleStyle);
  styleElem(container, UIStyle.containerStyle);
  styleElem(buttonBlock, UIStyle.resetStyle + UIStyle.buttonBlockStyle);
  styleElem(
    timer,
    UIStyle.timerStyle + UIStyle.centerStyle + UIStyle.boxShadow
  );
  styleElem(info, UIStyle.infoStyle + UIStyle.centerStyle);
  styleElem(
    popUPBlock,
    UIStyle.centerStyle +
      UIStyle.absPos +
      UIStyle.popUPBlockStyle +
      UIStyle.faded
  );
  styleElem(successPOPUP, UIStyle.centerStyle + UIStyle.absPos + UIStyle.faded);
  styleElem(failPOPUP, UIStyle.centerStyle + UIStyle.absPos + UIStyle.faded);

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
