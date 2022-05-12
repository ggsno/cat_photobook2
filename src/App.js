import Breadcrumb from "./Breadcrumb.js";
import Nodes from "./Nodes.js";

export default function App({ $target }) {
    new Breadcrumb({
        $target,
        initialState: {
            items: ["root", "yellow cat"]
        }
        
    }).render();
    new Nodes({ $target }).render();
}