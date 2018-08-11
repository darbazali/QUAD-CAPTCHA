
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

        style.width             = '60px';
        style.height            = '80px';
        style.margin            = '0';
        style.padding           = '0';
        style.fontSize          = '40px';
        style.fontWeight        = '800';
        style.backgroundColor   = transparent;
        style.border            = 'none';
        style.cursor            = 'pointer';
        style.color             = redPink;
        style.transition        = 'all .2s ease-in-out';

        const userAgent = window.navigator.userAgent;
        if (userAgent.match('Firefox')) {
            style.fontSize  = '58px';
            style.color     = white;
            style.fontFamily = 'Arial';
        }


        /* remove outline whene element is fucuesd */
        element.onfocus = function () {
            this.style.outline = 'none';
        }

        /* scale buttons with hover event */
        element.onmouseover = function() {
            this.style.transform = 'scale(1.2)';
        }

        element.onmouseout = function() {
            this.style.transform = 'scale(1)';

        }

    }


    // style an element with some properties
    function commonStyle(element) {
        const style = element.style;

        style.padding       = '0';
        style.margin        = '0';
        style.boxSizing     = 'border-box';
        style.borderRadius  = '5px';
    }


    // creating elements
    const overlay         = document.createElement('div');
    const wrapper         = document.createElement('div');
    const canvas          = document.createElement('div');
    const container       = document.createElement('div');

    // header section
    const header          = document.createElement('div');
    const title           = document.createElement('div');
    const closeButton     = document.createElement('input');
    const restartButton   = document.createElement('input');


    // text for the title
    title.textContent = 'Please remember the numbers ' +
    'in the Ascending Order.';

    // setting attributes
    closeButton.setAttribute('type', 'button');
    closeButton.setAttribute('value', '\u2715');

    restartButton.setAttribute('type', 'button');
    restartButton.setAttribute('value', '\u27F3');


    // Assembling
    append(overlay, wrapper);
    append(wrapper, header);
    append(wrapper, canvas);

    append(header, title);
    append(header, restartButton);
    append(header, closeButton);

    append(canvas, container);



    // assigning element styles
    const overStyle     = overlay.style;
    const wrapStyle     = wrapper.style;
    const canvStyle     = canvas.style;
    const contStyle     = container.style;

    const headStyle     = header.style;
    const titlStyle     = title.style;
    const closeStyle    = closeButton.style;
    const restStyle     = restartButton.style;



    /* STYLING COMPONETNS */

    // overlay Style
    overStyle.position          = 'absolute';
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
    commonStyle(overlay);


    // wrapper style
    wrapStyle.width             = '600px';
    wrapStyle.height            = '400px';
    wrapStyle.backgroundColor   = mattBlack;
    wrapStyle.boxShadow         = '0 0 30px #000';
    commonStyle(wrapper);



    /* HEADER SECTION */
    // header style
    headStyle.width             = '600px';
    headStyle.height            = '80px';
    headStyle.display           = 'flex';
    headStyle.justifyContent    = 'flex-start';


    // title style
    titlStyle.width             = '80%';
    titlStyle.maxHeight         = '80px';
    titlStyle.padding           = '7px';
    titlStyle.fontSize          = '28px';
    titlStyle.borderRight       = '1px solid ' + white;


    // restart button style
    buttonCommonStyle(restartButton);


    // close button style
    buttonCommonStyle(closeButton);



    // canvas style
    canvStyle.width             = '600px';
    canvStyle.height            = '320';
    canvStyle.minWidth          = '320px';
    canvStyle.minHeight         = '320px';
    canvStyle.position          = 'relative';
    canvStyle.backgroundColor   = darckGray;
    canvStyle.borderBottomLeftRadius    = '5px';
    canvStyle.borderBottomRightRadius   = '5px';



    // container style
    contStyle.width             = '320px';
    contStyle.height            = '320px';
    contStyle.backgroundColor   = mattBlack;
    contStyle.margin            = '0 auto';
    contStyle.position          = 'absolute';
    contStyle.transition        = 'left 0.5s, top 0.5s';
    contStyle.left              = '140px';
    commonStyle(container);



    /* Mobile version */
    if (window.innerWidth < 600 ) {

        wrapStyle.width     = '320px';
        wrapStyle.height    = '500px';

        canvStyle.width     = '320px';
        canvStyle.height    = '420px';

        contStyle.left      = '0';
        contStyle.top       = '50px';

        headStyle.width     = '320px';
        headStyle.height    = '80px';

        titlStyle.fontSize  = '20px';

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



    // return to objects
    return {
        overlay: function() {
            return overlay;
        },

        canvas: function() {
            return canvas;
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

close.onclick = function(e) {
    document.body.removeChild(overlay);
}







