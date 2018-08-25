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

/* simplyfing console.log, debbuging purpose */
const println = console.log;

/* appending an element to a node, general purpose */
function append(node, element) {
    return node.appendChild(element);
}


/* appending multiple elements to a node */
function multiAppend(nodeName, elements) {
    elements.forEach(function(element) {
        nodeName.appendChild(element.draw());
    });
}


/* collision detection (rect - rect) true or false, algorithm */
function isColliding(element1, element2) {
    // size of the element
    var size = 60;

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
function randomizeCircles(srcArray, amount) {
    var rndArray = []; // random array

    while (rndArray.length < amount) {
        const random_index = Math.floor(Math.random() * srcArray.length);
        if (!rndArray.indexOf(random_index) >= 0
           || !rndArray.includes(random_index)) {

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
            var collision = isColliding(circle.draw(), other.draw());

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

    const target = document.getElementById('d-captcha-div');
    append(target, anchor);



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
    title_style.cursor  = 'default';
    title_style.color   = '#0a4bfc';

    checkbox.onclick = function() {
        UI.open();
        buildGame();
        scroll.disable();
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


    // clear all intervals
      function clearIntervals() {
          for (var i = 0; i < 100; i++) {
              window.clearInterval(i);
          }

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

// TODO: complet this task.
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
          '<h3>Wrong!</h3><br/>' +
          '<h4>Try again...</h4>';

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
        clearIntervals();
        UI.close();
        scroll.enable();

        if (wrapper.lastChild == popUp) {
            wrapper.removeChild(popUp);
        }
    }

    // restart button action
    restartButton.onclick = function() {
        clearIntervals();

        if (wrapper.lastChild == popUp) {
            wrapper.removeChild(popUp);
        }

        reStart();
    }


    zoomButton.onclick = function() {
        overStyle.transform = 'scale(1.3)';
    }

    infoButton.onclick = function() {
        clearIntervals();
        UI.clearContainer();
        popUp.innerHTML = infoMSG;

        if (wrapper.lastChild == popUp) {
            wrapper.removeChild(popUp);
            reStart();
        } else {
            append(wrapper, popUp);
        }
    }


    // Methodes
    return {

        container: function() {
            return container;
        },

        open: function() {
            return document.body.appendChild(overlay);
        },

        close: function() {
            return document.body.removeChild(overlay);
        },

        popUp: function() {
            popUp.innerHTML = infoMSG;
            append(wrapper, popUp)
        },

        popUpRetry: function() {
            popUp.innerHTML = retryMSG;
            append(wrapper, popUp);
        },

        popUpSuccess: function() {
            popUp.innerHTML = successMSG;
            append(wrapper, popUp);
        },

        clearContainer: function () {
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        },

        removePopUp: function() {
            if (wrapper.lastChild == popUp) {
                wrapper.removeChild(popUp);
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
    style.transition        = 'box-shadow 0.3s, background-color 0.5s';


    /* chage style with hover effect */
    circle.onmouseover  = function() {
        style.boxShadow = '0px 0px 10px #000';
    }

    circle.onmouseout   = function() {
        style.boxShadow = 'none';
    }

    circle.onfocus      = function() {
        style.outline = 'none';
    }


    // disable circle
     function disable() {
         circle.setAttribute('disabled', 'disabled');
         style.opacity = '0.7';
         style.cursor = 'default';
     }



    /* removing px Suffix from a string */
    function removePX(str) {
        var number = 0;
        number = parseInt(str.slice(0, -2));
        return number;
    }


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

// TODO: refactor this block.

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

            disable();
        },

        rightPlay: function() {
            disable()
            style.backgroundColor = '#1f9103';
        },

        wrongPlay: function() {
            disable();
            style.backgroundColor = '#cc0000'
        },

        disable: function () {
            disable();
        }
    }
}



/***************************************************************************/


/**************************************
SECTION 3: set up
**************************************/

const ANCHOR = new Anchor();
const UI     = new UIObject();


// TODO: build a submit button
const dcSubmit = document.getElementById('d-captcha-submit');
dcSubmit.style.backgroundColor = '#999';

// start playing game with the circles.
function game(elements) {
    var isHuman = false;
    
    /* a model for sorted circles */
    const sortedModel = getCircleValues(elements);

    elements.forEach(function(element) {
        element.draw().onclick = function(event) {
            // value of the current circle
            const value = this.getAttribute('value');


            /*
                if user clicks on the right circle
                    stop current circle
                    show the value
                    change the color of the cirlce
                    remove current index from Sorted Model array
            */

            // TODO: refactor this block
            if (value == sortedModel[0]) {
                sortedModel.shift();
                element.rightPlay();
                element.stop();
                element.showValue();

                if (sortedModel.length === 0 ) {
                    isHuman = true;
                    
                    UI.popUpSuccess();

                    setTimeout(function() {

                        UI.close();
                        dcSubmit.disabled = false;
                    }, 1000);

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
                elements.forEach(function(element) {
                    element.stop();
                    element.showValue();
                    element.disable();
                });

                element.wrongPlay();
                UI.popUpRetry();
                setTimeout(function() {
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
    const circles = randomizeCircles(allCirlces, 5);


    /* show the instruction message then start the game */

    UI.popUp();


    /* start the game */
    setTimeout(function () {
        /* deploy circles to the container. */
        multiAppend(container, circles);

        /* remove pop up */
        UI.removePopUp();

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


    }, 3000);

}



function reStart() {
    // container for the circles(playground).
    const container = UI.container();

    /* clear container before start */
    UI.clearContainer();

    /* create the circles */
    const allCirlces = createCircles(Circle);
    const circles    = randomizeCircles(allCirlces, 5);


    /* start the game */

        /* deploy circles to the container. */
        multiAppend(container, circles);

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









