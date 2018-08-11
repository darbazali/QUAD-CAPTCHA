// printing to the console, debugging purpose
const println = console.log;

/* appending an element to a node, general purpose */
function append(node, element) {
    return node.appendChild(element);
}





/********************************
2.1 - Anchor
********************************/
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
    style.border          = '1px solid #0a4bfc';
    style.borderRadius    = '3px';
    style.display         = 'flex';
    style.fontSize        = '20px';
    style.padding         = '8px';


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
    checkbox.addEventListener('mouseover', function (e) {
        checkBox_style.backgroundColor = '#b7bee2';
    }, false);

    checkbox.addEventListener('mouseout', function (e) {
        checkBox_style.backgroundColor = '#fff';
    }, false);


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



const Anchor1 = new Anchor();
const anchor = Anchor1.anchor();
const checkBox = Anchor1.checkBox();

const target = document.getElementById('d-captcha');

append(target, anchor)

checkBox.addEventListener('click', function(event) {
    console.log(this);
}, false);







