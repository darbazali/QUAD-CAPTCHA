// append element to a node
function append(node, element) {
  return node.appendChild(element);
}

// creating element
function createDiv() {
  return document.body.createElement('div');
}


// styleing element
function styleDiv(element, style) {
  element.setAttribute('style', style)
}



function Anchor() {

  // common styles for checkBox element
  function styleCheckbox(element) {
    const style = element.style;

    style.height = '30px';
    style.width = '30px';
    style.border = '1px solid ' + colors.darkGray;
    style.borderRadius = '2px';
    style.backgroundColor = colors.white;
    style.color = colors.forestGreen;
    style.marginRight = '10px';
    style.padding = '0';
    style.fontSize = '30px';
    style.textAlign = 'center';
    style.cursor = 'pointer';
  }

  // elements
  const anchor = createDiv();
  const checkbox = createDiv();
  const title = createDiv();

  const anchorStyle =
        "height: 30px;" +
        "width: 30px;" +
        "border: 2px solid #999;" +
        "border-radius: 2px;" +
        "background-color: #FFF" +
        "" +
        " ";

  const checkboxStyle = "";
  const titleStyle = "";

  const checkedBox = checkbox.cloneNode(true);
  const target = document.getElementsByClassName('d-captcha-div');
  const d_c_anchor = target[0];
  const checkMark = '&#10003';

  // assembling
  title.innerHTML = "I'm not a robot";
  append(anchor, checkbox);
  append(anchor, title);
  append(d_c_anchor, anchor);


  // styles
  style = anchor.style;
  title_style = title.style;

  // anchor style
  style.width = '300px';
  style.height = '80px';
  style.boxSizing = 'border-box';
  style.backgroundColor = colors.lightGray;
  style.color = colors.mediumBlue;
  style.border = '1px solid ' + colors.darkGray;
  style.borderRadius = '8px';
  style.display = 'flex';
  style.fontSize = '25px';
  style.padding = '20px 10px';
  style.marginBottom = '10px';


  // checkBox style
  styleCheckbox(checkbox);
  checkbox.style.transition = 'box-shadow 0.3s';
  checkbox.style.borderRadius = '3px';
  checkbox.onmousemove = function () {
    checkbox.style.boxShadow = '0 0 10px #7b7b7b';
  }

  checkbox.onmouseout = function () {
    checkbox.style.boxShadow = 'none';
  }


  // checkedBox style
  styleCheckbox(checkedBox);
  checkedBox.innerHTML = checkMark;
  checkedBox.style.cursor = 'default';



  // title stile
  title_style.cursor = 'default';
  title_style.color = 'inherit';


  checkbox.onclick = function () {
    UI.open();
    buildGame();
    SCROLL.disable();
  }

  return {
    checked: function () {
      checkbox.parentNode.replaceChild(checkedBox, checkbox);
    }
  }
}
