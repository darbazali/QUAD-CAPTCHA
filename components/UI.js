const println = console.log;


/* append element/elements to a node. */
function appendNode(nodeName, element) {
  /* for appending an array of elements */
  if (element.length > 1) {
    element.forEach(function (item) {
      nodeName.appendChild(item.draw());
    });

    /* appending a singl element */
  } else {
    nodeName.appendChild(element)
  }

}

function append(nodeName, element) {
  nodeName.appendChild(element);
}

// creating element
function createDiv() {
  return document.createElement('div');
}


// styleing element
function styleElem(element, style) {
  element.setAttribute('style', style)
}


const colors = {
  white: '#FFF',
  transparent: 'rgba(255, 255, 255, 0)',
  darkGray: '#979797',
  lightGray: '#D8D8D8',
  mediumBlue: '#0000CD',
  forestGreen: '#228B22',
  royalBlue: '#4169E1',
  lightBlue: '#0563CF',
  dimGray: '#696969',
  redOrange: "#E15821"
}


const SVG = {


  closeIcon: '<svg width="52px" height="52px" viewBox="0 0 52 52" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="gCAPTCHA" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Desktop" transform="translate(-583.000000, -535.000000)"><g id="Close" transform="translate(584.000000, 536.000000)"><circle id="Oval-2" stroke="#FFFFFF" cx="25" cy="25" r="25"></circle><rect id="Rectangle-10" fill="#FFFFFF" transform="translate(24.788582, 24.788582) rotate(45.000000) translate(-24.788582, -24.788582) " x="22.7885822" y="7.28858223" width="4" height="35" rx="2"></rect><rect id="Rectangle-10-Copy" fill="#FFFFFF" transform="translate(24.788582, 24.788582) scale(1, -1) rotate(45.000000) translate(-24.788582, -24.788582) " x="22.7885822" y="7.28858223" width="4" height="35" rx="2"></rect></g></g></g></svg>',


  infoIcon: '<svg width="52px" height="52px" viewBox="0 0 52 52" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="gCAPTCHA" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Desktop" transform="translate(-399.000000, -535.000000)"><g id="Info-Copy" transform="translate(400.000000, 536.000000)"><circle id="Oval-2-Copy" stroke="#FFFFFF" cx="25" cy="25" r="25"></circle><path d="M30.25,33.1796875 C30.6718771,33.4296887 30.8828125,33.6718738 30.8828125,33.90625 C30.8828125,34.4687528 30.2031318,35.5781167 28.84375,37.234375 C27.0156159,39.4843863 25.3203203,40.609375 23.7578125,40.609375 C22.6171818,40.609375 22.046875,39.8515701 22.046875,38.3359375 C22.046875,37.6953093 22.2812477,35.726579 22.75,32.4296875 L23.6640625,26.0546875 L23.8984375,24.4375 L24.0859375,23.1484375 C24.1640629,22.6015598 24.203125,22.1406269 24.203125,21.765625 C24.203125,20.9843711 23.9843772,20.59375 23.546875,20.59375 C22.3281189,20.59375 21.015632,21.9374866 19.609375,24.625 C19.3124985,24.3593737 19.1640625,24.0937513 19.1640625,23.828125 C19.1640625,22.8749952 20.04296,21.593758 21.8007812,19.984375 C23.5586025,18.374992 24.9609323,17.5703125 26.0078125,17.5703125 C27.1796934,17.5703125 27.765625,18.3828044 27.765625,20.0078125 C27.765625,20.3203141 27.7031256,20.9609327 27.578125,21.9296875 L27.3671875,23.5 C27.3515624,23.6250006 27.2656258,24.2578068 27.109375,25.3984375 L26.1484375,32.1015625 L25.9140625,33.6015625 C25.7109365,35.0859449 25.609375,36.0781225 25.609375,36.578125 C25.609375,37.2500034 25.8046855,37.5859375 26.1953125,37.5859375 C27.5078191,37.5859375 28.859368,36.1172022 30.25,33.1796875 Z" id="i" fill="#FFFFFF"></path><circle id="Oval-3" fill="#FFFFFF" cx="25.5" cy="12.5" r="2.5"></circle></g></g></g></svg>',


  restartIcon: '<svg width="52px" height="52px" viewBox="0 0 52 52" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="gCAPTCHA" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Desktop" transform="translate(-500.000000, -537.000000)"><g id="Group-4" transform="translate(501.000000, 538.000000)"><path d="M35.5,15.7974865 L35.5,13.5 C35.5,12.9477153 35.9477153,12.5 36.5,12.5 C37.0522847,12.5 37.5,12.9477153 37.5,13.5 L37.5,20.5 L30.5,20.5 C29.9477153,20.5 29.5,20.0522847 29.5,19.5 C29.5,18.9477153 29.9477153,18.5 30.5,18.5 L33.900722,18.5 C31.7952232,15.8327971 28.4270047,14 25,14 C18.9248678,14 14,18.9248678 14,25 C14,31.0751322 18.9248678,36 25,36 C29.6027972,36 33.7797627,32.8345571 35.2824718,28.9172785 C36.7851809,25 39.0681045,27.6804553 38.0856885,29.9859113 C35.8273794,35.2855321 30.8575476,39 25,39 C17.2680135,39 11,32.7319865 11,25 C11,17.2680135 17.2680135,11 25,11 C29.0058813,11 32.846174,12.8792155 35.5,15.7974865 Z" id="Combined-Shape" fill="#FFFFFF"></path><circle id="Oval-2-Copy-4" stroke="#FFFFFF" cx="25" cy="25" r="25"></circle></g></g></g></svg>',


  successPopUP: '<svg width="190px" height="250px" viewBox="0 0 190 250" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="gCAPTCHA" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="UI-Copy-8" transform="translate(-65.000000, -159.000000)"><g id="Group" transform="translate(65.000000, 159.000000)"><path d="M90.7594552,75.1092849 C90.1840448,75.1150938 89.603787,74.9233541 89.1284105,74.5244659 L75.9151111,63.4371912 C74.8574244,62.5496868 74.7194645,60.9727978 75.606969,59.9151111 C76.4944735,58.8574244 78.0713625,58.7194645 79.1290492,59.606969 L91.0893663,69.6428667 L116.09835,44.6338835 C117.07466,43.6575727 118.657573,43.6575727 119.633883,44.6338835 C120.610194,45.6101942 120.610194,47.1931067 119.633883,48.1694174 L93.3033009,74.5 C92.6151158,75.188185 91.6255345,75.39128 90.7594552,75.1092849 Z" id="Combined-Shape" fill="#1BBC1B"></path><path d="M15,0.5 C6.99187113,0.5 0.5,6.99187113 0.5,15 L0.5,235 C0.5,243.008129 6.99187113,249.5 15,249.5 L175,249.5 C183.008129,249.5 189.5,243.008129 189.5,235 L189.5,15 C189.5,6.99187113 183.008129,0.5 175,0.5 L15,0.5 Z M95,97.5 C72.6324676,97.5 54.5,79.3675324 54.5,57 C54.5,34.6324676 72.6324676,16.5 95,16.5 C117.367532,16.5 135.5,34.6324676 135.5,57 C135.5,79.3675324 117.367532,97.5 95,97.5 Z" id="Combined-Shape" stroke="#1BBC1B" fill="#3B3B3B"></path><text id="success!" font-family="Arial-BoldMT, Arial" font-size="32" font-weight="bold" letter-spacing="1.240909" fill="#1BBC1B"><tspan x="24.5441765" y="163">success!</tspan></text></g></g></g></svg>',


  failPopUP: '<svg width="190px" height="250px" viewBox="0 0 190 250" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="gCAPTCHA" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="UI-Copy-9" transform="translate(-59.000000, -159.000000)"><g id="Group" transform="translate(59.000000, 159.000000)"><path d="M15,0.5 C6.99187113,0.5 0.5,6.99187113 0.5,15 L0.5,235 C0.5,243.008129 6.99187113,249.5 15,249.5 L175,249.5 C183.008129,249.5 189.5,243.008129 189.5,235 L189.5,15 C189.5,6.99187113 183.008129,0.5 175,0.5 L15,0.5 Z M95,97.5 C72.6324676,97.5 54.5,79.3675324 54.5,57 C54.5,34.6324676 72.6324676,16.5 95,16.5 C117.367532,16.5 135.5,34.6324676 135.5,57 C135.5,79.3675324 117.367532,97.5 95,97.5 Z" id="Combined-Shape" stroke="#E15821" fill="#3B3B3B"></path><text id="try-again…" font-family="Arial-BoldMT, Arial" font-size="14" font-weight="bold" letter-spacing="1.24000001" fill="#E15821"><tspan x="53.1242187" y="181">try again…</tspan></text><text id="oops!" font-family="Arial-BoldMT, Arial" font-size="36" font-weight="bold" line-spacing="14" letter-spacing="1.24000001" fill="#E15821"><tspan x="34" y="145">oops!</tspan></text><path d="M98.9809704,56.4454365 L113.123106,70.5875721 C114.099417,71.5638828 114.099417,73.1467953 113.123106,74.123106 C112.146795,75.0994167 110.563883,75.0994167 109.587572,74.123106 L95.4454365,59.9809704 L81.3033009,74.123106 C80.3269901,75.0994167 78.7440777,75.0994167 77.767767,74.123106 C76.7914562,73.1467953 76.7914562,71.5638828 77.767767,70.5875721 L91.9099026,56.4454365 L77.767767,42.3033009 C76.7914562,41.3269901 76.7914562,39.7440777 77.767767,38.767767 C78.7440777,37.7914562 80.3269901,37.7914562 81.3033009,38.767767 L95.4454365,52.9099026 L109.587572,38.767767 C110.563883,37.7914562 112.146795,37.7914562 113.123106,38.767767 C114.099417,39.7440777 114.099417,41.3269901 113.123106,42.3033009 L98.9809704,56.4454365 Z" id="Combined-Shape" fill="#E15821"></path></g></g></g></svg>'
}

const ICON = new Icons();

/* the user interface */
function UIObject() {

  /*--------- private functions --------*/


  function fade(element) {
    let style = element.style;
    let styled = window.getComputedStyle(element, null)
      .getPropertyValue('opacity');

    if (styled == 0) {

      style.visibility = 'visible';
      style.opacity = '1';


    } else {
      style.visibility = 'hidden';
      style.opacity = '0';
      //      style.display = 'none';
    }

  }

  function toggle(node, element, toggle) {
    if (toggle) {
      if (node.lastChild == element) {
        node.removeChild(element);

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
    for (var i = 0; i < 100; i++) {
      window.clearInterval(i);
    }

  }


  /*--------- creating elements --------*/

  const overlay = createDiv();
  const wrapper = createDiv();
  const container = createDiv();

  const titleBlock = createDiv();

  const popUp = createDiv();
  const timer = createDiv();
  const info = createDiv();
  const buttonBlock = createDiv();

  const successPOPUP = createDiv();
  const failPOPUP = createDiv();


  /*--------- Styles of the UI --------*/
  const STYLES = {

    // styles / general
    resetStyle: "font-family: Arial; paddng: 0; margin: 0; box-sizing: border-box;",
    centerStyle: "left: 50%; top: 50%; transform: translate(-50%, -50%);",
    boxShadow: "box-shadow: 0 0 20px #333333;",
    absPos: "position: absolute;",
    gradient: "background: linear-gradient(#0563CF, #0133A4);",


    // styles / specific
    // overlay style
    overlayStyle: "position: absolute;" +
      "width: " + window.innerWidth + "px;" +
      "height: " + window.innerHeight + "px;" +
      "top: " + window.pageYOffset + "px;" +
      "left: " + window.pageXOffset + "px;" +
      "background-color: rgba(72, 72, 72, 0.8);" +
      "color: #fff; box-sizing: border-box; font-family: Arial",

    // wrapper style
    wrapperStyle: "width: 320px; height: 480px; border-radius: 15px;" +
      "background-color: " + colors.royalBlue +
      "; position: relative;",


    // info style
    infoStyle: "width: 300px; height: 185px; font-size: 18px; text-align: left;" +
      "margin: 10px 5px; border-radius: 5px; cursor: default; position: absolute;" +
      "background-color: " + colors.lightBlue + "; padding: 5px 10px;",



    /* title style */
    titleBlockStyle: "width: 100%; height: 80px; margin: 0; padding: 5px 10px;" +
      "font-size: 24px; font-weight: bold; background-color: " + colors.transparent + ";",

    titleStyle: "margin: 0; padding: 0; margin-top: 5px; margin-left: 10px; cursor: default;",


    // button container style
    buttonBlockStyle: "width: 320; height: 70px; margin-top: 6px; padding: 5px 0;" +

      "background-color: " + colors.transparent + ";",

    // container style
    containerStyle: "width: 320px; height: 320px; margin: 0 auto; position: relative;" +
      "background-color: #4A4A4A;",


    timerStyle: "width: 150px; height: 150px; border: 5px solid #3B3B3B; border-radius: 50%; " +
      "text-align: center; font-size: 130px; position: absolute; cursor: default; color: #FFF;" +
      "background-color: " + colors.redOrange + "; font-weight: 100;",

    popUpStyle: "display: block; opacity: 0; visibility: hidden; transition: visibility 1s linear, opacity 1s;"


  }




  /* 1. instruction message */

  const infoMSG =

    '<p>Look at the Circles for 3sec, after the numbers desapeard, click them One-by-One in the Ascending Order.<hr style="height:1px;border:none;color:#ccc;background-color:#ccc;"/>Click on the reload button for new game.</p>';


  // text for title
  const titleMSg =
    '<p>Memorize the numbers<br/>' +
    ' in the Ascending Order.</p>';



  timer.innerHTML = '0';
  info.innerHTML = infoMSG;
  successPOPUP.innerHTML = SVG.successPopUP;
  failPOPUP.innerHTML = SVG.failPopUP;


  // Assembling
  append(overlay, wrapper);
  append(wrapper, titleBlock);
  append(wrapper, container);
  append(wrapper, buttonBlock);
  append(wrapper, failPOPUP)

  append(buttonBlock, ICON.infoBtn);
  append(buttonBlock, ICON.restartBtn);
  append(buttonBlock, ICON.closeBtn);

  titleBlock.innerHTML = titleMSg;
  const title = titleBlock.firstChild;




   /*--------- Styling the components --------*/

  styleElem(overlay, STYLES.resetStyle + STYLES.overlayStyle);
  styleElem(wrapper, STYLES.wrapperStyle + STYLES.centerStyle + STYLES.gradient);
  styleElem(titleBlock, STYLES.titleBlockStyle + STYLES.resetStyle);
  styleElem(title, STYLES.titleStyle);
  styleElem(container, STYLES.containerStyle);
  styleElem(buttonBlock, STYLES.resetStyle + STYLES.buttonBlockStyle)
  styleElem(timer, STYLES.timerStyle + STYLES.centerStyle + STYLES.boxShadow)
  styleElem(info, STYLES.infoStyle + STYLES.centerStyle + STYLES.resetStyle + STYLES.gradient)
  styleElem(successPOPUP, STYLES.centerStyle + STYLES.absPos + STYLES.popUpStyle);
  styleElem(failPOPUP, STYLES.centerStyle + STYLES.absPos + STYLES.popUpStyle);




  // Centering with resize event
  window.onresize = function () {

    if (overlay) {
      overlay.style.width = window.innerWidth + 'px';
      overlay.style.height = window.innerHeight + 'px';

    }
  }


  // close button event
  ICON.closeBtn.onclick = function () {

    // at this point we have to clear all intervals
    //    clearIntervals();
    //    UI.close();
    //    SCROLL.enable();

    fade(failPOPUP);
    if (wrapper.lastChild == popUp) {
      wrapper.removeChild(popUp);
    }
  }

  // restart button action
  ICON.restartBtn.onclick = function () {
    clearIntervals();

    toggle(wrapper, info);

    //    reStart();
  }


  ICON.infoBtn.onclick = function () {
    //    clearIntervals();
    UI.clearContainer();
    popUp.innerHTML = infoMSG;

    toggle(wrapper, info, true);
  }




    /*--------- properties and methodes --------*/
  return {

    container: function () {
      return container;
    },

    open: function () {
      return document.body.appendChild(overlay);
    },

    close: function () {
      return document.body.removeChild(overlay);
    },

    timer: function (func) {
      append(wrapper, timer);
      var seconds = 2;
      var timerId = setInterval(updateTimer, 1000);

      timer.innerHTML = seconds;

      function updateTimer() {
        seconds--;
        timer.innerHTML = seconds;

        if (seconds === 0) {
          clearInterval(timerId);
          setTimeout(function () {
            wrapper.removeChild(timer);
            func()
          }, 1000);

        }
      }
    },

    popUpRetry: function () {
      popUp.innerHTML = retryMSG;
      append(wrapper, popUp);
    },

    popUpSuccess: function () {
      fade(successPOPUP)
    },

    clearContainer: function () {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    },

    removePopUp: function () {
      toggle(wrapper, popUp);
    }
  } // return

}

// icon set

function Icons() {

  // general style for buttons
  function btnStyle(button) {
    const style = button.style;

    style.width = '55px';
    style.height = '55px';
    style.padding = '0';
    style.boxSizing = 'border-box';
    style.display = 'inline-block';
    style.cursor = 'pointer';
    style.margin = '0px 25px';
    style.borderRadius = '50%';
    style.opacity = '0.8';
    style.border = 'none';
    style.transition = 'all 0.3s';
    style.backgroundColor = colors.transparent;

    button.onmouseover = function () {
      style.opacity = '1';
      style.filter = "alpha(opacity=80)"; // IE
      style.transform = 'scale(1.1)';
      style.msTransform = 'scale(1.1)'; // IE
    }

    button.onmouseout = function () {
      style.opacity = '0.8';
      style.filter = "alpha(opacity=100)"; // IE
      style.transform = 'scale(1)';
      style.msTransform = 'scale(1)'; // IE

    }

    button.onfocus = function () {
      style.outline = 'none';
    }
  }

  function createButton() {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    return button;
  }

  // icon names
  const closeBtn = createButton();
  const infoBtn = createButton();
  const restartBtn = createButton();



  btnStyle(closeBtn);
  btnStyle(infoBtn);
  btnStyle(restartBtn);





  closeBtn.innerHTML = SVG.closeIcon;
  restartBtn.innerHTML = SVG.restartIcon;
  infoBtn.innerHTML = SVG.infoIcon;


  return {
    closeBtn,
    restartBtn,
    infoBtn
  }

}






const UI = new UIObject();
//var timer = UI.timer();
//if (timer) {
//  println("I'm done!");
//}

//UI.timer(UI.popUpSuccess)

document.body.appendChild(UI.open())
