
const println = console.log;

/* append an element to a spesific node */
function append(nodeName, element) {
    return nodeName.appendChild(element);
}


/* the user interface */
function UIObject() {

    // colors
    const mattBlack     = '#393653';
    const darckGray     = '#49536C';
    const white         = '#FFFFFF';
    const violet        = '#8D57F5';
    const redPink       = '#DB51BE';
    const transparent   = 'rgba(255, 255, 255, 0)';

    /* Private funcitons */
    // common styles for buttons
    function buttonCommonStyle(element) {

        const style = element.style;

        style.width             = '15%';
        style.height            = '50px';
        style.margin            = '5px 15px';
        style.padding           = '0 5px';
        style.fontSize          = '40px';
        style.fontWeight        = '400';
        style.backgroundColor   = transparent;
        style.display           = 'inline-block';
        style.float             = 'left'
        style.border            = 'none';
        style.cursor            = 'pointer';
        style.color             = white;
        style.transition        = 'all .2s ease-in-out';

        const userAgent = window.navigator.userAgent;
        if (userAgent.match('Firefox')) {
//            style.fontSize  = '58px';
            style.color     = white;
            style.fontFamily = 'Arial';
        }


        /* remove outline whene element is fucuesd */
        element.onfocus = function () {
            this.style.outline = 'none';
        }

        /* scale buttons with hover event */
        element.onmouseover = function() {
            this.style.transform = 'scale(1.3)';
        }

        element.onmouseout = function() {
            this.style.transform = 'scale(1)';

        }

    }


    // style an element with some properties
    function commonStyle(element) {
        const style = element.style;
        style.fontFamily    = 'Arial';
        style.padding       = '0';
        style.margin        = '0';
        style.boxSizing     = 'border-box';
        style.borderRadius  = '5px';
    }


    // creating elements
    const overlay         = document.createElement('div');
    const wrapper         = document.createElement('div');
    const container       = document.createElement('div');
    const title           = document.createElement('div');
    const popUp           = document.createElement('div');

    const buttonWrapp     = document.createElement('div');
    const closeButton     = document.createElement('input');
    const restartButton   = document.createElement('input');
    const infoButton      = document.createElement('input');
    const zoomButton      = document.createElement('input');


    // text for title
    title.innerHTML = '<p>Memorize the numbers<br/> in the <span style="font-weight: 700">Ascending Order</span></p>';

    // text for pop up message
    popUp.innerHTML = '<p>look at the circles for (3 sec), ' +
        'after the numbers disapeard click them in the <span style="font-weight: 700">Ascending Order</span></p>';

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
    zoomButton.setAttribute('value', '⊕');


    // Assembling
    append(overlay, wrapper);
    append(wrapper, title);
    append(wrapper, container);
    append(wrapper, popUp);
    append(wrapper, buttonWrapp);

    append(buttonWrapp, zoomButton);
    append(buttonWrapp, infoButton);
    append(buttonWrapp, restartButton);
    append(buttonWrapp, closeButton);



    // assigning element styles
    const overStyle     = overlay.style;
    const wrapStyle     = wrapper.style;
    const contStyle     = container.style;
    const popStyle      = popUp.style;

    const titlStyle     = title.style;
    const closeStyle    = closeButton.style;
    const restStyle     = restartButton.style;
    const btnWrapStyle  = buttonWrapp.style;




    /* STYLING COMPONETNS */

    // overlay Style
    overStyle.position          = 'absolute';
    overStyle.boxSizing         = 'border-box';
    overStyle.width             = window.innerWidth  + 'px';
    overStyle.height            = window.innerHeight + 'px';
    overStyle.top               = window.pageYOffset + 'px';
    overStyle.left              = window.pageXOffset + 'px';
    overStyle.backgroundColor   = transparent;
    overStyle.color             = white;
    overStyle.display           = 'flex';
    overStyle.justifyContent    = 'center';
    overStyle.alignItems        = 'center';
    overStyle.fontFamily        = 'Arial';
//    commonStyle(overlay);


    // wrapper style
    wrapStyle.width             = '320px';
    wrapStyle.height            = '480px';
//    wrapStyle.border            = '3px solid #fff';
    wrapStyle.borderRadius      = '15px';
    wrapStyle.backgroundColor   = '#177cff';
    wrapStyle.boxShadow         = '0 0 20px #000';
    wrapStyle.boxSizing         = 'inherit';
    wrapStyle.position          = 'relative';


    // pop up style
    popStyle.position           = 'absolute';
    popStyle.left               = '0';
    popStyle.top                = '90px';
    popStyle.backgroundColor    = 'rgba(93, 93, 93, 0.62)';
    popStyle.width              = '320px';
    popStyle.height             = '320px';
    popStyle.fontSize           = '28px';
    commonStyle(popUp);
    popStyle.padding            = '60px 10px';


    // title style
    titlStyle.width             = '100%';
    titlStyle.height            = '80px';
    titlStyle.display           = 'inline-block'
    titlStyle.margin            = '0';
    titlStyle.padding           = '5px 10px';
    titlStyle.fontSize          = '26px';
    titlStyle.backgroundColor   = transparent;

    const paragraph = title.firstChild
    paragraph.style.padding     = '0';
    paragraph.style.margin      = '0';
    paragraph.style.marginTop   = '5px';
    paragraph.style.marginLeft  = '5px';

//    titlStyle.textAlign         = 'center';


    // button wrapp style
    btnWrapStyle.width              = '100%';
    btnWrapStyle.height             = '50px';
    btnWrapStyle.padding            = '5px 0';
    btnWrapStyle.backgroundColor    = transparent;


    // restart button style
    buttonCommonStyle(restartButton);
//    restStyle.marginTop = '-3px';
    restStyle.fontSize = '32px';

    // close button style
    buttonCommonStyle(closeButton);
//    closeStyle.color = '#e03400';


    buttonCommonStyle(infoButton);


    buttonCommonStyle(zoomButton);

    // container style
    contStyle.width             = '320px';
    contStyle.height            = '320px';
    contStyle.backgroundColor   = '#5C5C5C';
    contStyle.margin            = '0 auto';
    contStyle.position          = 'relative';
    contStyle.transition        = 'left 0.5s, top 0.5s';
//    contStyle.border            = '2px solid #fff';
    contStyle.boxSizing         = 'inherit';



    /* Mobile version */


    if (window.innerWidth < 700) {
        zoomButton.disabled = true;
        zoomButton.style.cursor = 'default';
        zoomButton.style.opacity = '0.5';
    }



    // Centering with scroll event
    window.onscroll = function() {
        if  (overlay) {
            overStyle.top   = window.pageYOffset + 'px';
            overStyle.left  = window.pageXOffset + 'px';
        }
    }


    // Centering with resize event
    window.onresize = function() {

        if (overlay) {
            overStyle.width     = window.innerWidth + 'px';
            overStyle.height    = window.innerHeight + 'px';

        }
    }
    
    
    // close button event
    closeButton.onclick = function() {
        document.body.removeChild(overlay);
    }

    zoomButton.onclick = function() {
        overStyle.transform = 'scale(1.2)';
    }



    // return to objects
    return {
        overlay: function() {
            return overlay;
        },

        container: function() {
            return container;
        },

        closeButton: function() {
            return closeButton;
        },

        restartButton: function() {
            return restartButton;
        }
    } // return

}



const userInterface = new UIObject();
const overlay       = userInterface.overlay()
const close         = userInterface.closeButton();

append(document.body, overlay);









