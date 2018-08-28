
const println = console.log;


/* append element/elements to a node. */
function append(nodeName, element) {
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

const colors = {
  white:        '#FFF',
  transparent:  'rgba(255, 255, 255, 0)',
  darkGray:     '#979797',
  lightGray:    '#D8D8D8',
  mediumBlue:   '#0000CD',
  forestGreen:  '#228B22',
  dodgerBlue:   '#1E90FF',
  royalBlue:    '#4169E1'
}


/* the user interface */
function UIObject() {


  /* Private funcitons */
  // common styles for buttons
  function buttonCommonStyle(element) {

    const style = element.style;

    style.width = '15%';
    style.height = '50px';
    style.margin = '5px 15px';
    style.padding = '0 5px';
    style.fontSize = '40px';
    style.fontWeight = '400';
    style.backgroundColor = colors.transparent;
    style.display = 'inline-block';
    style.float = 'left'
    style.border = 'none';
    style.cursor = 'pointer';
    style.color = colors.white;
    style.transition = 'all .2s ease-in-out';

    const userAgent = window.navigator.userAgent;
    if (userAgent.match('Firefox')) {
      //            style.fontSize  = '58px';
      style.color = white;
      style.fontFamily = 'Arial';
    }


    /* remove outline whene element is fucuesd */
    element.onfocus = function () {
      this.style.outline = 'none';
    }

    /* scale buttons with hover event */
    element.onmouseover = function () {
      this.style.transform = 'scale(1.3)';
    }

    element.onmouseout = function () {
      this.style.transform = 'scale(1)';

    }

  }


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
  const closeButton = document.createElement('input');
  const restartButton = document.createElement('input');
  const infoButton = document.createElement('input');
  const zoomButton = document.createElement('input');

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


  // setting attributes
  closeButton.setAttribute('type', 'button');
  closeButton.setAttribute('value', '⊗');

  // restart button
  restartButton.setAttribute('type', 'button');
  restartButton.setAttribute('value', '⟳');

  infoButton.setAttribute('type', 'button');
  infoButton.setAttribute('value', 'ℹ︎');

  //zoom button
  zoomButton.setAttribute('type', 'button');
  zoomButton.setAttribute('value', '🔍');


  // Assembling
  append(overlay, wrapper);
  append(wrapper, title);
  append(wrapper, container);
  append(wrapper, buttonWrapp);

  append(buttonWrapp, zoomButton);
  append(buttonWrapp, infoButton);
  append(buttonWrapp, restartButton);
  append(buttonWrapp, closeButton);



  // assigning element styles
  const overStyle = overlay.style;
  const wrapStyle = wrapper.style;
  const contStyle = container.style;
  const popStyle = popUp.style;

  const titlStyle = title.style;
  const closeStyle = closeButton.style;
  const restStyle = restartButton.style;
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
  wrapStyle.borderRadius = '15px';
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
  popStyle.backgroundColor = 'rgba(0, 144, 105, 0.8)';
  popStyle.width = '300px';
  popStyle.height = '170px';
  popStyle.fontSize = '22px';
  popStyle.textAlign = 'center';
  popStyle.marginTop = '10px';
  popStyle.borderRadius = '15px';


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


  // restart button style
  buttonCommonStyle(restartButton);
  restStyle.fontSize = '32px';

  // close button style
  buttonCommonStyle(closeButton);


  buttonCommonStyle(infoButton);


  buttonCommonStyle(zoomButton);

  // container style
  contStyle.width = '320px';
  contStyle.height = '320px';
  contStyle.backgroundColor = '#696969';
  contStyle.margin = '0 auto';
  contStyle.position = 'relative';
  contStyle.boxSizing = 'inherit';
//  contStyle.borderRadius = '8px';




  /* Mobile version */
  if (window.innerWidth < 700) {
    zoomButton.disabled = true;
    zoomButton.style.cursor = 'default';
    zoomButton.style.opacity = '0.5';
  }


  // Centering with resize event
  window.onresize = function () {

    if (overlay) {
      overStyle.width = window.innerWidth + 'px';
      overStyle.height = window.innerHeight + 'px';

    }
  }


  // close button event
  closeButton.onclick = function () {

    // at this point we have to clear all intervals
//    clearIntervals();
//    UI.close();
//    SCROLL.enable();

    if (wrapper.lastChild == popUp) {
      wrapper.removeChild(popUp);
    }
  }

  // restart button action
  restartButton.onclick = function () {
    clearIntervals();

    if (wrapper.lastChild == popUp) {
      wrapper.removeChild(popUp);
    }

    reStart();
  }


  zoomButton.onclick = function () {
    overStyle.transform = 'scale(1.3)';
  }

  infoButton.onclick = function () {
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


const UI = new UIObject();


document.body.appendChild(UI.open())



