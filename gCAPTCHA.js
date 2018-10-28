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

const gCLink = 'Home Page: <a href="http://www.gCAPTCHA.com" style="color: #F5A623">gCAPTCHA.com</a>';

// IIFE: deploying viewport meta tag to the page.
(function () {
  let viewPort = document.createElement('meta');
  viewPort.setAttribute("name", "viewport");
  viewPort.setAttribute("content", "width=device-width, initial-scale=1.0");

  document.getElementsByTagName('head')[0].appendChild(viewPort);
})();


// random integer between tow numbers, min & max
function randomInt(min, max) {
  return Math.floor(Math.random() * ((max + 1) - min) + min);
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
    let RandomX = randomInt(0, 260);
    let RandomY = randomInt(0, 260);
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

/*

  the above function is used to create a sorted sample array
  of the randomized circles.

*/


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

  frameBack: '<svg width="320px" height="450px" viewBox="0 0 320 450" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-1"><stop stop-color="#0F0C29" offset="0%"></stop><stop stop-color="#302B63" offset="51.8470014%"></stop><stop stop-color="#1B2445" offset="100%"></stop></linearGradient><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-2"><stop stop-color="#FAD961" offset="0%"></stop><stop stop-color="#F76B1C" offset="100%"></stop></linearGradient></defs><g id="gCAPTCHA" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="iPhone-SE-Copy-7" transform="translate(-33.000000, -109.000000)"><g id="Frame" transform="translate(33.000000, 109.000000)"><rect id="Frame-Copy-6" fill="url(#linearGradient-1)" x="1" y="0" width="319.003115" height="450" rx="30"></rect><g id="Group" transform="translate(0.000000, 70.000000)" fill="url(#linearGradient-2)" opacity="0.0865513393"><rect id="Rectangle-12-Copy-143" x="227.28972" y="252.631579" width="49.8442368" height="60.1503759" rx="3"></rect><rect id="Rectangle-12-Copy-144" x="216.323988" y="241.804511" width="49.8442368" height="60.1503759" rx="3"></rect><rect id="Rectangle-12-Copy-145" x="282.11838" y="187.669173" width="37.8816199" height="60.1503759" rx="3"></rect><rect id="Rectangle-12-Copy-146" x="71.7757009" y="214.135338" width="29.9065421" height="37.2932331" rx="3"></rect><rect id="Rectangle-12-Copy-147" x="166.479751" y="298.345865" width="16.9470405" height="21.6541353" rx="3"></rect><rect id="Rectangle-12-Copy-148" x="219.314642" y="185.263158" width="16.9470405" height="21.6541353" rx="3"></rect><rect id="Rectangle-12-Copy-149" x="25.9190031" y="298.345865" width="16.9470405" height="21.6541353" rx="3"></rect><rect id="Rectangle-12-Copy-150" x="125.607477" y="42.1052632" width="49.8442368" height="60.1503759" rx="3"></rect><rect id="Rectangle-12-Copy-151" x="64.7975078" y="206.917293" width="29.9065421" height="37.2932331" rx="3"></rect><rect id="Rectangle-12-Copy-152" x="0" y="147.969925" width="20.9345794" height="37.2932331" rx="3"></rect><rect id="Rectangle-12-Copy-153" x="263.17757" y="138.345865" width="29.9065421" height="37.2932331" rx="3"></rect><rect id="Rectangle-12-Copy-154" x="241.246106" y="0" width="29.9065421" height="37.2932331" rx="3"></rect><rect id="Rectangle-12-Copy-155" x="111.65109" y="261.052632" width="16.9470405" height="21.6541353" rx="2"></rect><rect id="Rectangle-12-Copy-156" x="37.8816199" y="56.5413534" width="9.96884735" height="12.0300752" rx="2"></rect><rect id="Rectangle-12-Copy-157" x="94.7040498" y="24.0601504" width="9.96884735" height="12.0300752" rx="2"></rect><rect id="Rectangle-12-Copy-158" x="131.588785" y="84.2105263" width="9.96884735" height="12.0300752" rx="2"></rect><rect id="Rectangle-12-Copy-159" x="201.370717" y="12.0300752" width="9.96884735" height="12.0300752" rx="2"></rect><rect id="Rectangle-12-Copy-160" x="241.246106" y="96.2406015" width="9.96884735" height="12.0300752" rx="2"></rect><rect id="Rectangle-12-Copy-161" x="152.523364" y="211.729323" width="9.96884735" height="12.0300752" rx="2"></rect><rect id="Rectangle-12-Copy-162" x="183.426791" y="50.5263158" width="9.96884735" height="12.0300752" rx="2"></rect><rect id="Rectangle-12-Copy-163" x="183.426791" y="128.721805" width="9.96884735" height="12.0300752" rx="2"></rect><rect id="Rectangle-12-Copy-164" x="140.560748" y="144.360902" width="9.96884735" height="12.0300752" rx="2"></rect><rect id="Rectangle-12-Copy-165" x="34.8909657" y="80.6015038" width="9.96884735" height="12.0300752" rx="1"></rect><rect id="Rectangle-12-Copy-166" x="99.6884735" y="18.0451128" width="9.96884735" height="12.0300752" rx="1"></rect><rect id="Rectangle-12-Copy-167" x="136.573209" y="108.270677" width="4.98442368" height="6.01503759" rx="0.5"></rect><rect id="Rectangle-12-Copy-168" x="136.573209" y="3.60902256" width="4.98442368" height="6.01503759" rx="0.5"></rect><rect id="Rectangle-12-Copy-169" x="47.8504673" y="9.62406015" width="4.98442368" height="6.01503759" rx="0.5"></rect><rect id="Rectangle-12-Copy-170" x="50.8411215" y="3.60902256" width="4.98442368" height="6.01503759" rx="0.5"></rect><rect id="Rectangle-12-Copy-171" x="206.35514" y="6.01503759" width="9.96884735" height="12.0300752" rx="1.5"></rect><rect id="Rectangle-12-Copy-172" x="246.23053" y="90.2255639" width="9.96884735" height="12.0300752" rx="2.5"></rect><rect id="Rectangle-12-Copy-173" x="157.507788" y="205.714286" width="9.96884735" height="12.0300752" rx="2.5"></rect><rect id="Rectangle-12-Copy-174" x="188.411215" y="44.5112782" width="9.96884735" height="12.0300752" rx="2.5"></rect><rect id="Rectangle-12-Copy-175" x="188.411215" y="122.706767" width="9.96884735" height="12.0300752" rx="2.5"></rect><rect id="Rectangle-12-Copy-176" x="52.834891" y="122.706767" width="9.96884735" height="12.0300752" rx="2.5"></rect></g><g id="Group-Copy-16" opacity="0.0439395357" transform="translate(132.588785, 81.000000)"><ellipse id="Oval-12-Copy-6" stroke="#FFB63E" stroke-width="4" cx="29.9065421" cy="30" rx="29.9065421" ry="30"></ellipse><text id="1" font-family="ArialMT, Arial" font-size="58" font-weight="normal" fill="#FFB63E"><tspan x="12.9595016" y="55">1</tspan></text></g><g id="Group-Copy-20" opacity="0.055826" transform="translate(161.498442, 204.000000)"><ellipse id="Oval-12-Copy-6" stroke="#FFB63E" stroke-width="4" cx="29.9065421" cy="30" rx="29.9065421" ry="30"></ellipse><text id="5" font-family="ArialMT, Arial" font-size="58" font-weight="normal" fill="#FFB63E"><tspan x="12.9595016" y="55">5</tspan></text></g><g id="Group-5-Copy-5" opacity="0.0646986429" transform="translate(21.934579, 247.000000)"><ellipse id="Oval-12-Copy-10" stroke="#FFB63E" stroke-width="4" cx="29.9065421" cy="30" rx="29.9065421" ry="30"></ellipse><rect id="Rectangle-12" fill="#FFB63E" transform="translate(29.906542, 30.500000) rotate(45.000000) translate(-29.906542, -30.500000) " x="27.9127726" y="9" width="3.98753894" height="43" rx="1.99376947"></rect><rect id="Rectangle-12-Copy-35" fill="#FFB63E" transform="translate(29.906542, 30.500000) scale(1, -1) rotate(45.000000) translate(-29.906542, -30.500000) " x="27.9127726" y="9" width="3.98753894" height="43" rx="1.99376947"></rect></g></g></g></g></svg>',


  closeIcon: '<svg width="45px" height="45px" viewBox="0 0 45 45" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="gCAPTCHA" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="iPhone-SE-Copy-7" transform="translate(-285.000000, -508.000000)"><g id="Group-4" transform="translate(285.000000, 508.000000)"><rect id="Rectangle-13-Copy-2" stroke="#F5A623" x="0.5" y="0.5" width="44" height="44" rx="10"></rect><path d="M24.7561385,23 L34.5327384,32.385536 C35.1557539,32.9836308 35.1557539,33.9533341 34.5327384,34.5514289 C33.909723,35.1495237 32.8996154,35.1495237 32.2766,34.5514289 L22.5,25.1658929 L12.7234,34.5514289 C12.1003846,35.1495237 11.090277,35.1495237 10.4672616,34.5514289 C9.84424614,33.9533341 9.84424614,32.9836308 10.4672616,32.385536 L20.2438615,23 L10.4672616,13.614464 C9.84424614,13.0163692 9.84424614,12.0466659 10.4672616,11.4485711 C11.090277,10.8504763 12.1003846,10.8504763 12.7234,11.4485711 L22.5,20.8341071 L32.2766,11.4485711 C32.8996154,10.8504763 33.909723,10.8504763 34.5327384,11.4485711 C35.1557539,12.0466659 35.1557539,13.0163692 34.5327384,13.614464 L24.7561385,23 Z" id="Combined-Shape" fill="#FFB63E"></path></g></g></g></svg>',


  infoIcon: '<svg width="45px" height="45px" viewBox="0 0 45 45" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="gCAPTCHA" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="iPhone-SE-Copy-7" transform="translate(-57.000000, -508.000000)"><g id="Group-2" transform="translate(57.000000, 508.000000)"><rect id="Rectangle-13-Copy-4" stroke="#F5A623" x="0.5" y="0.5" width="44" height="44" rx="10"></rect><path d="M28.352,30.5829095 C28.7840022,30.8324868 29,31.0742613 29,31.3082401 C29,31.8697892 28.304007,32.9772722 26.912,34.6307223 C25.0399906,36.8769187 23.304008,38 21.704,38 C20.5359942,38 19.952,37.2434799 19.952,35.7304171 C19.952,35.0908751 20.1919976,33.1254827 20.672,29.8341811 L21.608,23.4699898 L21.848,21.8555443 L22.04,20.5686673 C22.1200004,20.0227168 22.16,19.5625655 22.16,19.1881994 C22.16,18.4082701 21.9360022,18.0183113 21.488,18.0183113 C20.2399938,18.0183113 18.8960072,19.3597696 17.456,22.0427263 C17.1519985,21.7775504 17,21.5123784 17,21.2472024 C17,20.2956887 17.899991,19.0166238 19.7,17.4099695 C21.500009,15.8033151 22.9359946,15 24.008,15 C25.208006,15 25.808,15.8111143 25.808,17.4333672 C25.808,17.745339 25.7440006,18.3848714 25.616,19.3519837 L25.4,20.9196338 C25.3839999,21.0444225 25.2960008,21.6761557 25.136,22.8148525 L24.152,29.5066124 L23.912,31.0040692 C23.703999,32.4859348 23.6,33.4764302 23.6,33.9755849 C23.6,34.6463241 23.799998,34.9816887 24.2,34.9816887 C25.5440067,34.9816887 26.9279929,33.5154436 28.352,30.5829095 Z M23.5,13 C22.1192881,13 21,11.8807119 21,10.5 C21,9.11928813 22.1192881,8 23.5,8 C24.8807119,8 26,9.11928813 26,10.5 C26,11.8807119 24.8807119,13 23.5,13 Z" id="Combined-Shape" fill="#F5A623"></path></g></g></g></svg>',


  restartIcon: '<svg width="45px" height="45px" viewBox="0 0 45 45" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="gCAPTCHA" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="iPhone-SE-Copy-7" transform="translate(-175.000000, -508.000000)"><g id="Group-3" transform="translate(175.000000, 508.000000)"><rect id="Rectangle-13-Copy-3" stroke="#F5A623" x="0.5" y="0.5" width="44" height="44" rx="10"></rect><path d="M33,13.5687832 L33,12 C33,11.4477153 33.4477153,11 34,11 C34.5522847,11 35,11.4477153 35,12 L35,19 L28,19 C27.4477153,19 27,18.5522847 27,18 C27,17.4477153 27.4477153,17 28,17 L31.9980668,17 C29.9570923,14.0645375 26.4283798,12 22.8342321,12 C16.8310328,12 11.9644783,16.9248678 11.9644783,23 C11.9644783,29.0751322 16.8310328,34 22.8342321,34 C27.3825296,34 31.5100374,30.8345571 32.9949536,26.9172785 C34.4798698,23 36.7357623,25.6804553 35.7649787,27.9859113 C33.5334092,33.2855321 28.622423,37 22.8342321,37 C15.1937967,37 9,30.7319865 9,23 C9,15.2680135 15.1937967,9 22.8342321,9 C26.6882871,9 30.3872309,10.7814031 33,13.5687832 Z" id="Combined-Shape-Copy-2" fill="#F5A623"></path></g></g></g></svg>',


  successPopUP: '<svg width="160px" height="190px" viewBox="0 0 160 190" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="gCAPTCHA" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="iPhone-SE-Copy-5" transform="translate(-114.000000, -239.000000)"><g id="Group-2" transform="translate(114.000000, 239.000000)"><rect id="Rectangle-13" stroke="#85FF00" fill="#211643" opacity="0.60452" x="0.5" y="0.5" width="159" height="189" rx="15"></rect><text id="success" font-family="ArialMT, Arial" font-size="32" font-weight="normal" fill="#96E93B"><tspan x="22.703125" y="142">success</tspan></text><path d="M72.2259668,70.3271238 L114.527964,28.0251263 C115.894799,26.6582912 118.110877,26.6582912 119.477712,28.0251263 C120.844547,29.3919613 120.844547,31.6080387 119.477712,32.9748737 L74.9299845,77.5226009 C73.9376001,78.5149854 72.4975443,78.7868536 71.2598767,78.3382055 C70.5640783,78.2230065 69.8963867,77.8970387 69.35965,77.360302 L46.0251263,54.0257782 C44.6582912,52.6589432 44.6582912,50.4428658 46.0251263,49.0760308 C47.3919613,47.7091957 49.6080387,47.7091957 50.9748737,49.0760308 L72.2259668,70.3271238 Z" id="Combined-Shape" fill="#85FF00"></path></g></g></g></svg>',


  failPopUP: '<svg width="160px" height="190px" viewBox="0 0 160 190" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="gCAPTCHA" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="iPhone-SE-Copy-6" transform="translate(-115.000000, -255.000000)"><g id="Group-2" transform="translate(115.000000, 255.000000)"><rect id="Rectangle-13" stroke="#FF6034" fill="#211643" opacity="0.60452" x="0.5" y="0.5" width="159" height="189" rx="15"></rect><text id="oops!-try-again" font-family="ArialMT, Arial" font-size="32" font-weight="normal" fill="#FF6034"><tspan x="41.359375" y="124">oops!</tspan><tspan x="19.1328125" y="160">try again</tspan></text><path d="M85.0165043,51.4809704 L106.229708,72.6941738 C107.206018,73.6704846 107.206018,75.253397 106.229708,76.2297077 C105.253397,77.2060185 103.670485,77.2060185 102.694174,76.2297077 L81.4809704,55.0165043 L60.267767,76.2297077 C59.2914562,77.2060185 57.7085438,77.2060185 56.732233,76.2297077 C55.7559223,75.253397 55.7559223,73.6704846 56.732233,72.6941738 L77.9454365,51.4809704 L56.732233,30.267767 C55.7559223,29.2914562 55.7559223,27.7085438 56.732233,26.732233 C57.7085438,25.7559223 59.2914562,25.7559223 60.267767,26.732233 L81.4809704,47.9454365 L102.694174,26.732233 C103.670485,25.7559223 105.253397,25.7559223 106.229708,26.732233 C107.206018,27.7085438 107.206018,29.2914562 106.229708,30.267767 L85.0165043,51.4809704 Z" id="Combined-Shape" fill="#FF6034"></path></g></g></g></svg>'
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
  const target = document.querySelector('.d-captcha-div');
  const submit = document.querySelector('.d-captcha-submit');
  //  const d_c_anchor = target[0];
  const checkMark = '&#10003';

  // assembling
  title.innerHTML = "I'm not a robot";
  append(anchor, checkbox);
  append(anchor, title);
  append(target, anchor);


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
    let wHeight = window.innerHeight;

    if (wHeight < 450) {
      alert('Please put your device in Portraite mode, and try again!')
    } else {
      UI.open();
      UI.centerUI();
      buildGame();
      SCROLL.disable();
    }
  }


  return {
    checked: function () {
      checkbox.parentNode.replaceChild(checkedBox, checkbox);
      submit.setAttribute('disabled', 'false');
    }
  }
}


/* 2.2 = Buttons */
function Icons() {

  // general style for buttons
  function btnStyle(button) {
    const style = button.style;

    style.width = '45px';
    style.height = '45px';
    style.padding = '0';
    style.boxSizing = 'border-box';
    style.display = 'inline-block';
    style.cursor = 'pointer';
    //    style.margin = '0';
    //    style.marginLeft = '60px';
    //    style.marginRight = '60px';
    style.borderRadius = '0';
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

  infoBtn.style.marginLeft = '65px';
  infoBtn.style.marginRight = '30px';
  restartBtn.style.marginRight = '30px';


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
  }

  /*--------- creating elements --------*/

  const overlay = createDiv();
  const wrapper = createDiv();
  const backGround = createDiv();
  const frame = createDiv();

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
    wrapperStyle: "width: 320px; height: 450px; border-radius: 30px;" +
      "background-color: transparent;  position: relative;",

    frameStyle: "width: 320px; height: 450px; border-radius: 30px;" +
      " background-color: transparent;",


    // info style
    infoStyle: "width: 300px; height: 300px; font-size: 22px; text-align: left;" +
      "margin: 5px 5px; border-radius: 10px; cursor: default; position: absolute;" +
      "background-color: transparent; padding: 5px 10px; opacity: 0.9;" +
      "color: #F5A623;",



    /* title style */
    titleBlockStyle: "width: 100%; height: 70px; margin: 0; padding: 5px 0;" +
      "font-size: 26px; font-weight: bold; background-color: " + colors.transparent + "; text-align: center;",

    titleStyle: "margin: 0; padding: 0; cursor: default; color: #F5A623",


    // button container style
    buttonBlockStyle: "width: 320; height: 60px; margin-top: 5px; padding: 0;" +

      "background-color: " + colors.transparent + ";",

    // container style
    containerStyle: "width: 320px; height: 320px; margin: 0 auto; position: relative;" +
      "background-color: transparent;" +
      "border-top: 1px solid #915f0b; border-bottom: 1px solid #915f0b;",


    timerStyle: "width: 170px; height: 75px; border: 2px solid #3B3B3B; border-radius: 15px; " +
      "text-align: center; font-size: 48px; position: absolute; cursor: default; color: #FFF;" +
      "background-color: " + colors.redOrange + "; font-weight: 100;",


    popUPBlockStyle: "width: 320px; height: 320px; background-color: #4A4A4A;" +
      "font-size: 32px;",

    faded: "display: block; opacity: 0; visibility: hidden; transition: visibility .5s linear, opacity .5s linear;"


  }

  // TODO: modify UI style

  // horizontal line breaker
  const lineBreak = '<hr style="height:1px;border:none;color:#ccc;background-color:#F5A623; margin: 10px 0; opacity: 0.9;"/>';

  /* 1. instruction message */
  const infoMSG =

    '<p>Look at the Circles for 3sec, after the numbers desapeard, click them One-by-One in the Ascending Order.' + lineBreak + 'Click on the reload button for new game.</p>' + lineBreak + gCLink;


  // text for title
  const titleMSg =
    '<p>Memorize the numbers<br/>' +
    ' in the Ascending Order.</p>';


  backGround.innerHTML = SVG.frameBack;
  info.innerHTML = infoMSG;
  successPOPUP.innerHTML = SVG.successPopUP;
  failPOPUP.innerHTML = SVG.failPopUP;


  // Assembling
  append(overlay, wrapper);
  append(wrapper, backGround)
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
  styleElem(buttonBlock, STYLES.resetStyle + STYLES.buttonBlockStyle)
  styleElem(timer, STYLES.timerStyle + STYLES.centerStyle + STYLES.boxShadow)
  styleElem(info, STYLES.infoStyle + STYLES.centerStyle)

  styleElem(popUPBlock, STYLES.centerStyle + STYLES.absPos + STYLES.popUPBlockStyle + STYLES.faded);
  styleElem(successPOPUP, STYLES.centerStyle + STYLES.absPos + STYLES.faded);
  styleElem(failPOPUP, STYLES.centerStyle + STYLES.absPos + STYLES.faded);





  // Centering with resize event
  window.onresize = function () {

    // center the UI to the screen
    if (isInPage(overlay)) {
      overlay.style.width = window.innerWidth + 'px';
      overlay.style.height = window.innerHeight + 'px';
      overlay.style.top = window.pageYOffset + 'px';
      overlay.style.left = window.pageXOffset + 'px';

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
      overlay.style.transform = 'scale(1.3)';
      overlay.style.msTransform = 'scale(1.3)';
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
    this.style.transform = 'scale(1)';
    this.style.opacity = '0.8';

    toggle(frame, info);
  }

  // restart button action
  ICON.restartBtn.onclick = function () {
    //    UI.removeTimer();
    UI.clearContainer();

    toggle(frame, info);
    toggle(frame, failPOPUP);
    clearIntervals();

    //    fadeCont(popUPBlock);

    reStart();
  }


  ICON.infoBtn.onclick = function () {
    clearIntervals();
    UI.removeTimer();
    UI.clearContainer();
    //    popUp.innerHTML = infoMSG;
    fade(popUPBlock);
    toggle(frame, info, true, reStart);
  }

  /*--------- properties and methodes --------*/
  return {

    container: function () {
      return container;
    },

    centerUI: function () {
      if (isInPage(overlay)) {

        let style = overlay.style;
        style.width = window.innerWidth + 'px';
        style.height = window.innerHeight + 'px';
        style.top = window.pageYOffset + 'px';
        style.left = window.pageXOffset + 'px';

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

    ready: function(func) {
      popUPBlock.style.opacity = '1';
      popUPBlock.style.visibility = 'visible';
      append(frame, timer);
      timer.innerHTML = 'Ready!';
        setTimeout(function() {
          frame.removeChild(timer);
          popUPBlock.style.opacity = '0';
          popUPBlock.style.visibility = 'hidden';
          func(); // start game after showing ready alert.
        }, 1200);
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
    "font-size: 50px; border-radius: 100%; text-decoration: none;" +
    "color: #F5A623; border: 4px solid #F5A623; cursor: pointer; position: absolute;" +
    "left: " + randomX + "px;" + "top: " + randomY + "px;" +
    "transition: box-shadow 0.3s, background-color 0.5s;" +
    "background-color: transparent;" +
    "outline: 0; padding: 0; margin: 0; text-align: center;" +
    "font-weight: 500;";

  styleElem(circle, cSTYLE)

  const style = circle.style;

  /* chage style with hover effect */
  circle.onmouseover = function () {
    style.boxShadow = '0px 0px 20px #F5A623';
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


    circle.style.left = elementXPos + 'px';
    circle.style.top = elementYPos + 'px';

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
      //      style.backgroundColor = '#138b13';
    },

    wrongPlay: function () {
      disable();
      circle.setAttribute('value', 'X');
      //      style.backgroundColor = colors.redOrange;
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
  UI.ready(startGame)

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
