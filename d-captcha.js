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

//let println = console.log;


// flip function, returns 0 or 1 randomly.
function flip() {
  return Math.floor(Math.random() * 2);
}

// creating element
function createDiv() {
  return document.createElement('div');
}


// styleing element
function styleElem(element, style) {
  element.setAttribute('style', style)
}


/* append element/elements to a node. */
function append(nodeName, element) {
  /* for appending an array of elements */
  if (element.length > 1) {
    element.forEach(function (item) {
      nodeName.appendChild(item.circle); // for circle objects
    });

    /* appending a singl element */
  } else {
    nodeName.appendChild(element)
  }

}


/* collision detection (rect - rect) true or false, algorithm */
function isColliding(element1, element2) {
  // size of the element
  const size = 60;

  const X1 = parseInt(element1.style.left);
  const X2 = parseInt(element2.style.left);

  const Y1 = parseInt(element1.style.top);
  const Y2 = parseInt(element2.style.top);


  if (X1 + size >= X2 &&
    X1 <= X2 + size &&
    Y1 + size >= Y2 &&
    Y1 <= Y2 + size) {
    return true;
  } else {
    return false;
  }
}


/* Randomize(shuffle) an array, algorithm */
function shuffle(srcArray, amount) {
  let rndArray = []; // random array

  while (rndArray.length < amount) {
    const random_index = Math.floor(Math.random() * srcArray.length);
    if (!rndArray.indexOf(random_index) >= 0 ||
      !rndArray.includes(random_index)) {

      rndArray.push(srcArray[random_index]);
      srcArray.splice(random_index, 1);
    }
  }
  return rndArray;
}


/* create circles from Circle object, algorithm */
function createCircles(object) {
  const circles = [];
  let value = 0;
  while (circles.length < 10) {
    // object
    let RandomX = Math.floor(Math.random() * 260);
    let RandomY = Math.floor(Math.random() * 260);
    let circle = new object(value, RandomX, RandomY);

    // looping throught all existing locations
    let overLapping = false;
    for (let j = 0; j < circles.length; j++) {
      let other = circles[j];
      let collision = isColliding(circle.circle, other.circle);

      if (collision) {
        overLapping = true;
        value--; // start again
        break; // break the loop
      }
    }

    if (!overLapping) {

      circles.push(circle);
    }

    value++;
  }
  return circles;
}


/* retruns an array of sorted values of a none sorted array */
function makeSortedModel(elements) {
  const sortedValues = [];

  elements.forEach(function (item) {
    sortedValues.push(parseInt(item.circle.getAttribute('value')));
  });

  return sortedValues.sort()
}




/*---------- COMPONENTS ----------*/

const colors = {
  white: '#FFF',
  transparent: 'rgba(255, 255, 255, 0)',
  darkGray: '#979797',
  lightGray: '#D8D8D8',
  mediumBlue: '#0000CD',
  forestGreen: '#228B22',
  royalBlue: '#4169E1',
  lightBlue: '#0563CF',
  deepBlue: '#053091',
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


/* 2.1 - Anchor */
function Anchor() {

  // common styles for checkBox element
  function styleCheckbox(element) {
    const style = element.style;

    style.height = '30px';
    style.width = '30px';
    style.border = '1px solid ' + colors.darkGray;
    style.borderRadius = '2px';
    style.backgroundColor = colors.white;
    style.color = colors.forestGreen;
    style.marginRight = '10px';
    style.padding = '0';
    style.fontSize = '30px';
    style.textAlign = 'center';
    style.cursor = 'pointer';
  }

  // elements
  const anchor = document.createElement('div');
  const checkbox = document.createElement('div');
  const checkedBox = checkbox.cloneNode(true);
  const title = document.createElement('div');
  const target = document.getElementsByClassName('d-captcha-div');
  const d_c_anchor = target[0];
  const checkMark = '&#10003';

  // assembling
  title.innerHTML = "I'm not a robot";
  append(anchor, checkbox);
  append(anchor, title);
  append(d_c_anchor, anchor);


  // styles
  style = anchor.style;
  title_style = title.style;

  // anchor style
  style.width = '300px';
  style.height = '80px';
  style.boxSizing = 'border-box';
  style.backgroundColor = colors.lightGray;
  style.color = colors.mediumBlue;
  style.border = '1px solid ' + colors.darkGray;
  style.borderRadius = '8px';
  style.display = 'flex';
  style.fontSize = '25px';
  style.padding = '20px 10px';
  style.marginBottom = '10px';


  // checkBox style
  styleCheckbox(checkbox);
  checkbox.style.transition = 'box-shadow 0.3s';
  checkbox.style.borderRadius = '3px';
  checkbox.onmousemove = function () {
    checkbox.style.boxShadow = '0 0 10px #7b7b7b';
  }

  checkbox.onmouseout = function () {
    checkbox.style.boxShadow = 'none';
  }


  // checkedBox style
  styleCheckbox(checkedBox);
  checkedBox.innerHTML = checkMark;
  checkedBox.style.cursor = 'default';



  // title stile
  title_style.cursor = 'default';
  title_style.color = 'inherit';


  checkbox.onclick = function () {
    let size = window.innerHeight;

    if (size < 550) {
      alert('Please put your device in Portraite mode, and try again!')
    } else {
      UI.open();
      buildGame();
      SCROLL.disable();
    }
  }


  return {
    checked: function () {
      checkbox.parentNode.replaceChild(checkedBox, checkbox);
    }
  }
}


/* 2.2 = Buttons */
function Icons() {

  // general style for buttons
  function btnStyle(button) {
    const style = button.style;

    style.width = '60px';
    style.height = '60px';
    style.padding = '0';
    style.boxSizing = 'border-box';
    style.display = 'inline-block';
    style.cursor = 'pointer';
    style.margin = '0px 22px';
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
    btnStyle(button);
    return button;
  }

  // icon names
  const closeBtn = createButton();
  const infoBtn = createButton();
  const restartBtn = createButton();


  closeBtn.innerHTML = SVG.closeIcon;
  restartBtn.innerHTML = SVG.restartIcon;
  infoBtn.innerHTML = SVG.infoIcon;


  return {
    closeBtn,
    restartBtn,
    infoBtn
  }

}

const ICON = new Icons();


/* 2.2 - UI */
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
    }

  }

  function fadeCont(element) {
    let style = element.style;
    style.opacity = '0';
    style.visibility = 'hidden';


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

    //    return (node === document.body) ? false : document.body.contains(node);
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

  const popUPBlock = createDiv();
  const successPOPUP = createDiv();
  const failPOPUP = createDiv();


  /*--------- Styles of the UI --------*/
  const STYLES = {

    // styles / general
    resetStyle: "font-family: Arial; paddng: 0; margin: 0; box-sizing: border-box;",
    centerStyle: "left: 50%; top: 50%; transform: translate(-50%, -50%);",
    boxShadow: "box-shadow: 0 0 20px #333333;",
    absPos: "position: absolute;",
    borderBox: 'box-sizing: border-box; -webkit-box-sizing: border-box;',
    gradient: "background: linear-gradient(#0563CF, #0133A4);",


    // styles / specific
    // overlay style
    overlayStyle: "position: absolute;" +
      "width: " + window.innerWidth + "px;" +
      "height: " + window.innerHeight + "px;" +
      "top: " + window.pageYOffset + "px;" +
      "left: " + window.pageXOffset + "px;" +
      "background-color: rgba(72, 72, 72, 0.8);" +
      "color: #fff; font-family: Arial;",

    // wrapper style
    wrapperStyle: "width: 320px; height: 480px; border-radius: 15px;" +
      "background-color: " + colors.royalBlue +
      "; position: relative;",


    // info style
    infoStyle: "width: 300px; height: 190px; font-size: 18px; text-align: left;" +
      "margin: 10px 5px; border-radius: 10px; cursor: default; position: absolute;" +
      "background-color: " + colors.lightBlue + "; padding: 5px 10px; opacity: 0.9;" +
      "color: #d9d9d9;",



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


    popUPBlockStyle: "width: 320px; height: 320px; background-color: #4A4A4A;" +
      "font-size: 26px;",

    faded: "display: block; opacity: 0; visibility: hidden; transition: visibility 1s linear, opacity 1s linear;"


  }




  /* 1. instruction message */

  const infoMSG =

    '<p>Look at the Circles for 3sec, after the numbers desapeard, click them One-by-One in the Ascending Order.<hr style="height:1px;border:none;color:#ccc;background-color:#ccc; margin: 10px 0; opacity: 0.9;"/>Click on the reload button for new game.</p>';


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
  append(wrapper, popUPBlock);
  append(wrapper, failPOPUP);
  append(wrapper, successPOPUP);

  append(buttonBlock, ICON.infoBtn);
  append(buttonBlock, ICON.restartBtn);
  append(buttonBlock, ICON.closeBtn);

  titleBlock.innerHTML = titleMSg;
  const title = titleBlock.firstChild;




  /*--------- Styling the components --------*/

  styleElem(overlay, STYLES.resetStyle + STYLES.overlayStyle + STYLES.borderBox);
  styleElem(wrapper, STYLES.wrapperStyle + STYLES.centerStyle + STYLES.gradient);
  styleElem(titleBlock, STYLES.titleBlockStyle + STYLES.resetStyle);
  styleElem(title, STYLES.titleStyle);
  styleElem(container, STYLES.containerStyle);
  styleElem(buttonBlock, STYLES.resetStyle + STYLES.buttonBlockStyle)
  styleElem(timer, STYLES.timerStyle + STYLES.centerStyle + STYLES.boxShadow)
  styleElem(info, STYLES.infoStyle + STYLES.centerStyle + STYLES.resetStyle + STYLES.gradient)

  styleElem(popUPBlock, STYLES.centerStyle + STYLES.absPos + STYLES.popUPBlockStyle + STYLES.faded);
  styleElem(successPOPUP, STYLES.centerStyle + STYLES.absPos + STYLES.faded);
  styleElem(failPOPUP, STYLES.centerStyle + STYLES.absPos + STYLES.faded);




  // Centering with resize event
  window.onresize = function () {

    if (isInPage(overlay)) {
      overlay.style.width = window.innerWidth + 'px';
      overlay.style.height = window.innerHeight + 'px';
      overlay.style.top = window.pageYOffset + 'px';
      overlay.style.left = window.pageXOffset + 'px';

    }

    if (window.innerHeight < 500) {
      if (isInPage(overlay)) {
        UI.close();
        SCROLL.enable();

      }
    }
  }

  window.onscroll = function () {
    overlay.style.top = window.pageYOffset + 'px';
    overlay.style.left = window.pageXOffset + 'px';
  }


  // close button event
  ICON.closeBtn.onclick = function () {

    // at this point we have to clear all intervals
    clearIntervals();
    UI.close();
    SCROLL.enable();

    toggle(wrapper, info);
  }

  // restart button action
  ICON.restartBtn.onclick = function () {
    clearIntervals();
    UI.removeTimer();

    toggle(wrapper, info);
    fadeCont(popUPBlock);
    reStart();
  }


  ICON.infoBtn.onclick = function () {
    clearIntervals();
    UI.removeTimer();
    UI.clearContainer();
    popUp.innerHTML = infoMSG;
    fade(popUPBlock);
    toggle(wrapper, info, true, reStart);
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
      clearIntervals();
      if (isInPage(overlay)) {
        document.body.removeChild(overlay);
      }
    },

    timer: function (func) {
      popUPBlock.style.opacity = '1';
      popUPBlock.style.visibility = 'visible';
      append(wrapper, timer);
      let seconds = 2;
      let timerId = setInterval(updateTimer, 1000);

      timer.innerHTML = seconds;

      function updateTimer() {
        seconds--;
        timer.innerHTML = seconds;

        if (seconds === 0) {
          clearInterval(timerId);
          setTimeout(function () {
            wrapper.removeChild(timer);

            popUPBlock.style.opacity = '0';
            popUPBlock.style.visibility = 'hidden';

            func()
          }, 1000);

        }
      }
    },

    failPOPUp: function () {

      fade(failPOPUP);

    },

    successPOPUp: function () {

      fade(successPOPUP)
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
    }
  } // return

}


/* 2.3 - Circle Object */
function Circle(value, randomX, randomY) {

  // Prototyping

  this.value = value;
  this.randomX = randomX;
  this.randomY = randomY;

  let moveCircle;

  let circle = document.createElement('input');

  circle.setAttribute('type', 'button');
  circle.setAttribute('value', value);

  let cSTYLE =
    "width: 60px; height: 60px; max-width: 60px; max-height: 60px;" +
    "box-sizing: border-box; -webkit-box-sizing: border-box;" +
    "font-size: 54px; border-radius: 100%; text-decoration: none;" +
    "color: #FFFFFF; border: 0; cursor: pointer; position: absolute;" +
    "left: " + randomX + "px;" + "top: " + randomY + "px;" +
    "transition: box-shadow 0.3s, background-color 0.5s;" +
    "background-color: " + colors.deepBlue + ";" +
    "outline: 0;";

  styleElem(circle, cSTYLE)

  const style = circle.style;

  /* chage style with hover effect */
  circle.onmouseover = function () {
    style.boxShadow = '0px 0px 10px #000';
  }

  circle.onmouseout = function () {
    style.boxShadow = 'none';
  }

  circle.onfocus = function () {
    style.outline = 'none';
  }


  // disable circle
  function disable() {
    circle.setAttribute('disabled', 'disabled');
    style.opacity = '0.7';
    style.cursor = 'default';
    style.boxShadow = 'none';
  }


  /* properties for moving the object */

  // frame per second
  const FPS = 60;

  // element size
  let elementSize = '60px';

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
  if (flip() == 0) {
    Xspeed = -Xspeed;
  }

  if (flip() == 0) {
    Yspeed = -Yspeed;
  }


  // TODO: MODIFY THIS BLOCK

  // UPDATE FUNCTION
  function update() {


    elementXPos += Xspeed;
    elementYPos += Yspeed;


    circle.style.left = elementXPos + 'px';
    circle.style.top = elementYPos + 'px';

    // change direction randomly
    if (Math.floor(Math.random() * 150) == 1) {
      Xspeed = -Xspeed;
    }

    if (Math.floor(Math.random() * 150) == 1) {
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
      style.fontSize = '0px';
    },

    showValue: function () {
      style.fontSize = '54px';
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
      disable()
      style.backgroundColor = '#138b13';
    },

    wrongPlay: function () {
      disable();
      style.backgroundColor = colors.redOrange;
    },

    disable: function () {
      disable();
    }
  }
}


/* 2.4 handling sroll bar */
function Scroll() {

  // left: 37, up: 38, right: 39, down: 40,
  // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
  const keys = {
    37: 1,
    38: 1,
    39: 1,
    40: 1
  };

  function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
      e.preventDefault();
    e.returnValue = false;
  }

  function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
      preventDefault(e);
      return false;
    }
  }

  return {
    disable: function () {
      if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
      window.onwheel = preventDefault; // modern standard
      window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
      window.ontouchmove = preventDefault; // mobile
      document.onkeydown = preventDefaultForScrollKeys;
    },

    enable: function () {
      if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
      window.onmousewheel = document.onmousewheel = null;
      window.onwheel = null;
      window.ontouchmove = null;
      document.onkeydown = null;
    }
  }

}


/* 2.5 SUBMIT button */
function Submit() {
  // this is what the system is targetting
  const submit = document.getElementsByClassName('d-captcha-submit');
  const d_c_submit = submit[0];
  const style = d_c_submit.style;

  d_c_submit.disabled = true;

  style.cursor = 'default';


  return {
    enable: function () {
      d_c_submit.disabled = false;
      style.cursor = 'pointer';
      style.opacity = '1';
      style.filter = 'alpha(opacity=1)'
    }
  }
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
    element.circle.onclick = function (event) {
      // value of the current circle
      const value = parseInt(this.getAttribute('value'));
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
          }, 2000) // restart
        }, 200);


      }
    }
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
  const circles = shuffle(allCirlces, 5);


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

    }, 3000);
  }

  // show the timer, then start game.
  UI.timer(startGame);

}


/* restart the game with wrong play or restart button.*/
function reStart() {
  // container for the circles(playground).
  const container = UI.container();

  /* clear container before start */
  UI.clearContainer();

  /* create the circles */
  const allCirlces = createCircles(Circle);
  const circles = shuffle(allCirlces, 5);


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
  }, 3000);
}


// TODO: Create a game object.
