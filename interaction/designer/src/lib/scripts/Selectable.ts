import {addItem} from "./Canvas";
    

let selectedNodeId: string;

function select(node: HTMLDivElement) {
    node.addEventListener('mousedown', handleMousedown);
    function handleMousedown(event) {
        if (selectedNodeId)
            document.getElementById(selectedNodeId).style.backgroundColor = "rgba(0, 0, 0, 0)";
        
        selectedNodeId = node.id;

        node.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
    }

    return {
        destroy() {
            node.removeEventListener('mousedown', handleMousedown);
        }
    }
}

export { select }