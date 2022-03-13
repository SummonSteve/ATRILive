import { spring } from 'svelte/motion'
import { crossfade } from 'svelte/transition'
import { quintOut, elasticOut } from 'svelte/easing'

let useGrid = false;
let canGrag = false;
let dropTarget: Element;

function toogleGrid() {
    useGrid = !useGrid;
}

function draggable(node) {

    let lastX: number;
    let lastY: number;
    let startRect: any;
    let offsetX = 0
    let offsetY = 0
    const offset = spring({ x: offsetX, y: offsetY }, {
        stiffness: 1,
        damping: 1,
    });

    offset.subscribe(offset => {
        if (useGrid) {
            node.style.left = offset.x % 20 == 0 ? offset.x : offset.x - offset.x % 20 + 'px';
            node.style.top = offset.y % 20 == 0 ? offset.y : offset.y - offset.y % 20 + 'px';
        } else {
            node.style.left = offset.x + 'px';
            node.style.top = offset.y + 'px';
        }

    })

    node.addEventListener('mousedown', handleMousedown);

    function handleMousedown(event) {
        if (!canGrag){
            canGrag = true;
            node.style.border = '1px solid red';
            return;
        }
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

        offsetX += dx
        offsetY += dy
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

export {draggable, toogleGrid};