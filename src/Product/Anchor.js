import { append } from "./globalFunctions";
import { UI, buildGame, SCROLL } from "./quadCaptcha";



/* 2.1 - Anchor */
export default function Anchor() {

    // elements of the anchor
    const anchor = document.createElement('div');
    const target = document.querySelector(".quad_captcha_anchor");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // anchor element style
    const anchorStyle = anchor.style;
    anchorStyle.boxSizing = "border-box";
    anchorStyle.width = "100%";
    anchorStyle.minWidth = "280px";
    anchorStyle.height = "66px";
    anchorStyle.borderRadius = "7px";
    anchorStyle.backgroundColor = "f0f0f0";
    anchorStyle.border = "1px solid #c1d2ef";
    anchorStyle.margin = "10px auto";
    anchorStyle.padding = "20px";


    // checkbox element style
    const checkStyle = checkbox.style;
    checkStyle.width = "26px";
    checkStyle.height = "26px";
    checkStyle.backgroundColor = "#b7b7b7"
    


//     width: 26px;
// height: 26px;
// border-radius: 6px;
// background: #b7b7b7;
// border: 1px solid rgba(114, 114, 114, 0.04);


 
  append(anchor, checkbox);
  append(target, anchor);

 
  checkbox.onmousemove = function () {
    checkbox.style.boxShadow = "0 0 10px #7b7b7b";
  };
  checkbox.onmouseout = function () {
    checkbox.style.boxShadow = "none";
  };
  

  checkbox.onclick = function () {
    let wHeight = window.innerHeight;
    if (wHeight < 450) {
      alert("Please put your device in Portraite mode, and try again!");
    } else {
      UI.open();
      UI.centerUI();
      buildGame();
      SCROLL.disable();
    }
  };
  return {
    // checked: function () {
    //   checkbox.parentNode.replaceChild(checkedBox, checkbox);
    //   submit.setAttribute("disabled", "false");
    // },
  };
}
