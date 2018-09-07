//const println = console.log;
//
//const Style = {
//
//  center: function (element) {
//    var style = element.style;
//    style.position = 'absolute';
//    style.left = '50%';
//    style.top = '50%';
//    style.transform = 'translate(-50%, -50%)'
//  }
//
//}
//
//
//const ELEMENT = {
//  create: function () {
//    return document.createElement('div');
//  },
//
//  elments: {
//    overlay: this.create,
//    wrapper: this.create(),
//    container: this.create(),
//    title: this.create(),
//    info: this.create(),
//    timer: this.create(),
//    BTNWrapper: this.create()
//  },
//
//  style: function(style) {
//    return this.setAttribute('style', style);
//  }
//
//
//
//}
//
//
//const style = "width: 100px; height: 100px; background-color: firebrick;"
//const timer = ELEMENT.create().style(style);
//
//
//document.body.appendChild(ELEMENT.elments.overlay.style(style));




const element = document.createElement('div');

const style =
      "width: 100px;" +
      "height: 100px;" +
      "border-radius: 100%;" +
      "transform: scale(1.5);" +
      "background-color: #fff;";

element.setAttribute('style', style);

document.body.appendChild(element);

















