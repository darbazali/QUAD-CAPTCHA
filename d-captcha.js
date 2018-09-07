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
CAPTCHA system that focuses on human thinking,
movement tracking and memorizing.

*/



/**************************************
SECTION 1: general purpose functions
**************************************/

const println = console.log;

/* change string to integer */
function strToInt(str) {
  const integer = parseInt(str) || +str; // for IE < 9
  return integer;
}


// flip function, returns 0 or 1 randomly.
function flip() {
  return Math.floor(Math.random() * 2);
}


/* append element/elements to a node. */
function append(nodeName, element) {
  /* for appending an array of elements */
  if (element.length > 1) {
    element.forEach(function (item) {
      nodeName.appendChild(item.circle);
    });

    /* appending a singl element */
  } else {
    nodeName.appendChild(element)
  }

}


/* collision detection (rect - rect) true or false, algorithm */
function isColliding(element1, element2) {
  // size of the element
  var size = 60;

  const X1 = strToInt(element1.style.left);
  const X2 = strToInt(element2.style.left);

  const Y1 = strToInt(element1.style.top);
  const Y2 = strToInt(element2.style.top);


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
  var rndArray = []; // random array

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
  var value = 0;
  while (circles.length < 10) {
    // object
    var RandomX = Math.floor(Math.random() * 260);
    var RandomY = Math.floor(Math.random() * 260);
    var circle = new object(value, RandomX, RandomY);

    // looping throught all existing locations
    var overLapping = false;
    for (var j = 0; j < circles.length; j++) {
      var other = circles[j];
      var collision = isColliding(circle.circle, other.circle);

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
    sortedValues.push(strToInt(item.circle.getAttribute('value')));
  });

  return sortedValues.sort()
}





/**************************************
SECTION 2: COMPONENTS
**************************************/

const colors = {
  white: '#FFF',
  transparent: 'rgba(255, 255, 255, 0)',
  darkGray: '#979797',
  lightGray: '#D8D8D8',
  mediumBlue: '#0000CD',
  forestGreen: '#228B22',
  dodgerBlue: '#1E90FF',
  royalBlue: '#4169E1'
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
    UI.open();
    buildGame();
    SCROLL.disable();
  }

  return {
    checked: function () {
      checkbox.parentNode.replaceChild(checkedBox, checkbox);
    }
  }
}


/* 2.2 = Buttons */
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
    style.border = 'none';
    style.transition = 'all 0.3s';
    style.backgroundColor = colors.transparent;

    button.onmouseover = function () {
      style.opacity = '0.8';
      style.filter = "alpha(opacity=80)"; // IE
      style.transform = 'scale(1.1)';
      style.msTransform = 'scale(1.1)'; // IE
    }

    button.onmouseout = function () {
      style.opacity = '1';
      style.filter = "alpha(opacity=100)"; // IE
      style.transform = 'scale(1)';
      style.msTransform = 'scale(1)'; // IE

    }

    button.onfocus = function () {
      style.outline = 'none';
    }
  }

  function createBTN() {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    btnStyle(button);
    return button;
  }

  // icon names
  const closeBtn    = createBTN();
  const infoBtn     = createBTN();
  const restartBtn  = createBTN();



  const close = '<svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Icons" transform="translate(-108.000000, -43.000000)" stroke="#FFFFFF" stroke-width="3"><g id="Group-4" transform="translate(110.000000, 45.000000)"><circle id="Oval-2" cx="25" cy="25" r="25"></circle><path d="M13.5,14.5 L37.5,36.5" id="Line-4" stroke-linecap="square"></path><path d="M13.5,14.5 L37.5,36.5" id="Line-4-Copy" stroke-linecap="square" transform="translate(25.500000, 25.500000) scale(1, -1) translate(-25.500000, -25.500000) "></path></g></g></g></svg>';


  const restart = '<svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Icons" transform="translate(-38.000000, -43.000000)"><g id="Group" transform="translate(40.000000, 45.000000)"><circle id="Oval-2-Copy-4" stroke="#FFFFFF" stroke-width="3" cx="25" cy="25" r="25"></circle><path d="M37.3937438,29.3565788 C35.7683668,34.3728416 31.0577675,38 25.5,38 C18.5964406,38 13,32.4035594 13,25.5 C13,18.5964406 18.5964406,13 25.5,13 C30.0450607,13 34.0235583,15.425745 36.2114728,19.0532151 L36.970375,20.1937468 C37.2509913,20.6154767 37.5940654,20.9921147 37.9878485,21.3107626 L38.0030837,21.323091" id="Oval-2-Copy-6" stroke="#FFFFFF" stroke-width="3"></path><polygon id="Triangle-2" fill="#FFFFFF" transform="translate(37.482899, 22.041852) rotate(147.000000) translate(-37.482899, -22.041852) " points="37.4828991 17.5418518 43.4828991 26.5418518 31.4828991 26.5418518"></polygon></g></g></g></svg>';

  const info = '<svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Icons" transform="translate(-179.000000, -43.000000)"><g id="Group-3" transform="translate(181.000000, 45.000000)"><circle id="Oval-2-Copy" stroke="#FFFFFF" stroke-width="3" cx="25" cy="25" r="25"></circle><path d="M30.25,33.1796875 C30.6718771,33.4296887 30.8828125,33.6718738 30.8828125,33.90625 C30.8828125,34.4687528 30.2031318,35.5781167 28.84375,37.234375 C27.0156159,39.4843863 25.3203203,40.609375 23.7578125,40.609375 C22.6171818,40.609375 22.046875,39.8515701 22.046875,38.3359375 C22.046875,37.6953093 22.2812477,35.726579 22.75,32.4296875 L23.6640625,26.0546875 L23.8984375,24.4375 L24.0859375,23.1484375 C24.1640629,22.6015598 24.203125,22.1406269 24.203125,21.765625 C24.203125,20.9843711 23.9843772,20.59375 23.546875,20.59375 C22.3281189,20.59375 21.015632,21.9374866 19.609375,24.625 C19.3124985,24.3593737 19.1640625,24.0937513 19.1640625,23.828125 C19.1640625,22.8749952 20.04296,21.593758 21.8007812,19.984375 C23.5586025,18.374992 24.9609323,17.5703125 26.0078125,17.5703125 C27.1796934,17.5703125 27.765625,18.3828044 27.765625,20.0078125 C27.765625,20.3203141 27.7031256,20.9609327 27.578125,21.9296875 L27.3671875,23.5 C27.3515624,23.6250006 27.2656258,24.2578068 27.109375,25.3984375 L26.1484375,32.1015625 L25.9140625,33.6015625 C25.7109365,35.0859449 25.609375,36.0781225 25.609375,36.578125 C25.609375,37.2500034 25.8046855,37.5859375 26.1953125,37.5859375 C27.5078191,37.5859375 28.859368,36.1172022 30.25,33.1796875 Z" id="i" fill="#FFFFFF"></path><circle id="Oval-3" fill="#FFFFFF" cx="25.5" cy="12.5" r="2.5"></circle></g></g></g></svg>';



  closeBtn.innerHTML = close;
  restartBtn.innerHTML = restart;
  infoBtn.innerHTML = info;


  return {
    closeBtn,
    restartBtn,
    infoBtn
  }

}

const ICON = new Icons();


/* 2.2 - UI */
function UIObject() {


  /* Private funcitons */

  // style an element with some properties
  function commonStyle(element) {
    const style = element.style;
    style.fontFamily = 'Arial';
    style.padding = '0';
    style.margin = '0';
    style.boxSizing = 'border-box';
    style.borderRadius = '5px';
  }


  // clear all intervals
  function clearIntervals() {
    for (var i = 0; i < 100; i++) {
      window.clearInterval(i);
    }

  }


  // creating elements
  function createDIV() {
    return document.createElement('div');

  }

  const overlay     = createDIV();
  const wrapper     = createDIV();
  const container   = createDIV();
  const title       = createDIV();
  const popUp       = createDIV();
  const timer       = createDIV();
  const buttonWrapp = createDIV();

  /* 1. instruction message */
  const infoMSG =

    '<p><span style="font-weight: 800">look at the' +
    ' circles for<br/> 3 seconds. </span>' +
    'after the numbers disapeard, click the circles One by One in the ' +
    '<span style="font-weight: 700">Ascending Order</span></p>';


  /* 2. retry message */
  const retryMSG =
    '<p><span style="font-weight: 700">Wrong! </span><br/><br/>' +
    'Try again...</p>';

  /* 3. success message */
  const successMSG = '<h3><br/>Succsess!<h3>';


  // text for title
  title.innerHTML =
    '<p>Memorize the numbers<br/>' +
    ' in the <span style="font-weight: 700">Ascending Order</span></p>';


  // Assembling
  append(overlay, wrapper);
  append(wrapper, title);
  append(wrapper, container);
  append(wrapper, buttonWrapp);

  append(buttonWrapp, ICON.infoBtn);
  append(buttonWrapp, ICON.restartBtn);
  append(buttonWrapp, ICON.closeBtn);



  // assigning element styles
  const overStyle = overlay.style;
  const wrapStyle = wrapper.style;
  const contStyle = container.style;
  const popStyle = popUp.style;
  const timerStyle = timer.style;


  const titlStyle = title.style;
  const btnWrapStyle = buttonWrapp.style;




  /* STYLING COMPONETNS */

  // overlay Style
  overStyle.position = 'absolute';
  overStyle.boxSizing = 'border-box';
  overStyle.width = window.innerWidth + 'px';
  overStyle.height = window.innerHeight + 'px';
  overStyle.top = window.pageYOffset + 'px';
  overStyle.left = window.pageXOffset + 'px';
  overStyle.backgroundColor = 'rgba(72, 72, 72, 0.8)';
  overStyle.color = colors.white;
  overStyle.fontFamily = 'Arial';
  //    commonStyle(overlay);


  // wrapper style
  wrapStyle.width = '320px';
  wrapStyle.height = '480px';
  wrapStyle.borderRadius = '10px';
  wrapStyle.backgroundColor = colors.royalBlue;
  wrapStyle.boxShadow = '0 0 20px #333333';
  wrapStyle.boxSizing = 'inherit';
  wrapStyle.position = 'relative';
  wrapStyle.left = '50%';
  wrapStyle.top = '50%';
  wrapStyle.transform = 'translate(-50%, -50%)';


  // pop up style
  popStyle.position = 'absolute';
  popStyle.left = '50%';
  popStyle.top = '50%';
  popStyle.transform = 'translate(-50%, -50%)'
  popStyle.backgroundColor = colors.royalBlue;
  popStyle.width = '300px';
  popStyle.height = '170px';
  popStyle.fontSize = '22px';
  popStyle.textAlign = 'center';
  popStyle.marginTop = '10px';
  popStyle.padding = '5px';
  popStyle.borderRadius = '10px';
  popStyle.boxShadow = '0 0 20px #333333';
  popStyle.cursor = 'default';
  popStyle.boxSizing = 'border-box';


  // title style
  titlStyle.width = '100%';
  titlStyle.height = '80px';
  titlStyle.display = 'inline-block'
  titlStyle.margin = '0';
  titlStyle.padding = '5px 10px';
  titlStyle.fontSize = '26px';
  titlStyle.backgroundColor = colors.transparent;

  const paragraph = title.firstChild
  paragraph.style.padding = '0';
  paragraph.style.margin = '0';
  paragraph.style.marginTop = '5px';
  paragraph.style.marginLeft = '5px';
  paragraph.style.cursor = 'default';

  // button wrapp style
  btnWrapStyle.width = '100%';
  btnWrapStyle.height = '50px';
  btnWrapStyle.padding = '5px 0';
  btnWrapStyle.backgroundColor = colors.transparent;



  // container style
  contStyle.width = '320px';
  contStyle.height = '320px';
  contStyle.backgroundColor = '#696969';
  contStyle.margin = '0 auto';
  contStyle.position = 'relative';
  contStyle.boxSizing = 'inherit';

  // timer style
  timerStyle.width = '150px';
  timerStyle.height = '150px';
  timerStyle.border = '5px solid #fff';
  timerStyle.borderRadius = '50%';
  timerStyle.backgroundColor = '#e55a04';
  timerStyle.color = '#FFF';
  timerStyle.boxShadow = '0 0 20px #292929';
  timerStyle.textAlign = 'center';
  timerStyle.fontSize = '130px';
  timerStyle.padding = 'none';
  timerStyle.position = 'absolute';
  timerStyle.left = '50%';
  timerStyle.top = '50%';
  timerStyle.transform = 'translate(-50%, -50%)';
  timerStyle.cursor = 'default';



  // Centering with resize event
  window.onresize = function () {

    if (overlay) {
      overStyle.width = window.innerWidth + 'px';
      overStyle.height = window.innerHeight + 'px';

    }
  }

  if (window.innerWidth > 700 && window.innerHeight > 700) {
    overStyle.transform = 'scale(1.1)';
  }
  // close button event
  ICON.closeBtn.onclick = function () {

    // at this point we have to clear all intervals
    clearIntervals();
    UI.close();
    SCROLL.enable();

    if (wrapper.lastChild == popUp) {
      wrapper.removeChild(popUp);
    }
  }

  // restart button action
  ICON.restartBtn.onclick = function () {
    clearIntervals();

    if (wrapper.lastChild == popUp) {
      wrapper.removeChild(popUp);
    }

    reStart();
  }


  ICON.infoBtn.onclick = function () {
    clearIntervals();
    UI.clearContainer();
    popUp.innerHTML = infoMSG;

    if (wrapper.lastChild == timer) {
      wrapper.removeChild(timer);
    }

    if (wrapper.lastChild == popUp) {
      wrapper.removeChild(popUp);
      reStart();
    } else {
      append(wrapper, popUp);
    }
  }

  // TODO: REFACTOR THIS BLOCK.
  // Methodes
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

    timer: function (callBack) {
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
            callBack() // this function will be executed after timer is over.
          }, 1000)
        }
      }
    },

    popUpRetry: function () {
      popUp.innerHTML = retryMSG;
      append(wrapper, popUp);
    },

    popUpSuccess: function () {
      popStyle.backgroundColor = colors.forestGreen;
      popUp.innerHTML = successMSG;
      append(wrapper, popUp);
    },

    clearContainer: function () {
      clearIntervals();
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    },

    removePopUp: function () {
      if (wrapper.lastChild == popUp) {
        wrapper.removeChild(popUp);
      }
    }
  } // return

}


/* 2.3 - Circle Object */
function Circle(value, randomX, randomY) {

  // Prototyping

  this.value = value;
  this.randomX = randomX;
  this.randomY = randomY;

  var moveCircle;

  var circle = document.createElement('input');

  circle.setAttribute('type', 'button');
  circle.setAttribute('value', value);

  const style = circle.style;

  // circle style
  style.width = '60px';
  style.height = '60px';
  style.maxWidth = '60px';
  style.maxHeight = '60px';
  style.fontSize = '54px';
  style.borderRadius = '100%';
  style.textDecoration = 'none';
  style.backgroundColor = colors.mediumBlue;
  style.color = '#fff';
  style.border = 'none';
  style.cursor = 'pointer';
  style.position = 'absolute';
  style.left = randomX + 'px';
  style.top = randomY + 'px';
  style.transition = 'box-shadow 0.3s, background-color 0.5s';


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
  }



  /* removing px Suffix from a string */
  //  function removePX(str) {
  //    var number = 0;
  //    number = strToInt(str.slice(0, -2));
  //    return number;
  //  }

  /* properties for moving the object */

  // frame per second
  const FPS = 60;

  // element size
  var elementSize = '60px';

  // element x position, y Position
  var elementXPos;
  var elementYPos;

  // element X speed, Y speed
  var Xspeed;
  var Yspeed;

  // edges
  var width = 260;
  var height = 260;

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

    //    println(elementXPos)

    circle.style.left = elementXPos + 'px';

    circle.style.top = elementYPos + 'px';

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
      for (var i = 0; i < 100; i++) {
        window.clearInterval(moveCircle);
      }

      disable();
    },

    rightPlay: function () {
      disable()
      style.backgroundColor = '#1f9103';
    },

    wrongPlay: function () {
      disable();
      style.backgroundColor = '#cc0000'
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





/**************************************
SECTION 3: set up
**************************************/

const ANCHOR  = new Anchor();
const UI      = new UIObject();
const SCROLL  = new Scroll();
const SUBMIT  = new Submit();



// start playing game with the circles.
function game(elements) {

  /* sorted copy of the circles */
  const sortedModel = makeSortedModel(elements);

  elements.forEach(function (element) {
    element.circle.onclick = function (event) {
      // value of the current circle
      const value = strToInt(this.getAttribute('value'));
      const baseNumber = sortedModel[0];


      /*
          if user clicks on the right circle
              stop current circle
              show the value
              change the color of the cirlce
              remove current index from Sorted Model array
      */


      if (value === baseNumber) {
        sortedModel.shift();
        element.rightPlay();
        element.stop();
        element.showValue();

        if (sortedModel.length === 0) {

          UI.popUpSuccess();

          setTimeout(function () {
            SUBMIT.enable();
            UI.close();
            SCROLL.enable();
            ANCHOR.checked();
          }, 500);

        }

      }


      /*
          if user clicks on the wrong circle:
              end the game
              show the values of the circles
              stop the intervals
              show a retry message for 2s
              then restart the game
      */
      else {
        elements.forEach(function (element) {
          element.stop();
          element.showValue();
          element.disable();
        });


        element.wrongPlay();
        UI.popUpRetry();
        setTimeout(function () {
          reStart();
        }, 2000)

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
  UI.removePopUp();

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







