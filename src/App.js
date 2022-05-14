import Breadcrumb from "./Breadcrumb.js";
import Nodes from "./Nodes.js";
import { fetchNodes } from "./api.js";
import Loading from "./Loading.js";
import ImageViewer from "./ImageViewer.js";

const cache = {};

export default function App({ $target }) {
  this.state = {
    breadcrumbList: [{ id: null, name: "root" }],
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
      try {
        if (node.type === "BACK") {
          this.state.breadcrumbList.pop();
          renderPage(
            this.state.breadcrumbList[this.state.breadcrumbList.length - 1]
          );
        } else if (node.type === "DIRECTORY") {
          renderPage(node);
        } else if (node.type === "FILE") {
          new ImageViewer({
            $target,
            initialState: { filePath: node.filePath }
          });
        } else {
          throw new Error("error(nodes onclick): unexpected type");
        }
      } catch (e) {
        alert(e.message);
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
    if (!node) {
      setState({
        nodesList: await fetchNodes(),
        breadcrumbList: this.state.breadcrumbList
      });
      return;
    }
    if (cache[node.id]) {
      setState({
        nodesList: cache[node.id].nodeList,
        breadcrumbList: cache[node.id].breadcrumbList
      });
    } else {
      setState({
        nodesList: await fetchNodes(node.id),
        breadcrumbList: this.state.breadcrumbList.concat(node)
      });
      cache[node.id] = {
        nodeList: this.state.nodeList,
        breadcrumbList: this.state.breadcrumbList
      };
    }
    loading.setState({ isLoading: false });
  };

  renderPage(null);
}
