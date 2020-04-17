/*--------- Styles of the UI --------*/
const UIStyle = {
  // styles / general
  resetStyle: `
        font-family: Arial;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    `,

    centerStyle: `
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    `,


  boxShadow: "box-shadow: 0 0 20px #333333;",
  absPos: "position: absolute;",
  borderBox: "box-sizing: border-box; -webkit-box-sizing: border-box;",
  // styles / specific
  // overlay style

  overlayStyle: `
        position: absolute;
        width: ${window.innerWidth} px;
        height: ${window.innerHeight} px;
        top: ${window.pageYOffset} px;
        left: ${window.pageXOffset} px;
        background-color: rgba(72, 72, 72, 0.8);
    `,

 

  // wrapper style
  wrapperStyle:
    "width: 320px; height: 450px; border-radius: 30px;" +
    "background-color: transparent;  position: relative;",
  frameStyle:
    "width: 320px; height: 450px; border-radius: 30px;" +
    " background-color: transparent;",
  // info style



  /* title style */
  titleBlockStyle:
    "width: 100%; height: 70px; margin: 0; padding: 5px 0;" +
    "font-size: 26px; font-weight: bold; background-color: " +
    "rgba(0,0,0,0)" +
    "; text-align: center;",
  titleStyle: "margin: 0; padding: 0; cursor: default; color: #F5A623",
  // button container style
  buttonBlockStyle:
    "width: 320; height: 60px; margin-top: 5px; padding: 0;" +
    "background-color: " +
    "rgba(0,0,0,0)" +
    ";",
  // container style
  containerStyle:
    "width: 320px; height: 320px; margin: 0 auto; position: relative;" +
    "background-color: transparent;" +
    "border-top: 1px solid #915f0b; border-bottom: 1px solid #915f0b;",
  timerStyle:
    "width: 100px; height: 40px; border: 4px solid #F5A623; border-radius: 5px;" +
    "text-align: center; font-size: 28px; position: absolute; cursor: default; color: #F5A623;" +
    "background-color:" +
    "rgba(0,0,0,0)" +
    "; font-weight: 500; padding: 8px;",
  popUPBlockStyle:
    "width: 320px; height: 320px; background-color: #4A4A4A;" +
    "font-size: 32px;",
  faded:
    "display: block; opacity: 0; visibility: hidden; transition: visibility .5s linear, opacity .5s linear;",
};

export default UIStyle;
