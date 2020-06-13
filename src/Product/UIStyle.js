/*--------- Styles of the UI --------*/
import Colors from "./Colors";

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
        background-color: ${Colors.colorWhite};
        opacity: 1;
    `,

  // Style for playground element - Main section of the UI
  containerStyle: `
        width: 300px;
        height: 420px;
        background: ${Colors.colorPlayground};
        border: 1px solid #fff;
        border-radius: 30px;
        filter: drop-shadow(0px 2px 7px rgba(152, 77, 42, 0.31));
    `,

  frameStyle: `
        width: 300px;
        height: 500px;
        background: ${Colors.colorFrame};
        border-radius: 30px;
        opacity: 1;
    `,

  // wrapper style
  wrapperStyle:
      `
        width: 320px;
        height: 450px;
        border-radius: 30px;
        backgound-color: ${Colors.colorFrame};
        position: relative;
        opacity: 1;
      `,


  // button container style
  buttonBlockStyle: `
      width: 90%;
      height: 60px;
      margin: 0 auto;
      padding: 20px 0;
      background-color: ${Colors.colorFrame};
      box-sizing: border-box;
      display: flex;
      justify-content: center;
    `,

  

  // timerStyle:
  //   "width: 100px; height: 40px; border: 4px solid #F5A623; border-radius: 5px;" +
  //   "text-align: center; font-size: 28px; position: absolute; cursor: default; color: #F5A623;" +
  //   "background-color:" +
  //   "rgba(0,0,0,0)" +
  //   "; font-weight: 500; padding: 8px;",

  popUPBlockStyle: `
    width: 300px;
    height: 420px;
    background: ${Colors.colorPlayground};
    border: 1px solid #fff;
    border-radius: 30px;
    color: #393939;
    font-size: 20px;
    padding: 200px 20px;
  `,
  faded:
    "display: block; opacity: 0; visibility: hidden; transition: visibility .5s linear, opacity .5s linear;",
};

export default UIStyle;
