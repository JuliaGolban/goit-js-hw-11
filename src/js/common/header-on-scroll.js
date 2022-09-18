let lastKnownScrollY = 0;
let currentScrollY = 0;
let idOfHeader = 'header';
let eleHeader = null;
const classes = {
  show: 'header-show',
  hide: 'header-hide',
};
function onScroll() {
  currentScrollY = window.pageYOffset;
  if (currentScrollY < lastKnownScrollY) {
    show();
  } else if (currentScrollY > lastKnownScrollY) {
    hide();
  }
  lastKnownScrollY = currentScrollY;
}
function show() {
  if (eleHeader.classList.contains(classes.hide)) {
    eleHeader.classList.remove(classes.hide);
    eleHeader.classList.add(classes.show);
  }
}
function hide() {
  if (
    eleHeader.classList.contains(classes.show) ||
    !eleHeader.classList.contains(classes.hide)
  ) {
    eleHeader.classList.remove(classes.show);
    eleHeader.classList.add(classes.hide);
  }
}

export default window.onload = function () {
  eleHeader = document.getElementById(idOfHeader);
  document.addEventListener('scroll', onScroll, false);
};
