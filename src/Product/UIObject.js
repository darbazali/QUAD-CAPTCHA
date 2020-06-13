import { createDiv, styleElem, append } from "./globalFunctions";
import { SVG } from "./SVG";
import { ICON, UI, SCROLL, reStart } from "./quadCaptcha";
import UIStyle from "./UIStyle";


// destruct all styles from UIStyle object
const { 
  resetStyle, 
  centerStyle, 
  boxShadow, 
  absPos, 
  borderBox ,
  overlayStyle,
  containerStyle,
  frameStyle,
  wrapperStyle,
  buttonBlockStyle,
  containerStyle2,
  timerStyle,
  popUPBlockStyle,
  faded
} = UIStyle;


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



  const toggleElement = (element, node, callback) => {

      if (node.lastChild == element) {
        node.removeChild(element);
        callback();
      } else {
        append(node, element);
      }
  }

  const removeElement = (element, node) => {
      if ( node.lastChild == element ) {
        node.removeChild(element);
      }
  }


  // clear all intervals
  function clearIntervals() {
    for (let i = 0; i < 100; i++) {
      window.clearInterval(i);
    }
  }

  // check if a node is in page
  const isInPage = node => document.body.contains(node);

  const fullScreen = (element) => {
    let style = element.style;
    style.width = window.innerWidth + "px";
    style.height = window.innerHeight + "px";
    style.top = window.pageYOffset + "px";
    style.left = window.pageXOffset + "px";
  };

   // text for title
   const titleMSg =
   "<p>Memorize the numbers<br/>" + " in the Ascending Order.</p>";

   const openMsg = "<h3>Let's Play a Game!</h3>";
   

  /*--------- creating elements --------*/
  const overlay = createDiv();
  const wrapper = createDiv();
  const frame = createDiv();
  const container = createDiv();

  const buttonBlock = createDiv();


  const titleBlock = createDiv();
  const popUp = createDiv();
  const timer = createDiv();
  const info = createDiv();
  const popUPBlock = createDiv();
  const successPOPUP = createDiv();
  const failPOPUP = createDiv();


  // Assembling
  append(overlay, wrapper);

  

  append(frame, container);
  append(frame, buttonBlock);
  // append(frame, popUPBlock);

  append(buttonBlock, ICON.restartBtn);
  append(buttonBlock, ICON.closeBtn);

  /*--------- Styling the components --------*/
  styleElem(overlay, resetStyle +  overlayStyle +  borderBox );
  styleElem(wrapper,  wrapperStyle +  centerStyle);
  styleElem(frame,  absPos +  frameStyle +  centerStyle);
  styleElem(container,  containerStyle);
  styleElem(buttonBlock,  resetStyle +  buttonBlockStyle);
  styleElem(popUPBlock, popUPBlockStyle + resetStyle + absPos + centerStyle + borderBox);

  

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
    // this.style.opacity = "0.8";
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
        // wrapper.removeChild(frame);
        removeElement(frame, wrapper);
      }
    },

    ready: function (callback) {
      popUPBlock.style.opacity = "1";
      popUPBlock.style.visibility = "visible";
      append(wrapper, popUPBlock);
      // timer.innerHTML = "Ready!";
      // popUPBlock.innerHTML = "Lest's Play a Game!";
      // append(popUPBlock, openMsg);
      popUPBlock.innerHTML = openMsg;
      setTimeout(function () {
        // frame.removeChild(timer);
        append(wrapper, frame);
        popUPBlock.style.opacity = "0";
        popUPBlock.style.visibility = "hidden";
        setTimeout(() => {
          callback(); // start game after showing ready alert.
        }, 800);
        
      }, 1500);
    },
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
