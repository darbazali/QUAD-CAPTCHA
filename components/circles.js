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

    this.hideValue = function() {
        return this.style.fontSize = '0px';
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



