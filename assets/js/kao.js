//elements move (parallax)
document.querySelector("body").addEventListener("mousemove", (e) => {
  //minimum 20 - less number, more sensitivity;
  let sensitivity = 100;
  let okutiSensitivity = 400;
  



  elementMove(".responsive-position-left", e, sensitivity); //left eye
  elementMove(".responsive-position-right", e, sensitivity); //right eye
  elementMove(".okuti", e, okutiSensitivity); //mouth

  elementShrink(".omeme-lash-left", e, "left"); //left eye lash
  elementShrink(".omeme-lash-right", e, "right"); //right eye lash

  elementShrink(".okuti-shape-left", e, "left"); //mouth left part
  elementShrink(".okuti-shape-right", e, "right"); //mouth right part

  mouth(e); //change mouth position
});

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
}

function elementShrink(elementClass, e, side) {
  let element = document.querySelector(elementClass);
  if (element == undefined) {
    return;
  }

  let windowWidthHalf = window.innerWidth / 2;

  let elementPosX =
    element.getBoundingClientRect().left + element.offsetWidth / 2;
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

  // let elementPosX = mouthCenter.getBoundingClientRect().left + mouthCenter.offsetWidth / 2;

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
