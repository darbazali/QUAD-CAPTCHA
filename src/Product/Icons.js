import { SVG } from "./SVG";
/* 2.2 = Buttons */
export function Icons() {
  // general style for buttons
  function btnStyle(button) {
    const style = button.style;
    style.width = "32px";
    style.height = "32px";
    style.padding = "5px";
    style.boxSizing = "border-box";
    style.display = "inline-block";
    style.cursor = "pointer";
    style.border= "1px solid #393939";
    style.borderRadius = "5px";
    style.opacity = "0.8";
    style.transition = "all 0.3s";
    style.backgroundColor = "rgba(0,0,0,0)";
    button.onmouseover = function () {
      style.opacity = "1";
      style.filter = "alpha(opacity=80)"; // IE
      style.transform = "scale(1.1)";
      style.msTransform = "scale(1.1)"; // IE
    };
    button.onmouseout = function () {
      style.opacity = "0.8";
      style.filter = "alpha(opacity=100)"; // IE
      style.transform = "scale(1)";
      style.msTransform = "scale(1)"; // IE
    };
    button.onfocus = function () {
      style.outline = "none";
    };
  }
  function createButton() {
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    btnStyle(button);
    return button;
  }
  // icon names
  const closeBtn = createButton();
  const restartBtn = createButton();
  closeBtn.innerHTML = SVG.closeIcon;
  restartBtn.innerHTML = SVG.restartIcon;

  restartBtn.style.marginRight = "20px";
  return {
    closeBtn,
    restartBtn,
  };
}
