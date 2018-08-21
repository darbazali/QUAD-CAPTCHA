/*

Software Name   : dCAPTCHA
Version         : 1.0
Author          : Darbaz Ali
Date            : july / 2018
Location        : Kurdistan / Iraq
Technology      : javascript, Web
Aim             : Internet Bot

Description:

dCAPTCHA is a brand new, GAME based  CAPTCHA system that focuses on human thinking,
movement tracking and memorizing.

*/


/**************************************
SECTION 1: general purpose functions
**************************************/

/* appending an element to a node, general purpose */
function append(node, element) {
    return node.appendChild(element);
}


/* collision detection (rect - rect) true or false, algorithm */
function isColliding(element1, element2) {
    // size of the rectangle
    var rectSize = 60;

    const X1 = parseInt(element1.style.left);
    const X2 = parseInt(element2.style.left);

    const Y1 = parseInt(element1.style.top);
    const Y2 = parseInt(element2.style.top);


    if (X1 + rectSize >= X2 &&
        X1 <= X2 + rectSize &&
        Y1 + rectSize >= Y2 &&
        Y1 <= Y2 + rectSize) {
        return true;
    } else {
        return false;
    }
}


/* appending multiple elements to a node */
function multiAppend(nodeName, elements) {
    elements.forEach(function(element) {
        nodeName.appendChild(element.draw());
    });
}


/* generating a random array from another array, algorithm */
function randomizeCircles(srcArray, amount) {
    var rndArray = []; // random array

    while (rndArray.length < amount) {
        const random_index = Math.floor(Math.random() * srcArray.length);
        if (!rndArray.indexOf(random_index) >= 0) {
            rndArray.push(srcArray[random_index]);
            srcArray.splice(random_index, 1);
        }
    }
    return rndArray;
}


/* create circles from Circle object */
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
        for (let j = 0; j < circles.length; j++) {
            var other = circles[j];
            var check = isColliding(circle.draw(), other.draw());

            if (check) {
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


/* handling sroll bar */
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
const scroll = new Scroll();


/* get the value of circles and put them inside an array */
function getCircleValues(elements) {
    // getting random array value and put it in an array
    const numberArray = [];

    elements.forEach(function (item) {
        numberArray.push(parseInt(item.draw().getAttribute('value')));
    });

    return numberArray.sort()
}


                            /* END OF SECTION 1 */
/***************************************************************************/



/**************************************
SECTION 2: COMPONENTS
**************************************/

/* 2.1 - Anchor */
function Anchor() {

    // elements
    var anchor    = document.createElement('div');
    var checkbox  = document.createElement('div');
    var title     = document.createElement('div');

    // assembling
    title.innerHTML = "I'm not a robot!";
    append(anchor, checkbox);
    append(anchor, title);


    // styles
    style           = anchor.style;
    checkBox_style  = checkbox.style;
    title_style     = title.style;

    // anchor style
    style.width           = '300px';
    style.height          = '80px';
    style.boxSizing       = 'border-box';
    style.backgroundColor = '#cecece';
    style.color           = '#0a4bfc';
    style.border          = '1px solid #000';
    style.borderRadius    = '3px';
    style.display         = 'flex';
    style.fontSize        = '20px';
    style.padding         = '20px 10px';
    style.marginBottom	  = '10px';


    // checkbox style
    checkBox_style.height          = '20px';
    checkBox_style.width           = '20px';
    checkBox_style.border          = '1px solid #0a4bfc';
    checkBox_style.borderRadius    = '2px';
    checkBox_style.backgroundColor = '#fff';
    checkBox_style.marginRight     = '10px';
    checkBox_style.cursor          = 'pointer';
    checkBox_style.transition      = 'background-color 0.3s';


    // title stile
    title_style.cursor = 'default';
    title_style.color   = '#06a806'

    return {
        anchor: function() {
            return anchor;
        },

        checkBox: function() {
            return checkbox;
        }
    }
}

/* 2.2 - UI */
function UIObject() {

    // colors
    const white         = '#FFFFFF';
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
    const message  = '<p><span style="font-weight: 800">look at the' +
        ' circles for<br/> 3 seconds. </span><br/>' +
        'after the numbers disapeard, try to memorize them in the ' +
        '<span style="font-weight: 700">Ascending Order</span></p>';
    popUp.innerHTML = message;

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
    overStyle.backgroundColor   = 'rgba(72, 72, 72, 0.8)';
    overStyle.color             = white;
    overStyle.fontFamily        = 'Arial';
//    commonStyle(overlay);


    // wrapper style
    wrapStyle.width             = '320px';
    wrapStyle.height            = '480px';
    wrapStyle.borderRadius      = '15px';
    wrapStyle.backgroundColor   = '#177cff';
    wrapStyle.boxShadow         = '0 0 20px #333333';
    wrapStyle.boxSizing         = 'inherit';
    wrapStyle.position          = 'relative';
    wrapStyle.left              = '50%';
    wrapStyle.top               = '50%';
    wrapStyle.transform         = 'translate(-50%, -50%)';


    // pop up style
    popStyle.position           = 'absolute';
    popStyle.left               = '50%';
    popStyle.top                = '50%';
    popStyle.transform          = 'translate(-50%, -50%)'
    popStyle.backgroundColor    = 'rgba(0, 144, 105, 0.8)';
    popStyle.width              = '300px';
    popStyle.height             = '170px';
    popStyle.fontSize           = '22px';
    popStyle.textAlign          = 'center';
    popStyle.marginTop          = '10px';
    popStyle.borderRadius       = '15px';


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
    paragraph.style.cursor      = 'default';

    // button wrapp style
    btnWrapStyle.width              = '100%';
    btnWrapStyle.height             = '50px';
    btnWrapStyle.padding            = '5px 0';
    btnWrapStyle.backgroundColor    = transparent;


    // restart button style
    buttonCommonStyle(restartButton);
    restStyle.fontSize = '32px';

    // close button style
    buttonCommonStyle(closeButton);


    buttonCommonStyle(infoButton);


    buttonCommonStyle(zoomButton);

    // container style
    contStyle.width             = '320px';
    contStyle.height            = '320px';
    contStyle.backgroundColor   = '#5C5C5C';
    contStyle.margin            = '0 auto';
    contStyle.position          = 'relative';
    contStyle.transition        = 'left 0.5s, top 0.5s';
    contStyle.boxSizing         = 'inherit';



    /* Mobile version */


    if (window.innerWidth < 700) {
        zoomButton.disabled = true;
        zoomButton.style.cursor = 'default';
        zoomButton.style.opacity = '0.5';
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

        // at this point we have to clear all intervals
        for (var i = 0; i < 100; i++) {
            window.clearInterval(i);
        }
        UI.close();
        scroll.enable();
    }

    zoomButton.onclick = function() {
        overStyle.transform = 'scale(1.3)';
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
        },

        open: function() {
            return document.body.appendChild(overlay);
        },

        close: function() {
            return document.body.removeChild(overlay);
        },

        popUp: function() {
            return append(wrapper, popUp)
        },

        clearContainer: function () {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        }
    } // return

}

/* 2.3 - Circle Object */
function Circle(value, randomX, randomY) {

    // Prototyping

    this.value      = value;
    this.randomX    = randomX;
    this.randomY    = randomY;

    var moveCircle;


    var circle = document.createElement('input');

    this.draw = document.createElement('input');

    circle.setAttribute('type', 'button');
    circle.setAttribute('value', value);

    const style = circle.style;

    // circle style
    style.width             = '60px';
    style.height            = '60px';
    style.maxWidth          = '60px';
    style.maxHeight         = '60px';
    style.fontSize          = '54px';
    style.borderRadius      = '100%';
    style.textDecoration    = 'none';
    style.backgroundColor   = '#1028ac';
    style.color             = '#fff';
    style.border            = 'none';
    style.cursor            = 'pointer';
    style.position          = 'absolute';
    style.left              = randomX + 'px';
    style.top               = randomY + 'px';
    style.transition        = 'box-shadow 0.3s';


    /* chage style with hover effect */
    circle.onmouseover = function() {
        style.boxShadow = '0px 0px 10px #000';
    }

    circle.onmouseout = function() {
        style.boxShadow = 'none';
    }

    circle.onfocus = function() {
        style.outline = 'none';
    }



    /* removing px Suffix from a string */
    function removePX(str) {
        var number = 0;
        number = parseInt(str.slice(0, -2));
        return number;
    }

    /* move element H or V or Both */
//    function moveElement(element) {

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
        var width   = 260;
        var height  = 260;

        // element starting position
        elementXPos = removePX(circle.style.left);
        elementYPos = removePX(circle.style.top);

        // element speed
        Xspeed = 15 / FPS;
        Yspeed = 15 / FPS;

        // random direction
        if (Math.floor(Math.random() * 2) == 0) {
            Xspeed = -Xspeed;
        }

        if (Math.floor(Math.random() * 2) == 0) {
            Yspeed = -Yspeed;
        }


        // UPDATE FUNCTION
        function update() {


            elementXPos += Xspeed;
            elementYPos += Yspeed;

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
        draw: function() {
            return circle;
        },

        hideValue: function() {
            style.fontSize = '0px';
        },

        showValue: function() {
            style.fontSize = '54px';
        },

        move: function() {
            moveCircle = setInterval(update, 800 / FPS);
        },

        stop: function() {
            for (var i = 0; i < 100; i++) {
                window.clearInterval(moveCircle);
            }
        },

        rightPlay: function() {
            circle.setAttribute('disabled', 'disabled');
            style.opacity = '0.5';
            style.backgroundColor = '#00db00'
            style.cursor = 'default';
        },

        wrongPlay: function() {
            circle.setAttribute('disabled', 'disabled');
            style.opacity = '0.5';
            style.backgroundColor = '#e50000'
            style.cursor = 'default';
        }
    }
}




                            /* END OF SECTION 2 */
/***************************************************************************/


/**************************************
SECTION 3: set up
**************************************/


// embedding anchor
const ANCHOR        = new Anchor();
const anchor        = ANCHOR.anchor();
const checkBox      = ANCHOR.checkBox();
const target        = document.getElementById('d-captcha');

append(target, anchor);


// getting User interface ready
const UI            = new UIObject();
const overlay       = UI.overlay();
const container     = UI.container();
const restartBtn    = UI.restartButton();
const closeBtn      = UI.closeButton();


const dcSubmit = document.getElementById('dcSubmit');
dcSubmit.style.backgroundColor = '#999';

// event ocuring with clicking on circles (game).
function addEvent(elements) {
    var isHuman = false;
    
    /* a model for sorted circles */
    const sortedModel = getCircleValues(elements);

    elements.forEach(function(element) {
        element.draw().onclick = function(event) {
            // value of the current circle
            const value = this.getAttribute('value');

            // compare the value to the sortedModel first index
            // if the selected circle is the base circle
            if (value == sortedModel[0]) {
                sortedModel.shift();
                element.rightPlay();
                element.stop();
                element.showValue();

                if (sortedModel.length === 0 ) {
                    isHuman = true;
                    
                    UI.close();

                }

            } else {
                elements.forEach(function(element) {
                    element.stop();
                    element.showValue();
                });

                element.wrongPlay();

                setTimeout(function() {
                    game();
                }, 2000)

            }
        }
    });


    return isHuman;
}


function game() {
    /* clear container before start */
    UI.clearContainer();
    
    /* create the circles */
    const allCirlces    = createCircles(Circle);
    const circles       = randomizeCircles(allCirlces, 5);
    
    /* open the UI */
    UI.open()
    // add a pop up message here

    /* deplory circles to the container. */
    multiAppend(container, circles);

    /* start the game */
    setTimeout(function () {


        /* ready the circles to be playd with */
        addEvent(circles);

        circles.forEach(function(itme) {
            itme.move();
            itme.hideValue();
        })

    }, 3000);

}

/* START THE GAME when the checkbox is clicked */
checkBox.onclick = function() {
    game();
    scroll.disable();
}

// restart, whene things go wrong
restartBtn.onclick = function () {


    UI.clearContainer();
    game();
    
}


function start() {
    // first try
    // game with instruction pop up
}


// restart with restart button
function manualRestart() {
    // game without any pop up
}

// auto restart after wrong playing
function autoRestart() {
    // game with error pop up
}






