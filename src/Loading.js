export default function Loading({ $target, isLoading }) {
  this.$element = document.createElement("div");
  this.state = isLoading;
  this.$element.className = "Modal Loading";
  $target.appendChild(this.$element);

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    const { isLoading } = this.state;
    this.$element.innerHTML = `<div class="content"><img src="./assets/nyan-cat.gif"></div>`;
    this.$element.style.display = isLoading ? "block" : "none";
  };
}
