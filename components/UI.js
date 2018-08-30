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

const colors = {
  white: '#FFF',
  transparent: 'rgba(255, 255, 255, 0)',
  darkGray: '#979797',
  lightGray: '#D8D8D8',
  mediumBlue: '#0000CD',
  forestGreen: '#228B22',
  royalBlue: '#4169E1'
}

const ICON = new Icons();

/* the user interface */
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
  const overlay = document.createElement('div');
  const wrapper = document.createElement('div');
  const container = document.createElement('div');
  const title = document.createElement('div');
  const popUp = document.createElement('div');

  const buttonWrapp = document.createElement('div');

  /*
      implementing pop up messages
      how many messages do we need
      1. instruction message
      2. wrong playing message
      3. success message

      1. this pop up should appear with first start and
          when user clicks on info button

      2. this pop up should appear when user plays wrong playing

      3. this pop up should appear when user plays right playing
  */

  /* 1. instruction message */
  const infoMSG =

    '<p><span style="font-weight: 800">look at the' +
    ' circles for<br/> 3 seconds. </span><br/>' +
    'after the numbers disapeard, try to memorize them in the ' +
    '<span style="font-weight: 700">Ascending Order</span></p>';


  /* 2. retry message */
  const retryMSG =
    '<p><span style="font-weight: 700">Wrong! </span><br/>' +
    'Try again...</p>';

  /* 3. success message */
  const successMSG = '<h3>Succsess!<h3>';


  // text for title
  title.innerHTML =
    '<p>Memorize the numbers<br/>' +
    ' in the <span style="font-weight: 700">Ascending Order</span></p>';



  // Assembling
  append(overlay, wrapper);
  append(wrapper, title);
  append(wrapper, container);
  append(wrapper, buttonWrapp);

  append(buttonWrapp, ICON.infoButton());
  append(buttonWrapp, ICON.restartButton());
  append(buttonWrapp, ICON.closeButton());



  // assigning element styles
  const overStyle = overlay.style;
  const wrapStyle = wrapper.style;
  const contStyle = container.style;
  const popStyle = popUp.style;

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
  popStyle.borderRadius = '10px';
  popStyle.boxShadow = '0 0 20px #333333';


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





  // Centering with resize event
  window.onresize = function () {

    if (overlay) {
      overStyle.width = window.innerWidth + 'px';
      overStyle.height = window.innerHeight + 'px';

    }
  }


  // close button event
  ICON.closeButton().onclick = function () {

    // at this point we have to clear all intervals
    //    clearIntervals();
    //    UI.close();
    //    SCROLL.enable();

    if (wrapper.lastChild == popUp) {
      wrapper.removeChild(popUp);
    }
  }

  // restart button action
  ICON.restartButton().onclick = function () {
    clearIntervals();

    if (wrapper.lastChild == popUp) {
      wrapper.removeChild(popUp);
    }

    reStart();
  }


  ICON.infoButton().onclick = function () {
    //    clearIntervals();
    UI.clearContainer();
    popUp.innerHTML = infoMSG;

    if (wrapper.lastChild == popUp) {
      wrapper.removeChild(popUp);
      //      reStart();
    } else {
      append(wrapper, popUp);
    }
  }


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

    popUp: function () {
      popUp.innerHTML = infoMSG;
      append(wrapper, popUp)
    },

    popUpRetry: function () {
      popUp.innerHTML = retryMSG;
      append(wrapper, popUp);
    },

    popUpSuccess: function () {
      popUp.innerHTML = successMSG;
      append(wrapper, popUp);
    },

    clearContainer: function () {
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

// icon set

function Icons() {

  // general style for buttons
  function btnStyle(button) {
    const style = button.style;

    style.width = '50px';
    style.height = '50px';
    style.padding = '0';
    style.boxSizing = 'border-box';
    style.display = 'inline-block';
    style.margin = '0px 28px';
    style.transition = 'all 0.3s';
    style.backgroundColor = colors.transparent;

    button.onmouseover = function () {
      style.opacity = '0.8';
      style.transform = 'scale(1.1)';
    }

    button.onmouseout = function () {
      style.opacity = '1';
      style.transform = 'scale(1)';
    }
  }


  // icon names

  const closeBtn = document.createElement('div');
  const infoBtn = document.createElement('div');
  const restartBtn = document.createElement('div');


  btnStyle(closeBtn);
  btnStyle(infoBtn);
  btnStyle(restartBtn);

  const close = '<svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Icons" transform="translate(-108.000000, -43.000000)" stroke="#FFFFFF" stroke-width="3"><g id="Group-4" transform="translate(110.000000, 45.000000)"><circle id="Oval-2" cx="25" cy="25" r="25"></circle><path d="M13.5,14.5 L37.5,36.5" id="Line-4" stroke-linecap="square"></path><path d="M13.5,14.5 L37.5,36.5" id="Line-4-Copy" stroke-linecap="square" transform="translate(25.500000, 25.500000) scale(1, -1) translate(-25.500000, -25.500000) "></path></g></g></g></svg>';


  const restart = '<svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Icons" transform="translate(-38.000000, -43.000000)"><g id="Group" transform="translate(40.000000, 45.000000)"><circle id="Oval-2-Copy-4" stroke="#FFFFFF" stroke-width="3" cx="25" cy="25" r="25"></circle><path d="M37.3937438,29.3565788 C35.7683668,34.3728416 31.0577675,38 25.5,38 C18.5964406,38 13,32.4035594 13,25.5 C13,18.5964406 18.5964406,13 25.5,13 C30.0450607,13 34.0235583,15.425745 36.2114728,19.0532151 L36.970375,20.1937468 C37.2509913,20.6154767 37.5940654,20.9921147 37.9878485,21.3107626 L38.0030837,21.323091" id="Oval-2-Copy-6" stroke="#FFFFFF" stroke-width="3"></path><polygon id="Triangle-2" fill="#FFFFFF" transform="translate(37.482899, 22.041852) rotate(147.000000) translate(-37.482899, -22.041852) " points="37.4828991 17.5418518 43.4828991 26.5418518 31.4828991 26.5418518"></polygon></g></g></g></svg>';

  const info = '<svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Icons" transform="translate(-179.000000, -43.000000)"><g id="Group-3" transform="translate(181.000000, 45.000000)"><circle id="Oval-2-Copy" stroke="#FFFFFF" stroke-width="3" cx="25" cy="25" r="25"></circle><path d="M30.25,33.1796875 C30.6718771,33.4296887 30.8828125,33.6718738 30.8828125,33.90625 C30.8828125,34.4687528 30.2031318,35.5781167 28.84375,37.234375 C27.0156159,39.4843863 25.3203203,40.609375 23.7578125,40.609375 C22.6171818,40.609375 22.046875,39.8515701 22.046875,38.3359375 C22.046875,37.6953093 22.2812477,35.726579 22.75,32.4296875 L23.6640625,26.0546875 L23.8984375,24.4375 L24.0859375,23.1484375 C24.1640629,22.6015598 24.203125,22.1406269 24.203125,21.765625 C24.203125,20.9843711 23.9843772,20.59375 23.546875,20.59375 C22.3281189,20.59375 21.015632,21.9374866 19.609375,24.625 C19.3124985,24.3593737 19.1640625,24.0937513 19.1640625,23.828125 C19.1640625,22.8749952 20.04296,21.593758 21.8007812,19.984375 C23.5586025,18.374992 24.9609323,17.5703125 26.0078125,17.5703125 C27.1796934,17.5703125 27.765625,18.3828044 27.765625,20.0078125 C27.765625,20.3203141 27.7031256,20.9609327 27.578125,21.9296875 L27.3671875,23.5 C27.3515624,23.6250006 27.2656258,24.2578068 27.109375,25.3984375 L26.1484375,32.1015625 L25.9140625,33.6015625 C25.7109365,35.0859449 25.609375,36.0781225 25.609375,36.578125 C25.609375,37.2500034 25.8046855,37.5859375 26.1953125,37.5859375 C27.5078191,37.5859375 28.859368,36.1172022 30.25,33.1796875 Z" id="i" fill="#FFFFFF"></path><circle id="Oval-3" fill="#FFFFFF" cx="25.5" cy="12.5" r="2.5"></circle></g></g></g></svg>';



  closeBtn.innerHTML = close;
  restartBtn.innerHTML = restart;
  infoBtn.innerHTML = info;


  return {
    closeButton: function () {
      return closeBtn;
    },

    restartButton: function () {
      return restartBtn;
    },

    infoButton: function () {
      return infoBtn
    }
  }

}






const UI = new UIObject();


document.body.appendChild(UI.open())
