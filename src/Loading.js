export default function Loading({ $target, initialState }) {
  this.$element = document.createElement("div");
  this.state = initialState;
  this.$element.className = "Modal Loading";
  $target.appendChild(this.$element);

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { isLoading } = this.state;
    this.$element.innerHTML = `<div class="content"><img src="./assets/nyan-cat.gif"></div>`;
    if (isLoading) {
      this.$element.style.display = "block";
    } else {
      this.$element.style.display = "none";
    }
  };
}
