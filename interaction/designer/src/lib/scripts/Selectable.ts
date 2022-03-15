import {addItem} from "./Canvas";

let selectedNodeId: string;

function select(node: HTMLDivElement) {
    node.addEventListener('mousedown', handleMousedown);
    function handleMousedown(event) {
        if (selectedNodeId)
            document.getElementById(selectedNodeId).style.border = '';
        
        selectedNodeId = node.id;
        node.style.border = '3px solid red';
    }

    return {
        destroy() {
            node.removeEventListener('mousedown', handleMousedown);
        }
    }
}

export { select }