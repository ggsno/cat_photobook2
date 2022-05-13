import Breadcrumb from "./Breadcrumb.js";
import Nodes from "./Nodes.js";
import { fetchNodes } from "./api.js";
import Loading from "./Loading.js";

export default function App({ $target }) {
  this.state = {
    breadcrumbList: [{ name: "root" }],
    nodesList: []
  };

  const breadcrumb = new Breadcrumb({
    $target,
    initialState: {
      items: this.state.breadcrumbList
    },
    onClick: () => {}
  });

  const nodes = new Nodes({
    $target,
    initialState: {
      items: this.state.nodesList,
      isRoot: this.state.breadcrumbList.length === 1
    },
    onClick: node => {
      if (!node) {
      } else if (node.type === "DIRECTORY") {
        renderPage(node);
      } else {
      }
    }
  });

  const setState = nextState => {
    this.state = { ...this.state, ...nextState };

    breadcrumb.setState({ $target, items: this.state.breadcrumbList });
    nodes.setState({
      $target,
      items: this.state.nodesList,
      isRoot: this.state.breadcrumbList.length === 1
    });
  };

  const loading = new Loading({ $target, isLoading: false });

  const renderPage = async node => {
    loading.setState({ isLoading: true });
    if (!node)
      // init
      setState({
        nodesList: await fetchNodes(),
        breadcrumbList: this.state.breadcrumbList
      });
    else {
      const curIndex = breadcrumbList.findIndex(bc => bc.id === node.id);
      if (curIndex === -1) {
        setState({
          nodesList: await fetchNodes(node.id),
          breadcrumbList: this.state.breadcrumbList.concat(node)
        });
      } else {
        setState({
          nodesList: await fetchNodes(node.id),
          breadcrumbList: this.state.breadcrumbList.slice(curIndex + 1)
        });
      }
    }

    loading.setState({ isLoading: false });
  };

  renderPage();
}
