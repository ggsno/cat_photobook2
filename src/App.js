import Breadcrumb from "./Breadcrumb.js";
import Nodes from "./Nodes.js";
import { fetchNodes } from "./api.js";
import Loading from "./Loading.js";

export default function App({ $target }) {
  this.state = {
    breadcrumbList: ["root"],
    nodesList: []
  };

  this.render = () => {
    breadcrumb.setState({ $target, items: this.state.breadcrumbList });
    nodes.setState({
      $target,
      items: this.state.nodesList,
      isRoot: this.state.breadcrumbList.length === 1
    });
  };

  const setState = nextState => {
    this.state = { ...this.state, ...nextState };
    this.render();
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
    onClick: e => {
      console.log(e.currentTarget.id);
      console.log(document.getElementById(`${e.currentTarget.id}`));
      setState({ breadcrumbList: breadcrumbList.concat() });
    }
  });

  const loading = new Loading({ $target, initialState: { isLoading: true } });
  loading.render();

  const fetchAPI = async () => {
    loading.setState({ isLoading: true });
    setState({ nodesList: await fetchNodes() });
    loading.setState({ isLoading: false });
  };

  fetchAPI();
}
