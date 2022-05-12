export default function Breadcrumb({ $target, initialState }) {
    this.state = initialState;
    this.$element = document.createElement("nav");
    this.$element.className = "Breadcrumb";
    $target.appendChild(this.$element);
    this.setState = (nextState) => {
        this.state = { ...this.state, ...nextState};
        this.render();
    }
    this.render = () => {
        const { items } = this.state;
        this.$element.innerHTML = items.map(e => `<div>${e}</div>`).join("");
    }
}