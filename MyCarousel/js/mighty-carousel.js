let mightyCarouselSlideList;
let mightyCarouselIndicators;
let mightyCarouselInnerEl;
let mightyCarouselHtmlEl = document.getElementById("mighty-carousel");
let imgps = parseInt(
  document.querySelector(".mc-inner").dataset["imgps"]
);
let controls = mightyCarouselHtmlEl.dataset["controls"];


const getElements = () => {
  mightyCarouselInnerEl = document.querySelector(".mc-inner");
  if (mightyCarouselInnerEl.children) {
    mightyCarouselSlideList = mightyCarouselInnerEl.children;
    for (let i = 0; i < mightyCarouselSlideList.length; i++) {
      mightyCarouselSlideList[i].id = `slide-${i}`;
    }
  }
};

const insertIndicators = () => {
  let indicators = document.querySelector(".mc-indicators");
  if (indicators) {
    for (let i = 0; i < mightyCarouselSlideList.length; i++) {
      if (i == 0) {
        const indicatorHtmlElement = `<button id="btn-${i}" onclick="jumpToSlide(this.id)" class="active"></button>`;
        indicators.insertAdjacentHTML("beforeend", indicatorHtmlElement);
      } else {
        const indicatorHtmlElement = `<button id="btn-${i}" onclick="jumpToSlide(this.id)" class=""></button>`;
        indicators.insertAdjacentHTML("beforeend", indicatorHtmlElement);
      }
    }
  }
};

const addIndicatorsToHtml = () => {
  if (!(imgps && imgps != 1 && (imgps < mightyCarouselSlideList.length) )) {
    let indicators = mightyCarouselHtmlEl.dataset["indicators"];
    let indicatorEl = `<div class="mc-indicators"></div>`;
    if (indicators == "true") {
      mightyCarouselHtmlEl.insertAdjacentHTML("beforeend", indicatorEl);
      insertIndicators();
    }
  }
  else {
    // imgps 1 olmayınca container dışına indicator ekleyebilirsin
  }
};

const addControlsToHtml = () => {
  if (controls && controls == "true") {
    if (imgps && imgps != 1 && (imgps < mightyCarouselSlideList.length)) {
      let controlsElPrevOuter = `
      <button class="mc-control-prev-outer" onclick="slidePrev()">
        <div class="prev-button-area">
          <div class="angle-bracket-lesser"></div>
        </div>
      </button>`;
      let controlsElNextOuter = `
      <button class="mc-control-next-outer" onclick="slideNext()">
        <div class="next-button-area">
          <div class="angle-bracket-greater"></div>
        </div>
      </button>
      `;
      mightyCarouselHtmlEl.insertAdjacentHTML("afterbegin", controlsElPrevOuter);
      mightyCarouselHtmlEl.insertAdjacentHTML("beforeend", controlsElNextOuter);
    }
    else {
      let controlsEl = `
      <button class="mc-control-prev-inner" onclick="slidePrev()">
        <div class="angle-bracket-lesser"></div>
      </button>
      <button class="mc-control-next-inner" onclick="slideNext()">
        <div class="angle-bracket-greater"></div>
      </button>`;
      mightyCarouselHtmlEl.insertAdjacentHTML("beforeend", controlsEl);
    }
  }
};

const jumpToSlide = (clicked_id) => {
  mightyCarouselIndicators = document.querySelector(
    ".mc-indicators"
  ).children;
  removeClasses();
  for (i = 0; i < mightyCarouselIndicators.length; i++) {
    if (mightyCarouselIndicators[i].id == clicked_id) {
      mightyCarouselIndicators[i].classList.add("active");
      mightyCarouselSlideList[i].classList.add("active");
    } else {
      mightyCarouselIndicators[i].classList.remove("active");
    }
  }
};

const slideNext = () => {
  nextImage();
  nextIndicator();
};

const removeClasses = () => {
  for (let i = 0; i < mightyCarouselSlideList.length; i++) {
    mightyCarouselSlideList[i].classList.remove("multiple-active");
    mightyCarouselSlideList[i].classList.remove("active");
    mightyCarouselSlideList[i].classList.remove("mid-to-left");
    mightyCarouselSlideList[i].classList.remove("right-to-mid");
    mightyCarouselSlideList[i].classList.remove("to-left");
    mightyCarouselSlideList[i].classList.remove("mid-to-right");
    mightyCarouselSlideList[i].classList.remove("left-to-mid");
    mightyCarouselSlideList[i].classList.remove("to-right");
  }
}

function reload(_htmlEL) {
  var container = _htmlEL;
  var content = container.innerHTML;
  container.innerHTML = content;
};

function reOrder() { 
  let lastOrder = 2;
  removeOrders();
  for (let i = 0 ; i < mightyCarouselSlideList.length; i++) {
    if (mightyCarouselSlideList[i].classList.contains("mid-to-left") || mightyCarouselSlideList[i].classList.contains("left-to-mid")) {
      for (let j = i + 1; j < mightyCarouselSlideList.length; j++) {
        if (mightyCarouselSlideList[j].classList.contains("right-to-mid") || mightyCarouselSlideList[j].classList.contains("mid-to-right")) {
          break;
        }
        else if (mightyCarouselSlideList[j].classList.contains("to-left") || mightyCarouselSlideList[j].classList.contains("to-right")) {
          mightyCarouselSlideList[j].style.order = lastOrder;
          lastOrder++;
        }
        if (j == mightyCarouselSlideList.length - 1) {
          j = -1;
        }
      }
      break;
    }
  }
}

function removeOrders() {
  for (let i = 0 ;i < mightyCarouselSlideList.length ; i++) {
    mightyCarouselSlideList[i].style.order = "";
  }
}

const nextImage = () => {
  if (mightyCarouselSlideList) {
    if (imgps && imgps != 1 && (imgps < mightyCarouselSlideList.length) ) {
      for (let i = 0; i < mightyCarouselSlideList.length; i++) {
          if (mightyCarouselSlideList[i].classList.contains("multiple-active")) {
            removeClasses();
            mightyCarouselSlideList[i].classList.add("mid-to-left");
            for (let j = 1;j <= imgps; j++) {
              if (j == imgps) {
                mightyCarouselSlideList[i + j].classList.add("right-to-mid");
              }
              else {
                mightyCarouselSlideList[i + j].classList.add("to-left");
              }
            }
            break;
          }
          else if (mightyCarouselSlideList[i].classList.contains("to-left")) {
            if (i + imgps == mightyCarouselSlideList.length) {
              removeClasses();
              mightyCarouselSlideList[i].classList.add("mid-to-left");
              for (let j = 1;j < imgps; j++) {
                mightyCarouselSlideList[i + j].classList.add("to-left");
              }
              mightyCarouselSlideList[0].classList.add("right-to-mid");
            }
            else if (i + imgps > mightyCarouselSlideList.length) {
              removeClasses();
              mightyCarouselSlideList[i].classList.add("mid-to-left");
              for (let j = 1; j < imgps; j++) {
                if (i + j < mightyCarouselSlideList.length) {
                  mightyCarouselSlideList[i + j].classList.add("to-left");
                }
                else {
                  mightyCarouselSlideList[i + j - mightyCarouselSlideList.length].classList.add("to-left");
                }
                if (j == (imgps - 1)) {
                  mightyCarouselSlideList[i + j - mightyCarouselSlideList.length + 1].classList.add("right-to-mid");
                }
              }
            }
            else if (i == 0) {
              for (let j = 0; j < mightyCarouselSlideList.length; j++) {
                if (mightyCarouselSlideList[j].classList.contains("mid-to-left")) {
                  if (j == mightyCarouselSlideList.length - 1) {
                    mightyCarouselSlideList[j].classList.remove("mid-to-left");
                    mightyCarouselSlideList[0].classList.remove("to-left");
                    mightyCarouselSlideList[0].classList.add("mid-to-left");
                  }
                  else {
                    mightyCarouselSlideList[j].classList.remove("mid-to-left");
                    mightyCarouselSlideList[j + 1].classList.remove("to-left");
                    mightyCarouselSlideList[j + 1].classList.add("mid-to-left");
                  }
                  break;
                }
              }
              for (let j = 0; j < mightyCarouselSlideList.length; j++) {
                if (mightyCarouselSlideList[j].classList.contains("right-to-mid")) {
                  mightyCarouselSlideList[j].classList.remove("right-to-mid");
                  mightyCarouselSlideList[j].classList.add("to-left");
                  mightyCarouselSlideList[j + 1].classList.add("right-to-mid");
                  break;
                }
              }
            }
            else {
              removeClasses();
              mightyCarouselSlideList[i].classList.add("mid-to-left");
              for (let j = 1;j < imgps; j++) {
                  mightyCarouselSlideList[i + j].classList.add("to-left");
              }
              mightyCarouselSlideList[i + imgps].classList.add("right-to-mid");
            }
            break;
          }
          else if (mightyCarouselSlideList[i].classList.contains("to-right")) {
            for (let j = 0; j < mightyCarouselSlideList.length; j++) {
              if (mightyCarouselSlideList[j].classList.contains("to-right")) {
                mightyCarouselSlideList[j].classList.remove("to-right");
                mightyCarouselSlideList[j].classList.add("to-left");
              }
              else if (mightyCarouselSlideList[j].classList.contains("mid-to-right")) {
                mightyCarouselSlideList[j].classList.remove("mid-to-right");
                mightyCarouselSlideList[j].classList.add("right-to-mid");
              }
              else if (mightyCarouselSlideList[j].classList.contains("left-to-mid")) {
                mightyCarouselSlideList[j].classList.remove("left-to-mid");
                mightyCarouselSlideList[j].classList.add("mid-to-left");
              }
            }
            break;
          }
       }
      reOrder();
      reload(mightyCarouselInnerEl);
    } 
    else {
      for (let i = 0; i < mightyCarouselSlideList.length; i++) {
        if (mightyCarouselSlideList[i].classList.contains("active")) {
          mightyCarouselSlideList[i].classList.remove("active");
          mightyCarouselSlideList[i].classList.add("mid-to-left");
          if (i == mightyCarouselSlideList.length - 1) {
            mightyCarouselSlideList[0].classList.add("right-to-mid")
          }
          else {
            mightyCarouselSlideList[i + 1].classList.add("right-to-mid");
          }
          break;
        }
        else if (mightyCarouselSlideList[i].classList.contains("right-to-mid")) {
          if (i == mightyCarouselSlideList.length - 1) {
            mightyCarouselSlideList[i - 1].classList.remove("mid-to-left");
            mightyCarouselSlideList[i].classList.remove("right-to-mid");
            mightyCarouselSlideList[i].classList.add("mid-to-left");
            mightyCarouselSlideList[0].classList.add("right-to-mid");
          }
          else {
            if (i == 0) {
              mightyCarouselSlideList[mightyCarouselSlideList.length - 1].classList.remove("mid-to-left");
            }
            else {
              mightyCarouselSlideList[i - 1].classList.remove("mid-to-left");
            }
            mightyCarouselSlideList[i].classList.remove("right-to-mid");
            mightyCarouselSlideList[i].classList.add("mid-to-left");
            mightyCarouselSlideList[i + 1].classList.add("right-to-mid")
          }
          break;
          }
          else if (mightyCarouselSlideList[i].classList.contains("left-to-mid")) {
            if (i == mightyCarouselSlideList.length - 1) {
              mightyCarouselSlideList[i].classList.remove("left-to-mid");
              mightyCarouselSlideList[0].classList.remove("mid-to-right");
              mightyCarouselSlideList[i].classList.add("mid-to-left");
              mightyCarouselSlideList[0].classList.add("right-to-mid")
            }
            else {
              mightyCarouselSlideList[i].classList.remove("left-to-mid");
              mightyCarouselSlideList[i + 1].classList.remove("mid-to-right");
              mightyCarouselSlideList[i].classList.add("mid-to-left");
              mightyCarouselSlideList[i + 1].classList.add("right-to-mid")
            }
            break;
        }
      }
    }
  }
};

const nextIndicator = () => {
  if (document.querySelector(".mc-indicators")) {
    mightyCarouselIndicators = document.querySelector(
      ".mc-indicators"
    ).children;
  }
  if (mightyCarouselIndicators) {
    for (let i = 0; i < mightyCarouselIndicators.length; i++) {
      if (mightyCarouselIndicators[i].classList.contains("active")) {
        mightyCarouselIndicators[i].classList.remove("active");
        if (i == mightyCarouselIndicators.length - 1) {
          mightyCarouselIndicators[0].classList.add("active");
        }
        else {
          mightyCarouselIndicators[i + 1].classList.add("active");
        }
        break;
      }
    }
  }
};

const slidePrev = () => {
  prevImage();
  prevIndicator();
};

const prevImage = () => {
  if (mightyCarouselSlideList) {
    if (imgps && imgps != 1 && (imgps < mightyCarouselSlideList.length)) {
      for (let i = (mightyCarouselSlideList.length - 1); i >= 0 ; i--) {
        if (mightyCarouselSlideList[i].classList.contains("multiple-active")) {
          removeClasses();
          mightyCarouselSlideList[i].classList.add("mid-to-right");
          for (let j = (i - 1) ; j >= 0; j--) {
            mightyCarouselSlideList[j].classList.add("to-right");
          }
          mightyCarouselSlideList[mightyCarouselSlideList.length - 1].classList.add("left-to-mid")
          break;
        }      
        else if (mightyCarouselSlideList[i].classList.contains("to-right")){
          if (i - imgps == -1) {
            removeClasses();
            mightyCarouselSlideList[i].classList.add("mid-to-right");
            for (let j = 1;j < imgps; j++) {
              mightyCarouselSlideList[i - j].classList.add("to-right");
            }
            mightyCarouselSlideList[mightyCarouselSlideList.length - 1].classList.add("left-to-mid");
            break;
          }
          else if (i - imgps < -1) {
            removeClasses();
            mightyCarouselSlideList[i].classList.add("mid-to-right");
            for (let j = 1; j < imgps; j++) {
              if (i - j >= 0) {
                mightyCarouselSlideList[i - j].classList.add("to-right");
              }
              else {
                mightyCarouselSlideList[mightyCarouselSlideList.length + i - j].classList.add("to-right");
              }
              if (j == (imgps - 1)) {
                mightyCarouselSlideList[mightyCarouselSlideList.length + i - j - 1].classList.add("left-to-mid");
              }
            }
            break;
          }
          else if (i == mightyCarouselSlideList.length - 1) {
            for (let j = mightyCarouselSlideList.length - 1; j >= 0; j--) {
              if (mightyCarouselSlideList[j].classList.contains("mid-to-right")) {
                if (j == 0) {
                  mightyCarouselSlideList[j].classList.remove("mid-to-right");
                  mightyCarouselSlideList[mightyCarouselSlideList.length - 1].classList.remove("to-right");
                  mightyCarouselSlideList[mightyCarouselSlideList.length - 1].classList.add("mid-to-right");
                }
                else {
                  mightyCarouselSlideList[j].classList.remove("mid-to-right");
                  mightyCarouselSlideList[j - 1].classList.remove("to-right");
                  mightyCarouselSlideList[j - 1].classList.add("mid-to-right");
                }
                break;
              }
            }
            for (let j = mightyCarouselSlideList.length - 1; j >= 0; j--) {
              if (mightyCarouselSlideList[j].classList.contains("left-to-mid")) {
                mightyCarouselSlideList[j].classList.remove("left-to-mid");
                mightyCarouselSlideList[j].classList.add("to-right");
                mightyCarouselSlideList[j - 1].classList.add("left-to-mid");
                break;
              }
            }
          }
          else {
            removeClasses();
            mightyCarouselSlideList[i].classList.add("mid-to-right");
            for (let j = 1; j < imgps; j++) {
              mightyCarouselSlideList[i - j].classList.add("to-right")
            }
            mightyCarouselSlideList[i - imgps].classList.add("left-to-mid")
          }
          break;
        }
        else if (mightyCarouselSlideList[i].classList.contains("to-left")) {
          for (let j = 0; j < mightyCarouselSlideList.length; j++) {
            if (mightyCarouselSlideList[j].classList.contains("to-left")) {
              mightyCarouselSlideList[j].classList.remove("to-left");
              mightyCarouselSlideList[j].classList.add("to-right");
            }
            else if (mightyCarouselSlideList[j].classList.contains("right-to-mid")) {
              mightyCarouselSlideList[j].classList.remove("right-to-mid");
              mightyCarouselSlideList[j].classList.add("mid-to-right");
            }
            else if (mightyCarouselSlideList[j].classList.contains("mid-to-left")) {
              mightyCarouselSlideList[j].classList.remove("mid-to-left");
              mightyCarouselSlideList[j].classList.add("left-to-mid");
            }
          }
          break;
        }
      }
    reOrder();
    reload(mightyCarouselInnerEl);
    } 
    else {
      for (let i = 0; i < mightyCarouselSlideList.length; i++) {
        if (mightyCarouselSlideList[i].classList.contains("active")) {
          mightyCarouselSlideList[i].classList.remove("active");
          mightyCarouselSlideList[i].classList.add("mid-to-right");
          if (i == 0) {
            mightyCarouselSlideList[mightyCarouselSlideList.length - 1].classList.add("left-to-mid");
          }
          else {
            mightyCarouselSlideList[i - 1].classList.add("left-to-mid");
          }
          break;
        }
        else if (mightyCarouselSlideList[i].classList.contains("left-to-mid")) {
          if (i == mightyCarouselSlideList.length - 1) {
            mightyCarouselSlideList[0].classList.remove("mid-to-right");
            mightyCarouselSlideList[i].classList.remove("left-to-mid");
            mightyCarouselSlideList[i].classList.add("mid-to-right");
            mightyCarouselSlideList[i - 1].classList.add("left-to-mid");
          }
          else {
            if (i == 0) {
              mightyCarouselSlideList[mightyCarouselSlideList.length - 1].classList.add("left-to-mid")
            }
            else {
              mightyCarouselSlideList[i - 1].classList.add("left-to-mid")
            }
            mightyCarouselSlideList[i].classList.remove("left-to-mid")
            mightyCarouselSlideList[i].classList.add("mid-to-right");
            mightyCarouselSlideList[i + 1].classList.remove("mid-to-right");
          }
          break;
        }
        else if (mightyCarouselSlideList[i].classList.contains("right-to-mid")) {
          if (i == 0) {
            mightyCarouselSlideList[i].classList.remove("right-to-mid");
            mightyCarouselSlideList[mightyCarouselSlideList.length - 1].classList.remove("mid-to-left");
            mightyCarouselSlideList[i].classList.add("mid-to-right");
            mightyCarouselSlideList[mightyCarouselSlideList.length - 1].classList.add("left-to-mid");
          }
          mightyCarouselSlideList[i].classList.remove("right-to-mid");
          mightyCarouselSlideList[i - 1].classList.remove("mid-to-left");
          mightyCarouselSlideList[i].classList.add("mid-to-right");
          mightyCarouselSlideList[i - 1].classList.add("left-to-mid");
          break;
        }
      }
    }
  }
};

const prevIndicator = () => {
  if (document.querySelector(".mc-indicators")) {
    mightyCarouselIndicators = document.querySelector(
      ".mc-indicators"
    ).children;
  }
  if (mightyCarouselIndicators) {
    for (let i = 0; i < mightyCarouselIndicators.length; i++) {
      if (mightyCarouselIndicators[i].classList.contains("active")) {
        mightyCarouselIndicators[i].classList.remove("active");
        if (i == 0) {
          mightyCarouselIndicators[mightyCarouselIndicators.length - 1].classList.add("active");
        }
        else {
          mightyCarouselIndicators[i - 1].classList.add("active");
        }
        break;
      }
    }
  }
};

const autoScroll = () => {
  let autoScroll =
    document.getElementById("mighty-carousel").dataset["autoscroll"] * 1000;
  if (autoScroll) setInterval(slideNext, autoScroll);
};

const multipleImages = () => {
  if (imgps && imgps != 1 && imgps < mightyCarouselSlideList.length && imgps > 0) {
    for (let i = 0; i < imgps; i++) {
      mightyCarouselSlideList[i].classList.add("multiple-active");
    }
    addPaddings();
  } else {
    mightyCarouselSlideList[0].classList.add("active");
  }
};

function addPaddings() {
  for (let i = 0; i < mightyCarouselSlideList.length; i++) {
    mightyCarouselSlideList[i].classList.add("add-paddings");
  }
};

function addAdditionalHtmlEl() {

  let additionalHtmlEl = document.querySelector('#slide-0').cloneNode(true);
  additionalHtmlEl.setAttribute('id', `slide-0-clone`);
  document.querySelector('.mightyCarousel-inner').appendChild(additionalHtmlEl);
};

window.addEventListener("load", (event) => {
  getElements();
  autoScroll();
  addIndicatorsToHtml();
  addControlsToHtml();
  multipleImages();
});