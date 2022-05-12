export default function ImageViewer({ $target }) {
  this.$element = document.createElement("div");
  this.$element.className = "Modal ImageViewer";
  $target.appendChild(this.$element);
  this.render = () => {
    this.$element.innerHTML = `<div class="content">
        <img src="./assets/sample_image.jpg">
    </div>`;
  };
}
