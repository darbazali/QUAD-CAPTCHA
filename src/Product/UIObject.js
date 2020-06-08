import { createDiv, styleElem, append } from "./globalFunctions";
import { SVG } from "./SVG";
import { ICON, UI, SCROLL, reStart } from "./quadCaptcha";
import UIStyle from "./UIStyle";

/* 2.2 - UI */
export function UIObject() {
  /*--------- private functions --------*/
  // function fade(element) {
  //   let style = element.style;
  //   let styled = window
  //     .getComputedStyle(element, null)
  //     .getPropertyValue("opacity");
  //   if (styled == 0) {
  //     style.visibility = "visible";
  //     style.opacity = "1";
  //   } else {
  //     style.visibility = "hidden";
  //     style.opacity = "0";
  //   }
  // }

  // function toggle(node, element, toggle, func) {
  //   // node: parent node for the element.
  //   // element: the element to be toggled.
  //   // toggle: if true? toggle, else: remove element.
  //   // func: a callback tha runs when elment is toggled.
  //   if (toggle) {
  //     if (node.lastChild == element) {
  //       node.removeChild(element);
  //       func();
  //     } else {
  //       append(node, element);
  //     }
  //   } else {
  //     if (node.lastChild == element) {
  //       node.removeChild(element);
  //     }
  //   }
  // }
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
  const frame = createDiv();
  const container = createDiv();

  const buttonBlock = createDiv();

  //   const { overlay, wrapper, backGround, frame, container, titleBlock, timer, info, buttonBlock, popUPBlock, successPOPUP, failPOPUP } = document.createElement('div');

  // TODO: modify UI style

  // text for title
  const titleMSg =
    "<p>Memorize the numbers<br/>" + " in the Ascending Order.</p>";

  // Assembling
  append(overlay, wrapper);

  append(wrapper, frame);

  append(frame, container);
  append(frame, buttonBlock);
  //  append(frame, popUPBlock);

  append(buttonBlock, ICON.restartBtn);
  append(buttonBlock, ICON.closeBtn);

  /*--------- Styling the components --------*/
  styleElem(
    overlay,
    UIStyle.resetStyle + UIStyle.overlayStyle + UIStyle.borderBox
  );
  styleElem(wrapper, UIStyle.wrapperStyle + UIStyle.centerStyle);

  styleElem(frame, UIStyle.absPos + UIStyle.frameStyle + UIStyle.centerStyle);

  styleElem(container, UIStyle.containerStyle);
  styleElem(buttonBlock, UIStyle.resetStyle + UIStyle.buttonBlockStyle);

  const fullScreen = (element) => {
    let style = element.style;
    style.width = window.innerWidth + "px";
    style.height = window.innerHeight + "px";
    style.top = window.pageYOffset + "px";
    style.left = window.pageXOffset + "px";
  };

  // Centering with resize event
  window.onresize = function () {
    // center the UI to the screen
    if (isInPage(overlay)) {
      fullScreen(overlay);
    }

    // close the game if height of the window is < 500px.
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
  };
  // restart button action
  ICON.restartBtn.onclick = function () {
    //    UI.removeTimer();
    UI.clearContainer();
    clearIntervals();
    //    fadeCont(popUPBlock);
    reStart();
  };

  /*--------- properties and methodes --------*/
  return {
    container: function () {
      return container;
    },
    centerUI: function () {
      if (isInPage(overlay)) {
        fullScreen(overlay);
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

    // ready: function (func) {
    //   popUPBlock.style.opacity = "1";
    //   popUPBlock.style.visibility = "visible";
    //   append(frame, timer);
    //   timer.innerHTML = "Ready!";
    //   setTimeout(function () {
    //     frame.removeChild(timer);
    //     popUPBlock.style.opacity = "0";
    //     popUPBlock.style.visibility = "hidden";
    //     func(); // start game after showing ready alert.
    //   }, 1500);
    // },
    // failPOPUp: function () {
    //   fade(failPOPUP);
    // },
    // successPOPUp: function () {
    //   fade(successPOPUP);
    // },
    clearContainer: function () {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    },

    //   removeTimer: function () {
    //     toggle(wrapper, timer);
    //   },

    //   fadeContainer: function () {
    //     fade(popUPBlock);
    //   },
    // }; // return
  };
}
