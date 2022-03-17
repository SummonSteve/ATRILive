import { ComponentsList } from "./Global";
import { showProperties } from "./Properties";

let useGrid = false;

function toggleDragGrid() {
    useGrid = !useGrid;
}

function resize(node, getScale) {

    const bottomRight = document.createElement('div')
    bottomRight.classList.add('grabber')
    bottomRight.classList.add('bottom-right')

    let active = null, initialRect = null, initialPos = null

    node.appendChild(bottomRight)
    bottomRight.addEventListener('mousedown', onMousedown)


    function onMousedown(event) {
        active = event.target
        const rect = node.getBoundingClientRect()
        const parent = node.parentElement.getBoundingClientRect()

        initialRect = {
            width: rect.width,
            height: rect.height,
            left: rect.left - parent.left,
            right: parent.right - rect.right,
            top: rect.top - parent.top,
            bottom: parent.bottom - rect.bottom
        }
        initialPos = { x: event.pageX, y: event.pageY }
        active.classList.add('selected')
    }

    function onMouseup(event) {
        if (!active) return

        let scale = getScale()

        let childNode = document.getElementById(node.id.split('-')[0]);

        if (childNode) {
            childNode.style.width = Number(node.style.width.split('px')[0]) - 4 + 'px';
            childNode.style.height = Number(node.style.height.split('px')[0]) - 4 + 'px';
            childNode.style.width = Number(node.style.width.split('px')[0]) - 4 + 'px';
            childNode.style.height = Number(node.style.height.split('px')[0]) - 4 + 'px';

        }
        ComponentsList.update((components) => {
            let component = components[node.id.split('-')[0]];
            component.obj.width = Number(node.style.width.split('px')[0]) - 4;
            component.obj.height = Number(node.style.height.split('px')[0]) - 4;
            components[node.id.split('-')[0]] = component;

            component.properties[2].value = Math.ceil(Number(node.style.width.split('px')[0]) - 4);
            component.properties[3].value = Math.ceil(Number(node.style.height.split('px')[0]) - 4);

            return components;
        });

        showProperties(node.id.split('-')[0]);

        active.classList.remove('selected')
        active = null
        initialRect = null
        initialPos = null

    }

    function onMove(event) {
        if (!active) return

        let scale = getScale()

        let deltaX: number;
        let deltaY: number;

        deltaX = (event.pageX - initialPos.x) / scale;
        deltaY = (event.pageY - initialPos.y) / scale;

        if (useGrid) {
            deltaX = deltaX % 20 == 0 ? deltaX : deltaX - deltaX % 20;
            deltaY = deltaY % 20 == 0 ? deltaY : deltaY - deltaY % 20;
        }

        node.style.width = `${initialRect.width / scale + deltaX}px`;
        node.style.height = `${initialRect.height / scale + deltaY}px`;

    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onMouseup)

    return {
        destroy() {
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mousemove', onMousedown)
            node.removeChild(bottomRight)
        }
    }
}
export { resize, toggleDragGrid };
