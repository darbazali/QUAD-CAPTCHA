/*

Software Name   : dCAPTCHA
Author          : Darbaz Ali
Date            : july / 2018
Location        : Kurdistan / Iraq
Technology      : javascript, Web
Target          : Internet Bot

Description:

dCAPTCHA is a brand new, GAME based  CAPTCHA system that focuses on human thinking and memorizing.

*/


/**************************************
SECTION 1: general purpose functions
**************************************/


/* printing to the console, debugging purpose */
const println = console.log;


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

    const W1 = 60; // element 1 width
    const W2 = 60; // element 2 width

    const H1 = 60; // element 1 height
    const H2 = 60; // element 2 height

    const X1 = parseInt(element1.style.left);
    const X2 = parseInt(element2.style.left);

    const Y1 = parseInt(element1.style.top);
    const Y2 = parseInt(element2.style.top);


    if (X1 + W1 >= X2 &&
        X1 <= X2 + W2 &&
        Y1 + H1 >= Y2 &&
        Y1 <= Y2 + H2) {
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
    while (nodeName.hasChildNodes) {
        nodeName.removeChild(nodeName.lastChild);
    }
}


/* changing the style of an element */
function changeStyle(element) {
      element.style.fontSize = '58px';
      element.style.cursor = 'default';
      element.style.opacity = '0.9';
      element.style.backgroundColor = '#045d04';
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
        var circle = new object(i, RandomX, RandomY);

        // looping throught all existing locations
        var overLapping = false;
        for (let j = 0; j < circles.length; j++) {
            var other = circles[j];
            var check = isColliding(circle, other);

            if (check) {
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


// check the device type: function
function checkDevice() {

}


/* removing px Suffix from a string */
function removePX(str) {
    var number  = 0;
    number = parseInt(str.slice(0,-2));
    return number;
}


/* move element Horizontaly */
function moveH(element) {

    var pos = 0;
    var speed = 3;
    var id = setInterval(frame, 100);

    function frame() {

        pos++;
        element.style.left = pos + 'px';
        pos = pos + speed;

        if (pos > 300) {
            speed = -3;
        }

        if (pos < 5) {
            speed = 3;
        }

    }
}


/* move element Vertically */
function moveV(element) {
    var pos = 0;
    var speed = 3;

    var id = setInterval(frame, 100);

    function frame() {

        pos++;
        element.style.top = pos + 'px';
        pos = pos + speed;

        if (pos > 130) {
            speed = -3;
        }

        if (pos == 0) {
            speed = 3;
        }

    }
}


/* call a move function with a condition */
function animate(element) {

    if (window.innerWidth < 600 ) {
        moveV(element);
    } else {
        moveH(element)
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
    style = anchor.style;
    checkBox_style = checkbox.style;
    title_style = title.style;

    // anchor style
    style.width           = '220px';
    style.height          = '40px';
    style.boxSizing       = 'border-box';
    style.backgroundColor = '#cecece';
    style.color           = '#0a4bfc';
    style.border          = '1px solid #000';
    style.borderRadius    = '3px';
    style.display         = 'flex';
    style.fontSize        = '20px';
    style.padding         = '8px';
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

    // hover effect for the checkbox
//    checkbox.addEventListener('mouseover', function (e) {
//        checkBox_style.backgroundColor = '#b7bee2';
//    }, false);
//
//    checkbox.addEventListener('mouseout', function (e) {
//        checkBox_style.backgroundColor = '#fff';
//    }, false);


    // title stile
    title_style.cursor = 'default';

    return {
        anchor: function() {
            return anchor;
        },

        checkBox: function() {
            return checkbox;
        }
    }
}


/* 2.2 - Overlay */
function Overlay() {
    const overlay   = document.createElement('div');
    const canvas    = document.createElement('div');
    const container = document.createElement('div');

    append(overlay, canvas);
    append(canvas, container);

    // assigning element styles to variables
    const style         = overlay.style;
    const canvStyle     = canvas.style;
    const con_style     = container.style;


    style.position          = 'absolute';
    style.width             = window.innerWidth + 'px';
    style.height            = window.innerHeight + 'px';
    style.backgroundColor   = 'rgba(0, 0, 0, 0.65)';
//    style.backgroundColor   = 'transparent';
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

    if (window.innerWidth < 600 ) {
        canvStyle.width     = '320px';
        canvStyle.height    = '450px';
        con_style.top       = 'calc(450 - 320)';
    }


    // container style
    con_style.width             = '320px';
    con_style.height            = '320px';
    con_style.backgroundColor   = '#ccc';
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



/* 2.3 - Circle Object */
function Circle(value, randomX, randomY) {

    // Prototyping

    this.value      = value;
    this.randomX    = randomX;
    this.randomY    = randomY;


    let circle = document.createElement('input');

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
    style.cursor            = 'pointer';
    style.position          = 'absolute';
    style.left              = randomX + 'px';
    style.top               = randomY + 'px';
    style.transition        = 'box-shadow 0.3s';

     // hover effect for the circle
    circle.addEventListener('mouseover', function (e) {
        style.boxShadow = '0 0 10px #000';
    }, false);

    circle.addEventListener('mouseout', function (e) {
        style.boxShadow = 'none';
    }, false);


    // removeing border on focus
    circle.addEventListener('focus', function(event) {
        style.outline = 'none';
    }, false);


    return circle
}



                            /* END OF SECTION 2 */
/***************************************************************************/




/**************************************
SECTION 3: set up
**************************************/


const overLay   = new Overlay();
const overlay   = overLay.overlay();
const canvas    = overLay.canvas();
const container = overLay.container();




const width = canvas.clientWidth    - container.clientWidth;
const heigh = canvas.clientHeight   - container.clientHeight;




const ancHor        = new Anchor();
const anchor        = ancHor.anchor();
const checkBox      = ancHor.checkBox();

const target = document.getElementById('d-captcha');



append(target, anchor);




// event ocuring with clicking on circles (game).
function addEvent(elements) {
    var isHuman = false;

    // getting random array value and put it in an array
    const numberArray = [];

    elements.forEach(function (item) {
        numberArray.push(parseInt(item.getAttribute('value')));
    });

    // sorting the array of values
    const sortedNumberArray = numberArray.sort();


    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', function (e) {
            var value = this.getAttribute('value');

            if (value == sortedNumberArray[0]) {

                this.setAttribute('disabled', 'disabled');
                changeStyle(this);

                sortedNumberArray.shift(); // remove the taged number in the array

                if (sortedNumberArray.length === 0) {
                    isHuman = true;

                    setTimeout(function() {
                           // exit the game, done.
                        document.body.removeChild(overlay);
                        println(isHuman);

                        checkBox.removeEventListener('click', game);
                        checkBox.style.backgroundColor = '#00db00';
                        checkBox.style.cursor = 'default';
                    }, 300);

                }

            } else {
                for (var j = 0; j < elements.length; j++) {

                    circleIndex = elements[j];

                    circleIndex.setAttribute('disabled', 'disabled');
                    circleIndex.style.fontSize = '58px';
                    circleIndex.style.cursor = 'default';
                    circleIndex.style.opacity = '0.6';
                    this.style.backgroundColor = '#f80101';
                    this.style.opacity = '0.9';
                }

                // restart the game
            }


        }, false);

    }


    return isHuman;
}



function game() {


    const circles = createCircles(Circle);
    randomCircls = createRandomArray(circles, 5);


    append(document.body, overlay);


    multiAppend(container, randomCircls);

    const hide = setTimeout(function() {
        hideValue(randomCircls);


        addEvent(randomCircls);

        setTimeout(function() {
            animate(container)
        }, 500);

    }, 3000);



}




checkBox.addEventListener('click', game, false);
checkBox.addEventListener('click', function() {
    println(window.innerHeight);
}, false);



// Task: create a restart function

// Task: creat a restart button

// Task: create a close button









