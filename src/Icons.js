import { SVG } from "./SVG";
/* 2.2 = Buttons */
export function Icons() {
  // general style for buttons
  function btnStyle(button) {
    const style = button.style;
    style.width = "45px";
    style.height = "45px";
    style.padding = "0";
    style.boxSizing = "border-box";
    style.display = "inline-block";
    style.cursor = "pointer";
    //    style.margin = '0';
    //    style.marginLeft = '60px';
    //    style.marginRight = '60px';
    style.borderRadius = "0";
    style.opacity = "0.8";
    style.border = "none";
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
  const infoBtn = createButton();
  const restartBtn = createButton();
  closeBtn.innerHTML = SVG.closeIcon;
  restartBtn.innerHTML = SVG.restartIcon;
  infoBtn.innerHTML = SVG.infoIcon;
  infoBtn.style.marginLeft = "65px";
  infoBtn.style.marginRight = "30px";
  restartBtn.style.marginRight = "30px";
  return {
    closeBtn,
    restartBtn,
    infoBtn,
  };
}
