/* printing to the console, debugging purpose */
const println = console.log;


/* appending an element to a node, general purpose */
function append(node, element) {
    return node.appendChild(element);
}



// removing px Suffix from a string
function removePX(str) {
    var number = 0;
    number = parseInt(str.slice(0,-2));
    return number;
}


function commonStyle(element) {
    element.style.padding = '0';
    element.style.margin  = '0';
    element.style.boxSizing = 'border-box';
    element.style.borderRadius = '5px';
}


/********************************
COMPONENT: OVERLAY(GENERAL WRAPPER).
********************************/
function Overlay() {
    const overlay         = document.createElement('div'); // Overlay
    const wrapper         = document.createElement('div'); // General Wrapper
    const canvas          = document.createElement('div'); // Canvas
    const container       = document.createElement('div'); // Container for circles

    const header          = document.createElement('div'); // wrapper for message and buttons
    const message         = document.createElement('div'); // The message
    const closeButton     = document.createElement('input'); // Close Button
    const restartButton   = document.createElement('input'); // Restart Button

    append(overlay, canvas);
    append(canvas, container);




    // assigning overlay style to a variable(style).
    const style         = overlay.style;
    const canvStyle     = canvas.style;
    const con_style     = container.style;

    style.position          = 'absolute';
    style.width             = window.innerWidth + 'px';
    style.height            = window.innerHeight + 'px';
//    style.backgroundColor   = 'rgba(255, 255, 255, 0.76)';
    style.backgroundColor   = 'transparent';
    style.color             = '#fff';
    style.top               = window.pageYOffset + 'px';
    style.left              = window.pageXOffset + 'px';
    style.textAlign         = 'center';
    style.padding           = '0';
    style.margin            = '0';
    style.display           = 'flex';
    style.justifyContent    = 'center';
    style.alignItems        = 'center';


    // canvas style
    canvStyle.width             = '600px';
    canvStyle.height            = '330';
    canvStyle.minWidth          = '320px';
    canvStyle.minHeight         = '320px';
//    canvStyle.border            = '2px solid #999';
    canvStyle.borderRadius      = '30px';
    canvStyle.position          = 'relative';
    canvStyle.boxSizing         = 'border-box';
    canvStyle.backgroundColor   = '#999';
    canvStyle.margin            = '0';
    canvStyle.padding           = '0';
    canvStyle.boxShadow         = '0 0 20px #999';

    if (window.innerWidth < 600) {
        canvStyle.width     = '320px';
        canvStyle.height    = '450px';
        con_style.top       = 'calc(450 - 320)';
    }

    if (window.innerWidth > 600) {
        con_style.backgroundColor = '#fff';
    }


    // container style
    con_style.width             = '320px';
    con_style.height            = '320px';
    con_style.backgroundColor   = '#c4c4c4';
    con_style.padding           = '0';
    con_style.margin            = '0 auto';
    con_style.borderRadius      = '30px';
    con_style.position          = 'absolute';
    con_style.boxSizing         = 'border-box';
    con_style.transition        = 'left 0.5s, top 0.5s';
//    con_style.top               = '0';
    con_style.left              = '150px';



    // Centering with scroll event
    window.addEventListener('scroll', function() {
        if  (overlay) {
            style.top   = window.pageYOffset + 'px';
            style.left  = window.pageXOffset + 'px';
        }
    }, false);


    // Centering with resize event
    window.addEventListener('resize', function() {

        if (overlay) {
            style.width     = window.innerWidth + 'px';
            style.height    = window.innerHeight + 'px';


        }
    }, false);


    return {
        overlay: function() {
            return overlay;
        },

        canvas: function() {
            return canvas;
        },

        container: function() {
            return container;
        }
    }

}


const overLay   = new Overlay();
const overlay   = overLay.overlay();
const canvas    = overLay.canvas();
const container = overLay.container();


append(document.body, overlay);


const width = canvas.clientWidth    - container.clientWidth;
const heigh = canvas.clientHeight   - container.clientHeight;


// move element Horizontally
function moveH() {

    var pos = 0;
    var speed = 3;
    var id = setInterval(frame, 50);

    function frame() {

        pos++;
        container.style.left = pos + 'px';
        pos = pos + speed;

        if (pos == width) {
            speed = -3;
        }

        if (pos == 0) {
            speed = 3;
        }
    }
}


// move element Vertically
function moveV() {

    var pos = 0;
    var speed = 3;
    var id = setInterval(frame, 50);

    function frame() {

        pos++;
        container.style.top = pos + 'px';
        pos = pos + speed;

        if (pos > 132) {
            speed = -3;
        }

        if (pos == 0) {
            speed = 3;
        }

//        println(pos)

    }
}


// pick a move function in a condition
function animate() {

    if (window.innerWidth < 600) {
        moveV();
    } else {
        moveH()
    }

}


animate()









