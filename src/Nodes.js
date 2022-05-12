export default function Nodes({ $target, initialState }) {
  this.state = initialState;
  this.$element = document.createElement("div");
  this.$element.className = "Nodes";
  $target.appendChild(this.$element);

  this.setState = nextState => {
    this.state = { ...this.state, ...nextState };
    this.render();
  };
  this.render = () => {
    const { items, isRoot } = this.state;
    this.$element.innerHTML = isRoot
      ? ""
      : '<div class="Node"><img src="./assets/prev.png"></div>' +
        items
          .map(
            ({ type, content }) => `<div class="Node">
    <img src=${
      type === "directory" ? "./assets/directory.png" : "./assets/file.png"
    }>
    <div>${content}</div>
    </div>`
          )
          .join("");
  };
}
