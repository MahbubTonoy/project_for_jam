//eye blink min and max in second
let min = 3;
let max = 5;
let blinkInterval = 100; //in millisecond

//minimum 20 - less number, more sensitivity;
let sensitivity = 100;
let okutiSensitivity = 400;

/**** Do not edit below, ****/

//eye blink interval
let interval = setInterval(eyeBlink, getRandomArbitrary(min, max));

let centerDiv = document.querySelector(".center_div");
document.querySelector("body").addEventListener("mousemove", (e) => {
  //element move function
  elementMove(".responsive-position-left", e, sensitivity); //left eye
  elementMove(".responsive-position-right", e, sensitivity); //right eye
  elementMove(".okuti", e, okutiSensitivity); //mouth

  //eyelash shrink
  elementShrink(".omeme-lash-left", e, "left"); //left eye lash
  elementShrink(".omeme-lash-right", e, "right"); //right eye lash

  //mouth part shrink
  elementShrink(".okuti-shape-left", e, "left"); //mouth left part
  elementShrink(".okuti-shape-right", e, "right"); //mouth right part

  mouth(e); //change mouth expression and position

  // increase eye blinking when mouse is center
  centerDiv.addEventListener("mouseover", () => {
    clearInterval(interval);
    interval = setInterval(eyeBlink, getRandomArbitrary(0.5, 0.5));
  });
  centerDiv.addEventListener("mouseleave", () => {
    clearInterval(interval);
    interval = setInterval(eyeBlink, getRandomArbitrary(min, max));
  });
});

document.querySelector("body").addEventListener("mouseleave", () => {
  elementReturnToBase(".responsive-position-left");
  elementReturnToBase(".responsive-position-right");
  elementReturnToBase(".okuti");

  document.querySelector(".omeme-lash-left").style.borderLeft = "0px";
  document.querySelector(".omeme-lash-right").style.borderRight = "0px";
  
  document.querySelector(".okuti-shape-left").style.borderLeft = "0px";
  document.querySelector(".okuti-shape-right").style.borderRight = "0px";



  document.querySelector(".omeme-lash-left").style.transform =
    "translateY(0px)";
  document.querySelector(".omeme-lash-right").style.transform =
    "translateY(0px)";

  document.querySelector(".okuti-left").style.width = 8+"rem";
  document.querySelector(".okuti-right").style.width = 8+"rem";
});

//elements move (parallax)
function elementMove(elementClass, e, sensitivity) {
  let element = document.querySelector(elementClass);
  if (element == undefined) {
    return;
  }

  let elementSensitivity = sensitivity;

  let elementPosX =
    element.getBoundingClientRect().left + element.offsetWidth / 2;
  let elementPosY =
    element.getBoundingClientRect().top + element.offsetHeight / 2;

  let cursorDirectionX = (e.pageX - elementPosX) / (elementSensitivity / 10);
  let cursorDirectionY = (e.pageY - elementPosY) / (elementSensitivity / 10);

  element.style.transform = `translateX(${cursorDirectionX}px) translateY(${cursorDirectionY}px)`;
  element.setAttribute("data-posX", cursorDirectionX);
  element.setAttribute("data-posY", cursorDirectionY);

  //put eyelash lower when mouse up
  eyelashLower(e, ".omeme-lash-left");
  eyelashLower(e, ".omeme-lash-right");
}

function elementShrink(elementClass, e, side) {
  let element = document.querySelector(elementClass);
  if (element == undefined) {
    return;
  }

  let windowWidthHalf = window.innerWidth / 2;

  let cursorDirectionX = (e.pageX - windowWidthHalf) / 30;

  if (side == "left") {
    if (e.pageX < windowWidthHalf) {
      element.style.borderLeft = Math.abs(cursorDirectionX) + "px solid #fff";
    }
  }
  if (side == "right") {
    if (e.pageX > windowWidthHalf) {
      element.style.borderRight = Math.abs(cursorDirectionX) + "px solid #fff";
    }
  }
}

function mouth(e) {
  let mouthLeft = document.querySelector(".okuti-left");
  let mouthRight = document.querySelector(".okuti-right");

  let windowWidthHalf = window.innerWidth / 2;

  if (windowWidthHalf > e.pageX) {
    let changeLimit = (windowWidthHalf - e.pageX) / 500;
    mouthLeft.style.width = 8 - changeLimit + "rem";
    mouthRight.style.width = 8 + changeLimit + "rem";
  }
  if (windowWidthHalf < e.pageX) {
    let changeLimit = (e.pageX - windowWidthHalf) / 500;
    mouthLeft.style.width = 8 + changeLimit + "rem";
    mouthRight.style.width = 8 - changeLimit + "rem";
  }
  let mouthContainer = document.querySelector(".okuti-container");

  let elementPosY =
    mouthContainer.getBoundingClientRect().top +
    mouthContainer.offsetHeight / 2;
  mouthContainer.style.transform =
    "rotateX(" + (elementPosY - e.pageY) / 20 + "deg)";
}

//eye blinking functionality
function eyeBlink() {
  //eyes
  let leftEye = document.querySelector(".omeme-left");
  let rightEye = document.querySelector(".omeme-right");

  //eyelash
  let leftEyeLash = document.querySelector(".omeme-lash-left");
  let rightEyeLash = document.querySelector(".omeme-lash-right");

  leftEye.style.borderTop = leftEye.offsetHeight + "px solid #fff";
  rightEye.style.borderTop = rightEye.offsetHeight + "px solid #fff";

  leftEyeLash.style.marginTop = "127px";
  rightEyeLash.style.marginTop = "127px";

  setTimeout(() => {
    leftEye.style.borderTop = "0px solid #fff";
    rightEye.style.borderTop = "0px solid #fff";

    leftEyeLash.style.marginTop = "-131px";
    rightEyeLash.style.marginTop = "-131px";
  }, blinkInterval);
}

//random number generator in range
function getRandomArbitrary(min, max) {
  min *= 1000;
  max *= 1000;
  // console.log(min, max);
  return Math.round(Math.random() * (max - min) + min);
}

function eyelashLower(e, eyelashClass) {
  let eyelash = document.querySelector(eyelashClass);
  let eyelashPosY =
    eyelash.getBoundingClientRect().top + eyelash.offsetHeight / 2;

  if (e.pageY < eyelashPosY) {
    eyelash.style.transform = `translateY(${(eyelashPosY - e.pageY) / 20}px)`;
  } else {
    eyelash.style.transform = "translateY(0px)";
  }
}

function elementReturnToBase(elementClass) {
  let element = document.querySelector(elementClass);

  // let elementChilds = document.querySelectorAll(elementClass+"> div");

  let elementTransformX = Math.round(element.getAttribute("data-posX"));
  let elementTransformY = Math.round(element.getAttribute("data-posY"));

  let elementInterval = setInterval(() => {
    let absElementTransformX = Math.abs(elementTransformX);
    let absElementTransformY = Math.abs(elementTransformY);





    if (absElementTransformX <= absElementTransformY) {
      elementTransformX = returnLessNumber(elementTransformX, 1);
      elementTransformY = returnLessNumber(elementTransformY, ((absElementTransformY / absElementTransformX)));
    } else {
      elementTransformX = returnLessNumber(elementTransformX, ((absElementTransformX / absElementTransformY)));
      elementTransformY = returnLessNumber(elementTransformY, 1);
    }






    console.log(elementTransformX, elementTransformY);

    element.style.transform = `translateX(${elementTransformX}px) translateY(${elementTransformY}px)`;

    if (elementTransformX == 0 && elementTransformY == 0) {
      clearInterval(elementInterval);
    }
  }, 1);
}

function returnLessNumber(number, timestamp) {
  timestamp *= 3;
  if (number < timestamp && number > (timestamp * -1)) {
    return 0;
  }
  if (number > 0) {
    return number - timestamp;
  } else {
    return number + timestamp;
  }
}
