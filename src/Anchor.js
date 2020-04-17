import { append } from "./globalFunctions";
import { UI, buildGame, SCROLL } from "./G-SHIELD";
/* 2.1 - Anchor */
export default function Anchor() {
  // common styles for checkBox element
  function styleCheckbox(element) {
    const style = element.style;
    style.height = "30px";
    style.width = "30px";
    style.border = "1px solid #999";
    style.borderRadius = "2px";
    style.backgroundColor = "fff";
    style.color = "#00ff00";
    style.marginRight = "10px";
    style.padding = "0";
    style.fontSize = "30px";
    style.textAlign = "center";
    style.cursor = "pointer";
  }
  // elements
  const anchor = document.createElement("div");
  const checkbox = document.createElement("div");
  const checkedBox = checkbox.cloneNode(true);
  const title = document.createElement("div");
  const target = document.querySelector(".d-captcha-div");
  const submit = document.querySelector(".d-captcha-submit");
  //  const d_c_anchor = target[0];
  const checkMark = "&#10003";
  // assembling
  title.innerHTML = "I'm not a robot";
  append(anchor, checkbox);
  append(anchor, title);
  append(target, anchor);
  // styles
  var style = anchor.style;
  var title_style = title.style;
  // anchor style
  style.width = "300px";
  style.height = "80px";
  style.boxSizing = "border-box";
  style.backgroundColor = "#999";
  style.color = "#0000ff";
  style.border = "1px solid #0000ff";
  style.borderRadius = "8px";
  style.display = "flex";
  style.fontSize = "25px";
  style.padding = "20px 10px";
  style.marginBottom = "10px";
  // checkBox style
  styleCheckbox(checkbox);
  checkbox.style.transition = "box-shadow 0.3s";
  checkbox.style.borderRadius = "3px";
  checkbox.onmousemove = function () {
    checkbox.style.boxShadow = "0 0 10px #7b7b7b";
  };
  checkbox.onmouseout = function () {
    checkbox.style.boxShadow = "none";
  };
  // checkedBox style
  styleCheckbox(checkedBox);
  checkedBox.innerHTML = checkMark;
  checkedBox.style.cursor = "default";
  // title stile
  title_style.cursor = "default";
  title_style.color = "inherit";
  checkbox.onclick = function () {
    let wHeight = window.innerHeight;
    if (wHeight < 450) {
      alert("Please put your device in Portraite mode, and try again!");
    }
    else {
      UI.open();
      UI.centerUI();
      buildGame();
      SCROLL.disable();
    }
  };
  return {
    checked: function () {
      checkbox.parentNode.replaceChild(checkedBox, checkbox);
      submit.setAttribute("disabled", "false");
    },
  };
}
