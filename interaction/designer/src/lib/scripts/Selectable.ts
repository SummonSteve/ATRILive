import { showProperties, hideProperties } from "./Properties";


let selectedNodeId: string;

function select(node: HTMLDivElement) {
    node.addEventListener('mousedown', handleMousedown);
    function handleMousedown(event) {
        if (selectedNodeId)
            document.getElementById(selectedNodeId).style.backgroundColor = "rgba(0, 0, 0, 0)";

        selectedNodeId = node.id;

        node.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
        showProperties(node.id);
    }

    return {
        destroy() {
            node.removeEventListener('mousedown', handleMousedown);
        }
    }
}

function clearSelect() {
    if (selectedNodeId) {
        document.getElementById(selectedNodeId).style.backgroundColor = "rgba(0, 0, 0, 0)";
        selectedNodeId = null;
        hideProperties();
    }
}

export { select, clearSelect }