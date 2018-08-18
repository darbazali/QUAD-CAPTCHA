/*

Software Name   : dCAPTCHA
Version         : 1.0
Author          : Darbaz Ali
Date            : july / 2018
Location        : Kurdistan / Iraq
Technology      : javascript, Web
Aim             : Internet Bot

Description:

dCAPTCHA is a brand new, GAME based  CAPTCHA system that focuses on human thinking, movement tracking and memorizing.

*/


/**************************************
SECTION 1: general purpose functions
**************************************/

/* appending an element to a node, general purpose */
function append(node, element) {
    return node.appendChild(element);
}


/* appending multiple elements to a node */
function multiAppend(nodeName, elements) {
    // loop through the elements
    // elements should be an array of html elements
    elements.forEach(function(element) {
        nodeName.appendChild(element);
    });
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


/* generating a random array from another array, algorithm */
function createRandomArray(srcArray, amount) {
    var rndArray = []; // random array

    while (rndArray.length < amount) { // how many random items?
        const random_index = Math.floor(Math.random() * srcArray.length);
        if (!rndArray.includes(random_index)) {
            rndArray.push(srcArray[random_index]);
            srcArray.splice(random_index, 1);
        }
    }
    return rndArray;
}


/* clearing a node from all child elements */
function clearNode(nodeName) {
    while (nodeName.firstChild) {
        nodeName.removeChild(nodeName.firstChild);
    }
}


/* changing the style of an element */
function changeStyle(element) {
    const style = element.style;
    style.fontSize = '58px';
    style.cursor = 'default';
    style.opacity = '0.9';
    style.backgroundColor = '#045d04';
}


/* hiding value of the circles */
function hideValue(elements) {
    elements.forEach(function(item) {
        item.style.fontSize = '0px';
    });
}


/* create circle elements from Circle Object,and put them inside an array. */
function createCircles(object) {
    const circles = [];
    var i = 0;
    while (circles.length < 10) {
        // object
        var RandomX = Math.floor(Math.random() * 260);
        var RandomY = Math.floor(Math.random() * 260);
        var circle  = new object(i, RandomX, RandomY);

        // looping throught all existing locations
        var overLapping = false;
        for (var j = 0; j < circles.length; j++) {
            var other = circles[j];
            var overlap = isColliding(circle, other);

            if (overlap) {
                overLapping = true;
                i--; // start again
                break; // break the loop
            }

        }

        if (!overLapping) {

            circles.push(circle);
        }

        i++;
    }
    return circles;
}


/* removing px Suffix from a string */
function removePX(str) {
    var number  = 0;
    number = parseInt(str.slice(0,-2));
    return number;
}


/* move element H or V or Both */
function moveElement(element) {

    // frame per second
    const FPS  = 60;

    // element size
    var elementSize = element.clientWidth;

    // element x position, y Position
    var elementXPos;
    var elementYPos;

    // element X speed, Y speed
    var Xspeed;
    var Yspeed;

    // edges
    var width   = element.parentElement.clientWidth - elementSize ;
    var height  = element.parentElement.clientHeight - elementSize;

    // set up interval
    const moveInterval = setInterval(update, 800 / FPS);


    // element starting position
    elementXPos = removePX(element.style.left);
    elementYPos = removePX(element.style.top);

    // element speed
    Xspeed = 15 / FPS;
    Yspeed = 15 / FPS;

    // random direction
    if (Math.floor(Math.random() * 2 ) == 0 ) {
        Xspeed = -Xspeed;
    }

    if (Math.floor(Math.random() * 2 ) == 0) {
        Yspeed = -Yspeed;
    }


    // UPDATE FUNCTION
    function update() {


        elementXPos += Xspeed;
        elementYPos += Yspeed;

        element.style.left = elementXPos + 'px';
        element.style.top = elementYPos + 'px';

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
}


/* get the value of circles and put them inside an array */
function getCircleValues(elements) {
    // getting random array value and put it in an array
    const numberArray = [];

    elements.forEach(function (item) {
        numberArray.push(parseInt(item.getAttribute('value')));
    });

    return numberArray.sort()
}

/* clear all intervals */
function clearIntervals() {
    for (i = 0; i < 200; i++) {
        window.clearInterval(i);
    }
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
        style.margin            = '0 15px';
        style.padding           = '0 5px';
        style.fontSize          = '36px';
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
            this.style.transform = 'scale(1.2)';
//            this.style.transform = 'rotate(45deg)'
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
    }


    // creating elements
    const overlay         = document.createElement('div');
    const wrapper         = document.createElement('div');
    const container       = document.createElement('div');
    const title           = document.createElement('div');

    const buttonWrapp     = document.createElement('div');
    const closeButton     = document.createElement('input');
    const restartButton   = document.createElement('input');
    const infoButton      = document.createElement('input');
    const zoomButton      = document.createElement('input');


    // text for the title
    title.innerHTML = '<p>Memorize the numbers<br/> in the <span style="font-weight: 700">Ascending Order</span></p>';

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

    append(buttonWrapp, infoButton);
    append(buttonWrapp, zoomButton);
    append(buttonWrapp, restartButton);
    append(buttonWrapp, closeButton);



    // assigning element styles
    const overStyle     = overlay.style;
    const wrapStyle     = wrapper.style;
    const contStyle     = container.style;

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


    // title style
    titlStyle.width             = '100%';
    titlStyle.height            = '80px';
    titlStyle.display           = 'inline-block'
    titlStyle.margin            = '0';
    titlStyle.padding           = '5px 10px';
    titlStyle.fontSize          = '26px';

    const paragraph = title.firstChild
    paragraph.style.padding = '10px';
    paragraph.style.margin = '0';

//    titlStyle.textAlign         = 'center';


    // button wrapp style
    btnWrapStyle.width = '100%';
    btnWrapStyle.height = '50px';
    btnWrapStyle.padding = '5px 0';


    // restart button style
    buttonCommonStyle(restartButton);
//    restStyle.marginTop = '-3px';
    restStyle.fontSize = '32px';

    // close button style
    buttonCommonStyle(closeButton);
//    closeStyle.fontSize = '43px';

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

    if (window.innerWidth > 600) {
//        wrapStyle.transform = 'scale(1.2)'
    }

    if (window.innerWidth < 700) {
//        zoomButton.style.visibility = 'hidden';
        zoomButton.style.display = 'none';
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


/* 2.3 - Circle Object */
function Circle(value, randomX, randomY) {

    // Prototyping
    this.value      = value;
    this.randomX    = randomX;
    this.randomY    = randomY;

    const circle = document.createElement('input');

    circle.setAttribute('type', 'button');
    circle.setAttribute('value', value);

    const style = circle.style;

    // circle style
    style.width             = '60px';
    style.height            = '60px';
    style.maxWidth          = '60px';
    style.maxHeight         = '60px';
    style.fontSize          = '55px';
    style.borderRadius      = '100%';
    style.textDecoration    = 'none';
    style.backgroundColor   = '#1028ac';
    style.color             = '#fff';
    style.border            = 'none';
    style.cursor            = 'default';
    style.position          = 'absolute';
    style.left              = randomX + 'px';
    style.top               = randomY + 'px';
    style.transition        = 'box-shadow 0.3s';

     // hover effect for the circle
    circle.onmouseover = function() {
        style.boxShadow = '0 0 10px #000';
    }
    
    circle.onmouseout = function() {
        style.boxShadow = 'none';
    }
    
    // removeing border on focus
    circle.onfocus = function() {
        style.outline = 'none';
    }

    return circle
}



                            /* END OF SECTION 2 */
/***************************************************************************/


/**************************************
SECTION 3: set up
**************************************/


// embedding anchor
const ancHor        = new Anchor();
const anchor        = ancHor.anchor();
const checkBox      = ancHor.checkBox();
const target        = document.getElementById('d-captcha');

append(target, anchor);


// getting User interface ready
const userInterface = new UIObject();
const overlay       = userInterface.overlay();
const container     = userInterface.container();
const restartBtn    = userInterface.restartButton();
const closeBtn      = userInterface.closeButton();


const dcSubmit = document.getElementById('dcSubmit');
dcSubmit.style.backgroundColor = '#999';

// event ocuring with clicking on circles (game).
function addEvent(elements) {
    var isHuman = false;
    
    const sortedNumberArray = getCircleValues(elements);


    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', function (e) {
            var value = this.getAttribute('value');

            if (value == sortedNumberArray[0]) {

                this.setAttribute('disabled', 'disabled');
                changeStyle(this);

                sortedNumberArray.shift(); // remove the taged number in the array

                if (sortedNumberArray.length === 0) {
                    isHuman = true;

                    clearIntervals();
                    setTimeout(function() {
                           // exit the game, done.
                        document.body.removeChild(overlay);
                        checkBox.removeEventListener('click', game);
                        checkBox.style.backgroundColor  = '#00db00';
                        checkBox.style.cursor           = 'default';
                        
                        //enabel submint button
                        dcSubmit.disabled               = false;
                        dcSubmit.style.backgroundColor  = '#148b34';
                        
                    }, 200);
                    

                }

            } else {
                for (var j = 0; j < elements.length; j++) {

                    circleIndex = elements[j];

                    circleIndex.setAttribute('disabled', 'disabled');
                    circleIndex.style.fontSize  = '58px';
                    circleIndex.style.cursor    = 'default';
                    circleIndex.style.opacity   = '0.6';
                    this.style.backgroundColor  = '#f80101';
                    this.style.opacity          = '0.9';

                }

                clearIntervals();
                setTimeout(game, 2000);
            }

        }, false);

    }

    return isHuman;
}


function game() {
    /* clear container before start */
    clearNode(container);
    clearIntervals();
    
    /* create the circles */
    const circles = createCircles(Circle);
    const randomCircls = createRandomArray(circles, 5);
    
    /* pop up the UI */
    append(document.body, overlay);
    
    // add a pop up message here

    /* deplory circles to the container. */
    multiAppend(container, randomCircls);

    /* start the game */
    setTimeout(function () {
        
        /* hide valuse of the circles */
        hideValue(randomCircls);

        /* ready the circles to be playd with */
        addEvent(randomCircls);

        randomCircls.forEach(function(itme) {
            moveElement(itme);
        })

    }, 3000);
}

/* START THE GAME when the checkbox is clicked */
checkBox.onclick = game;

// restart, whene things go wrong
restartBtn.onclick = function () {

    clearIntervals();
    clearNode(container);
    game();
    
}



// TASK: create a pop up message for the title.

// TASK: create a restart function without pop up message.



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






