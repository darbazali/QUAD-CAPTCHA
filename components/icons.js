// icon set
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




const BUTTON = {

  // general style for the buttons
  style: function (button) {

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
  },

  Button: function () {

    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    this.style(button);

    return button;;
  },

  // the buttons
  // 1. close button
  closeBTN: function () {
    button = this.Button();

    button.onclick = function () {
      console.log("close button clicked!")
    }
    button.innerHTML = '<svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Icons" transform="translate(-108.000000, -43.000000)" stroke="#FFFFFF" stroke-width="3"><g id="Group-4" transform="translate(110.000000, 45.000000)"><circle id="Oval-2" cx="25" cy="25" r="25"></circle><path d="M13.5,14.5 L37.5,36.5" id="Line-4" stroke-linecap="square"></path><path d="M13.5,14.5 L37.5,36.5" id="Line-4-Copy" stroke-linecap="square" transform="translate(25.500000, 25.500000) scale(1, -1) translate(-25.500000, -25.500000) "></path></g></g></g></svg>';

    return button;
  },

  // 2. info button
  infoBTN: function () {
    button = this.Button();

    button.onclick = function () {
      console.log("info button clicked!")
    }
    button.innerHTML = '<svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Icons" transform="translate(-179.000000, -43.000000)"><g id="Group-3" transform="translate(181.000000, 45.000000)"><circle id="Oval-2-Copy" stroke="#FFFFFF" stroke-width="3" cx="25" cy="25" r="25"></circle><path d="M30.25,33.1796875 C30.6718771,33.4296887 30.8828125,33.6718738 30.8828125,33.90625 C30.8828125,34.4687528 30.2031318,35.5781167 28.84375,37.234375 C27.0156159,39.4843863 25.3203203,40.609375 23.7578125,40.609375 C22.6171818,40.609375 22.046875,39.8515701 22.046875,38.3359375 C22.046875,37.6953093 22.2812477,35.726579 22.75,32.4296875 L23.6640625,26.0546875 L23.8984375,24.4375 L24.0859375,23.1484375 C24.1640629,22.6015598 24.203125,22.1406269 24.203125,21.765625 C24.203125,20.9843711 23.9843772,20.59375 23.546875,20.59375 C22.3281189,20.59375 21.015632,21.9374866 19.609375,24.625 C19.3124985,24.3593737 19.1640625,24.0937513 19.1640625,23.828125 C19.1640625,22.8749952 20.04296,21.593758 21.8007812,19.984375 C23.5586025,18.374992 24.9609323,17.5703125 26.0078125,17.5703125 C27.1796934,17.5703125 27.765625,18.3828044 27.765625,20.0078125 C27.765625,20.3203141 27.7031256,20.9609327 27.578125,21.9296875 L27.3671875,23.5 C27.3515624,23.6250006 27.2656258,24.2578068 27.109375,25.3984375 L26.1484375,32.1015625 L25.9140625,33.6015625 C25.7109365,35.0859449 25.609375,36.0781225 25.609375,36.578125 C25.609375,37.2500034 25.8046855,37.5859375 26.1953125,37.5859375 C27.5078191,37.5859375 28.859368,36.1172022 30.25,33.1796875 Z" id="i" fill="#FFFFFF"></path><circle id="Oval-3" fill="#FFFFFF" cx="25.5" cy="12.5" r="2.5"></circle></g></g></g></svg>';

    return button;
  },

  // 3. restart button
  restartBTN: function () {
    button = this.Button();

    button.onclick = function () {
      console.log("restart button clicked!")
    }
    button.innerHTML = '<svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Icons" transform="translate(-38.000000, -43.000000)"><g id="Group" transform="translate(40.000000, 45.000000)"><circle id="Oval-2-Copy-4" stroke="#FFFFFF" stroke-width="3" cx="25" cy="25" r="25"></circle><path d="M37.3937438,29.3565788 C35.7683668,34.3728416 31.0577675,38 25.5,38 C18.5964406,38 13,32.4035594 13,25.5 C13,18.5964406 18.5964406,13 25.5,13 C30.0450607,13 34.0235583,15.425745 36.2114728,19.0532151 L36.970375,20.1937468 C37.2509913,20.6154767 37.5940654,20.9921147 37.9878485,21.3107626 L38.0030837,21.323091" id="Oval-2-Copy-6" stroke="#FFFFFF" stroke-width="3"></path><polygon id="Triangle-2" fill="#FFFFFF" transform="translate(37.482899, 22.041852) rotate(147.000000) translate(-37.482899, -22.041852) " points="37.4828991 17.5418518 43.4828991 26.5418518 31.4828991 26.5418518"></polygon></g></g></g></svg>';

    return button;
  }
}

document.body.appendChild(BUTTON.closeBTN())
document.body.appendChild(BUTTON.infoBTN())
document.body.appendChild(BUTTON.restartBTN())
