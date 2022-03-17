import { spring } from 'svelte/motion'

let useGrid = false;
let useBoarder = true;
let dropTarget: Element;

function toggleCanvasGrid() {
    let node = document.getElementById('root');
    if (useGrid) {
        node.style.backgroundImage = "none";
    } else {
        node.style.backgroundImage = "repeating-linear-gradient(#ccc 0 1px, transparent 1px 100%), repeating-linear-gradient(90deg, #ccc 0 1px, transparent 1px 100%)";
    }
    useGrid = !useGrid;
}

function toggleBoarder() {
    let node = document.getElementById('root');
    if (useBoarder) {
        node.style.border = "none";
    } else {
        node.style.border = "1px dashed rgb(0, 0, 0)";
    }
    useBoarder = !useBoarder;
}

function draggable(node, getscale) {
    let id = node.id;
    let parentNode = document.getElementById(`${id}-handle`);
    let scale: number;
    let lastX: number;
    let lastY: number;
    let startRect: any;
    let offsetX = 0;
    let offsetY = 0;
    const offset = spring({ x: offsetX, y: offsetY }, {
        stiffness: 1,
        damping: 1,
    });

    offset.subscribe(offset => {
        if (useGrid) {
            let _left = offset.x % 20 == 0 ? offset.x : offset.x - offset.x % 20 + 'px';
            let _top = offset.y % 20 == 0 ? offset.y : offset.y - offset.y % 20 + 'px';
            parentNode.style.left = _left.toString();
            parentNode.style.top = _top.toString();
        } else {
            let _left = offset.x + 'px';
            let _top = offset.y + 'px';
            parentNode.style.left = _left.toString();
            parentNode.style.top = _top.toString();
        }

    })

    node.addEventListener('mousedown', handleMousedown);

    function handleMousedown(event) {
        if (event.button === 1) return; // ignore middle click which is handled by canvas
        event.preventDefault()
        lastX = event.clientX;
        lastY = event.clientY;
        if (!startRect) startRect = node.getBoundingClientRect();
        node.classList.add('dragged')

        node.dispatchEvent(new CustomEvent('dragstart', {
            detail: { lastX, lastY }
        }));

        window.addEventListener('mousemove', handleMousemove);
        window.addEventListener('mouseup', handleMouseup);
    }

    function handleMousemove(event) {
        const dx = event.clientX - lastX;
        const dy = event.clientY - lastY;

        scale = getscale();

        offsetX += dx / scale;
        offsetY += dy / scale;
        lastX = event.clientX;
        lastY = event.clientY;
        const rect = node.getBoundingClientRect();
        const midX = rect.x + rect.width / 2;
        const midY = rect.y + rect.height / 2;

        if (dropTarget) dropTarget.classList.remove('droptarget')

        dropTarget = null
        const candidate = document.elementFromPoint(midX, midY);

        if (dropTarget) dropTarget.classList.add('droptarget')
        offset.set({ x: offsetX + dx, y: offsetY })

        node.dispatchEvent(new CustomEvent('drag', {
            detail: { lastX, lastY, dx, dy }
        }))
    }

    function handleMouseup(event) {

        node.classList.remove('dragged')
        lastX = event.clientX;
        lastY = event.clientY;

        offset.set({ x: offsetX, y: offsetY })

        node.dispatchEvent(new CustomEvent('dragend', {
            detail: { dropTarget, lastX, lastY }
        }));
        if (dropTarget) {
            dropTarget.dispatchEvent(new CustomEvent('dropped', {
                
            }))
        }
        dropTarget = null

        window.removeEventListener('mousemove', handleMousemove);
        window.removeEventListener('mouseup', handleMouseup);
    }

    return {
        destroy() {
            node.removeEventListener('mousedown', handleMousedown);
        }
    }
}

export {draggable, toggleCanvasGrid, toggleBoarder};