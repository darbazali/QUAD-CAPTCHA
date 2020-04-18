/*

Software Name   : gCAPTCHA (game CAPTCHA)
Version         : 1.0
Author          : Darbaz Ali
Date            : july / 2018
Location        : Kurdistan / Iraq
Technology      : javascript, Web
Aim             : Internet Bot

Description:

gCAPTCHA is a brand new, GAME based
CAPTCHA system that focuses on human thinking
and memorizing.

*/

/*---------- general purpose functions ----------*/

import {
  append,
  shuffle,
  createCircles,
  makeSortedModel,
} from "./globalFunctions";
import { Circle } from "./Circle";
import { Scroll } from "./Scroll";
import { Icons } from "./Icons";
import Anchor from "./Anchor";
import { Submit } from "../Submit";
import { UIObject } from "../UIObject";

//let println = console.log;

export const gCLink =
  'Home Page: <a href="https://darbaz.design/projects/g-shield.html" style="color: #F5A623">Learn More</a>';

// IIFE: deploying viewport meta tag to the page.
(function () {
  let viewPort = document.createElement("meta");
  viewPort.setAttribute("name", "viewport");
  viewPort.setAttribute("content", "width=device-width, initial-scale=1.0");

  document.getElementsByTagName("head")[0].appendChild(viewPort);
})();

export const ICON = new Icons();

/*---------- SET UP ----------*/

const ANCHOR = new Anchor();
export const UI = new UIObject();
export const SCROLL = new Scroll();
const SUBMIT = new Submit();

// start playing game with the circles.
function game(elements) {
  /* sorted copy of the circles */
  const sortedModel = makeSortedModel(elements);

  elements.forEach(function (element) {
    element.circle.onclick = function () {
      // value of the current circle
      const value = parseInt(this.getAttribute("value"));
      const baseNumber = sortedModel[0];

      if (value === baseNumber) {
        sortedModel.shift();
        element.rightPlay();
        element.stop();
        element.showValue();

        if (sortedModel.length === 0) {
          UI.fadeContainer();
          UI.successPOPUp();

          setTimeout(function () {
            SUBMIT.enable();
            UI.close();
            SCROLL.enable();
            ANCHOR.checked();
          }, 1500);
        }
      } else {
        elements.forEach(function (element) {
          element.stop();
          element.showValue();
          element.disable();
        });

        element.wrongPlay();

        setTimeout(function () {
          UI.fadeContainer();
          UI.failPOPUp();

          setTimeout(function () {
            UI.failPOPUp();
            UI.fadeContainer();
            reStart();
          }, 2000); // restart
        }, 200);
      }
    };
  });
}

/* set up the game */
export function buildGame() {
  // container for the circles(playground).
  const container = UI.container();

  /* clear container before start */
  UI.clearContainer();

  /* create the circles */
  const allCirlces = createCircles(Circle);
  const circles = shuffle(allCirlces, 4);

  /* start the game */
  function startGame() {
    /* deploy circles to the container. */
    append(container, circles);

    setTimeout(function () {
      circles.forEach(function (itme) {
        itme.hideValue();
      });

      /* ready the circles to be playd with */
      circles.forEach(function (itme) {
        itme.move();
      });

      setTimeout(function () {
        game(circles);
      }, 300);
    }, 2000);
  }

  // show the timer, then start game.
  UI.ready(startGame);
}

/* restart the game with wrong play or restart button.*/
export function reStart() {
  // container for the circles(playground).
  const container = UI.container();

  /* clear container before start */
  UI.clearContainer();

  /* create the circles */
  const allCirlces = createCircles(Circle);
  const circles = shuffle(allCirlces, 4);

  /* start the game */

  /* deploy circles to the container. */
  append(container, circles);

  /* remove pop up */
  //  UI.failPOPUp();
  setTimeout(function () {
    circles.forEach(function (itme) {
      itme.hideValue();
    });

    setTimeout(function () {
      /* ready the circles to be playd with */
      circles.forEach(function (itme) {
        itme.move();
      });

      game(circles);
    }, 200);
  }, 2000);
}

/*---------- END ----------*/
