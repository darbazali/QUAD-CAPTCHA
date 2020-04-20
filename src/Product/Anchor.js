import { append } from "./globalFunctions";
import { UI, buildGame, SCROLL } from "./quadCaptcha";

/* 2.1 - Anchor */
export default function Anchor() {
  // elements of the anchor
  const anchor = document.createElement("div");
  const target = document.querySelector(".quad_captcha_anchor");

  const checkbox = document.createElement("input");
  checkbox.setAttribute("id", "quad_captcha_checkbox");
  checkbox.type = "checkbox";

  const label = document.createElement("label");
  label.setAttribute("for", "quad_captcha_checkbox");
  label.append("I'm Human");
  label.style.fontSize = "16px";
  label.style.color = "#393939";

  // anchor element style
  const anchorStyle = anchor.style;
  anchorStyle.boxSizing = "border-box";
  anchorStyle.width = "100%";
  anchorStyle.minWidth = "280px";
  anchorStyle.height = "40px";
  anchorStyle.borderRadius = "7px";
  anchorStyle.backgroundColor = "f0f0f0";
  anchorStyle.border = "1px solid #c1d2ef";
  anchorStyle.margin = "10px auto";
  anchorStyle.padding = "10px 20px";

  // checkbox element style
  const checkStyle = checkbox.style;
  // checkStyle.width = "26px";
  // checkStyle.height = "26px";
  checkStyle.backgroundColor = "#b7b7b7";
  checkStyle.marginRight = "10px";

  append(anchor, checkbox);
  append(anchor, label);
  append(target, anchor);

  checkbox.onmousemove = function () {
    // hover effect - mouse over
  };

  checkbox.onmouseout = function () {
    // hover effect - mouse leav
  };

  checkbox.onclick = function (e) {
    e.preventDefault();
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
    checked: function () {
      return (checkbox.checked = true);
    },
  };
}
