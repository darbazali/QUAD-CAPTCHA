


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
