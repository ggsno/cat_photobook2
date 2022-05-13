export default function ImageViewer({ $target, initialState }) {
  this.$element = document.createElement("div");
  this.$element.className = "Modal ImageViewer";
  this.state = initialState;

  $target.appendChild(this.$element);
  this.render = () => {
    const URL = `https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public`;
    const filePath =
      this.state.filePath[0] === "/"
        ? this.state.filePath
        : "/" + this.state.filePath;
    this.$element.innerHTML = `<div class="content">
        <img src=${URL + filePath}>
    </div>`;
    this.$element.addEventListener("click", e => {
      if (e.target.className === this.$element.className) {
        this.$element.remove();
      }
    });
  };
  this.render();
}
