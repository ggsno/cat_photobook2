export default function Nodes({ $target, initialState, onClick }) {
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
    this.$element.innerHTML =
      (isRoot ? "" : '<div class="Node"><img src="./assets/prev.png"></div>') +
      `
      ${items
        .map(
          ({ id, type, name }) => `<div class="Node" id=${id}>
      <img src=${
        type === "DIRECTORY" ? "./assets/directory.png" : "./assets/file.png"
      }>
      <div>${name}</div></div>`
        )
        .join("")}`;
    document.querySelectorAll(".Node").forEach(e => {
      e.addEventListener("click", onClick);
    });
  };
}
