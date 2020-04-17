// random integer between tow numbers, min & max
function randomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}
// creating element
function createDiv() {
  return document.createElement("div");
}
// styleing element
function styleElem(element, style) {
  element.setAttribute("style", style);
}
/* append element/elements to a node. */
function append(nodeName, element) {
  /* for appending an array of elements */
  if (element.length > 1) {
    element.forEach(function (item) {
      nodeName.appendChild(item.circle); // for circle objects
    });
    /* appending a singl element */
  } else {
    nodeName.appendChild(element);
  }


}


/* collision detection (rect - rect) true or false, algorithm */
function isColliding(element1, element2) {
  // size of the element
  const size = 60;
  const X1 = parseInt(element1.style.left);
  const X2 = parseInt(element2.style.left);
  const Y1 = parseInt(element1.style.top);
  const Y2 = parseInt(element2.style.top);
  if (
    X1 + size >= X2 &&
    X1 <= X2 + size &&
    Y1 + size >= Y2 &&
    Y1 <= Y2 + size
  ) {
    return true;
  } else {
    return false;
  }
}
/* Randomize(shuffle) an array, algorithm */
function shuffle(srcArray, amount) {
  let rndArray = []; // random array
  while (rndArray.length < amount) {
    const random_index = Math.floor(Math.random() * srcArray.length);
    if (
      !rndArray.indexOf(random_index) >= 0 ||
      !rndArray.includes(random_index)
    ) {
      rndArray.push(srcArray[random_index]);
      srcArray.splice(random_index, 1);
    }
  }
  return rndArray;
}
/* create circles from Circle object, algorithm */
function createCircles(object) {
  const circles = [];
  let value = 0;
  while (circles.length < 10) {
    // object
    let RandomX = randomInt(0, 260);
    let RandomY = randomInt(0, 260);
    let circle = new object(value, RandomX, RandomY);
    // looping throught all existing locations
    let overLapping = false;
    for (let j = 0; j < circles.length; j++) {
      let other = circles[j];
      let collision = isColliding(circle.circle, other.circle);
      if (collision) {
        overLapping = true;
        value--; // start again
        break; // break the loop
      }
    }
    if (!overLapping) {
      circles.push(circle);
    }
    value++;
  }
  return circles;
}
/* retruns an array of sorted values of a none sorted array */
function makeSortedModel(elements) {
  const sortedValues = [];
  elements.forEach(function (item) {
    sortedValues.push(parseInt(item.circle.getAttribute("value")));
  });
  return sortedValues.sort();
}

export {
  randomInt,
  createDiv,
  styleElem,
  append,
  isColliding,
  shuffle,
  createCircles,
  makeSortedModel,
};
