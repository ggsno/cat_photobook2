import Breadcrumb from "./Breadcrumb.js";
import Nodes from "./Nodes.js";

export default function App({ $target }) {
  this.state = {
    breadcrumb: ["root", "yellow cat"],
    nodes: []
  };

  const { breadcrumb, nodes } = this.state;

  new Breadcrumb({
    $target,
    initialState: {
      items: breadcrumb
    }
  }).render();

  new Nodes({
    $target,
    initialState: {
      items: nodes,
      isRoot: breadcrumb.length === 1
    }
  }).render();
}
