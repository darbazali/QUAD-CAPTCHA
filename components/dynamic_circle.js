
const println = console.log;

/* append an element to a spesific node */
function append(nodeName, element) {
    return nodeName.appendChild(element);
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


/* removing px Suffix from a string */
function removePX(str) {
    var number  = 0;
    number = parseInt(str.slice(0,-2));
    return number;
}


/* hiding value of the circles */
function hideValue(elements) {
    elements.forEach(function(item) {
        item.style.fontSize = '0px';
    });

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
    canvStyle.backgroundColor   = '#afacac';
    canvStyle.borderBottomLeftRadius    = '5px';
    canvStyle.borderBottomRightRadius   = '5px';



    // container style
    contStyle.width             = '320px';
    contStyle.height            = '320px';
    contStyle.backgroundColor   = '#818080';
    contStyle.margin            = '0 auto';
    contStyle.position          = 'relative';
//    contStyle.transition        = 'left 0.5s, top 0.5s';
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


    // close button event
    closeButton.onclick = function() {
        document.body.removeChild(overlay);
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

// Objcet: returns a circle button
function Circle(value, randomX, randomY) {

    // Prototyping

    this.value = value;
    this.randomX = randomX;
    this.randomY = randomY;


    let circle = document.createElement('input');

    circle.setAttribute('type', 'button');
    circle.setAttribute('value', value);

    const style = circle.style;

    // circle style
    style.width             = '60px';
    style.height            = '60px';
    style.fontSize          = '55px';
    style.borderRadius      = '100%';
    style.textDecoration    = 'none';
    style.backgroundColor   = '#1028ac';
    style.color             = '#fff';
    style.border            = 'none';
    style.cursor            = 'pointer';
    style.transition        = 'none';

    style.position          = 'absolute';
    style.left              = randomX + 'px';
    style.top               = randomY + 'px';

     // hover effect for the circle
    circle.addEventListener('mouseover', function (e) {
        // change the style here
    }, false);

    circle.addEventListener('mouseout', function (e) {
        // change the style here
    }, false);

    circle.onfocus = function() {
        style.outline = 'none';
    }


    return circle
}


function createArray() {
    const circles = [];
    var i = 0;
    while (circles.length < 10) {
        // object
        var RandomX = Math.floor(Math.random() * 260);
        var RandomY = Math.floor(Math.random() * 260);
        var rect = new Circle(i, RandomX, RandomY);

        // looping throught all existing locations
        var overLapping = false;
        for (let j = 0; j < circles.length; j++) {
            var other = circles[j];
            var check = isColliding(rect, other);

            if (check) {
                overLapping = true;
                i--; // start again
                break; // break the loop
            }
        }

        if (!overLapping) {

            circles.push(rect);
        }

        i++;
    }
    return circles;
}

const circleArray = createArray(Circle);

const singleArray = createRandomArray(circleArray, 4);
const rect = singleArray[0];
const rect2 = singleArray[1];
const rect3 = singleArray[2];
const rect4 = singleArray[3];



const userInterface = new UIObject();
const overlay       = userInterface.overlay()
const container     = userInterface.container();
const close         = userInterface.closeButton();

append(document.body, overlay);

multiAppend(container ,singleArray);



/* move element Horizontaly */
function moveH(element) {

    var posX = removePX(element.style.left);
    var posY = removePX(element.style.top);

    var speedX = 3;
    var speedY = 3;

    const width = element.clientWidth;
    const left  = element.clientLeft;
    const top   = element.clientTop;

    const rightEdge = element.parentElement.clientWidth - width;
    const leftEdge = element.parentElement.clientLeft;
    const topEdge = element.parentElement.clientTop;

    moveHInterval = setInterval(frame, 50);

    function frame() {

        posX++;
        posY++;

        element.style.left = posX + 'px';
        element.style.top = posY + 'px';

        posX = posX + speedX;
        posY = posY + speedY;


        // return from right edge
        if (posX > rightEdge) {
            speedX = -3;
            speedY = 3;

            println(rightEdge);

        }

        // return from buttom edge
        if (posY > rightEdge) {
            speedX = -3;
            speedY = -3;
        }


        // return from left edge
        if (posX < leftEdge) {
            speedX = 3;
            speedY = -3;
        }

        // return from top edge
        if (posY < topEdge) {
            speedX = 3;
            speedY = 3;
        }

    }
}


// move element version 2
function move(element) {

    // frame per second
    const FPS  = 60;

    // ball size
    var ballSize = element.clientWidth;

    // ball x position, y Position
    var ballXPos;
    var ballYPos;

    // ball X speed, Y speed
    var Xspeed;
    var Yspeed;

    // edges
    var width   = element.parentElement.clientWidth   - ballSize ;
    var height  = element.parentElement.clientHeight  - ballSize;

    // set up interval
    setInterval(update, 1000 / FPS);

    // ball starting position
    ballXPos = removePX(element.style.left);
    ballYPos = removePX(element.style.top);

    // ball speed
    Xspeed = 20 / FPS;
    Yspeed = 20 / FPS;

    // random direction
    if (Math.floor(Math.random() * 2 ) == 0 ) {
        Xspeed = -Xspeed;
    }

    if (Math.floor(Math.random() * 2 ) == 0) {
        Yspeed = -Yspeed;
    }


    // UPDATE FUNCTION
    function update() {
        // move the ball
        ballXPos += Xspeed;
        ballYPos += Yspeed;

        element.style.left = ballXPos + 'px';
        element.style.top = ballYPos + 'px';

        // bounce the ball for each wall
        if (ballXPos < 0 && Xspeed < 0 ) {
            Xspeed = -Xspeed;
        }

        if (ballXPos  > width && Xspeed > 0) {
            Xspeed = -Xspeed;
        }

        if (ballYPos  < 0 && Yspeed < 0) {
            Yspeed = -Yspeed;
        }

        if (ballYPos > height && Yspeed > 0) {
            Yspeed = -Yspeed;
        }

        // bounce the ball wile colliding



    }
}


function moveContainer(element) {

    // frame per second
    const FPS  = 60;

    // ball size
    var ballSize = element.clientWidth;

    // ball x position, y Position
    var ballXPos;
    var ballYPos;

    // ball X speed, Y speed
    var Xspeed;
    var Yspeed;

    // edges
    var width   = element.parentElement.clientWidth - ballSize ;
    var left    = element.parentElement.clientLeft;
//    var height  = element.parentElement.clientHeight  - ballSize;

    // set up interval
    setInterval(update, 1000 / FPS);

    // ball starting position
    ballXPos = removePX(element.style.left);
//    ballYPos = removePX(element.style.top);

    // ball speed
    Xspeed = 20 / FPS;
//    Yspeed = 20 / FPS;

    // random direction
    if (Math.floor(Math.random() * 2 ) == 0 ) {
        Xspeed = -Xspeed;
    }

//    if (Math.floor(Math.random() * 2 ) == 0) {
//        Yspeed = -Yspeed;
//    }


    // UPDATE FUNCTION
    function update() {
        // move the ball
        ballXPos += Xspeed;
//        ballYPos += Yspeed;

        element.style.left = ballXPos + 'px';
//        element.style.top = ballYPos + 'px';

        // bounce the ball for each wall
        if (ballXPos < 0 && Xspeed < 0 ) {
            Xspeed = -Xspeed;
        }

        if (ballXPos  > width && Xspeed > 0) {
            Xspeed = -Xspeed;
        }

//        if (ballYPos  < 0 && Yspeed < 0) {
//            Yspeed = -Yspeed;
//        }
//
//        if (ballYPos > height && Yspeed > 0) {
//            Yspeed = -Yspeed;
//        }

        // bounce the ball wile colliding



    }
}

function moveElement(element, H, V) {

    // frame per second
    const FPS  = 60;

    // ball size
    var ballSize = element.clientWidth;

    // ball x position, y Position
    var ballXPos;
    var ballYPos;

    // ball X speed, Y speed
    var Xspeed;
    var Yspeed;

    // edges
    var width   = element.parentElement.clientWidth   - ballSize ;
    var height  = element.parentElement.clientHeight  - ballSize;
    var left    = element.parentElement.clientLeft;

    // set up interval
    setInterval(update, 1000 / FPS);

    // ball starting position
    ballXPos = removePX(element.style.left);
    ballYPos = removePX(element.style.top);

    // ball speed
    Xspeed = 20 / FPS;
    Yspeed = 20 / FPS;

    // random direction
    if (Math.floor(Math.random() * 2 ) == 0 ) {
        Xspeed = -Xspeed;
    }

    if (Math.floor(Math.random() * 2 ) == 0) {
        Yspeed = -Yspeed;
    }


    // UPDATE FUNCTION
    function update() {

        function moveH() {
            ballXPos += Xspeed;
            element.style.left = ballXPos + 'px';

            if (ballXPos < 0 && Xspeed < 0) {
                Xspeed = -Xspeed;
            }

            if (ballXPos > width && Xspeed > 0) {
                Xspeed = -Xspeed;
            }
        }// move H

        function moveV() {
            ballYPos += Yspeed;
            element.style.top = ballYPos + 'px';

            if (ballYPos < 0 && Yspeed < 0) {
                Yspeed = -Yspeed;
            }

            if (ballYPos > height && Yspeed > 0) {
                Yspeed = -Yspeed;
            }
        } // moveV

        // H move
        if (H) {
            moveH()
        }

        // V move
        if (V) {
           moveV();
        }

        if (!H && !V) {
            moveH()
            moveV();
        }

    } // update
}




function startAnimate() {
    if (overlay) {
        // move container imediately
        moveElement(container, false);

        // move balls after 3s and hide values
        setTimeout(function () {

            moveElement(rect);
            moveElement(rect2);
            moveElement(rect3);
            moveElement(rect4);

            hideValue(singleArray)

        }, 3000);
    }
}

//startAnimate()

// TASK: add animation for container: DONE
