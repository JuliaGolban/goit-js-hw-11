export default class HeaderOnScroll {
  constructor() {
    this.lastKnownScrollY = 0;
    this.currentScrollY = 0;
    this.ticking = false;
    this.idOfHeader = 'header';
    this.eleHeader = null;
    this.classes = {
      showed: 'header-show',
      hided: 'header-hide',
    };
  }

  onScroll() {
    this.currentScrollY = window.pageYOffset;
    this.update();
  }

  update() {
    if (this.currentScrollY < this.lastKnownScrollY) {
      this.show();
    } else if (this.currentScrollY > this.lastKnownScrollY) {
      this.hide();
    }
    this.lastKnownScrollY = this.currentScrollY;
  }

  show() {
    if (eleHeader.classList.contains(classes.hided)) {
      eleHeader.classList.remove(classes.hided);
      eleHeader.classList.add(classes.showed);
    }
  }

  hide() {
    if (
      eleHeader.classList.contains(classes.showed) ||
      !eleHeader.classList.contains(classes.hided)
    ) {
      eleHeader.classList.remove(classes.showed);
      eleHeader.classList.add(classes.hided);
    }
  }
  onload() {
    window.onload = function () {
      eleHeader = document.getElementById(idOfHeader);
      document.addEventListener('scroll', onScroll, false);
    };
  }
}
