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
        
        console.log({rect, parent})
        
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

        let childNode = document.getElementById(node.id.split('-')[0]);

        if (childNode) {
            console.log(node.style.width);
            childNode.style.width = Number(node.style.width.split('px')[0]) - 4 + 'px';
            childNode.style.height = Number(node.style.height.split('px')[0]) - 4 + 'px';
            childNode.style.width = Number(node.style.width.split('px')[0]) - 4 + 'px';
            childNode.style.height = Number(node.style.height.split('px')[0]) - 4 + 'px';

        }

        active.classList.remove('selected')
        active = null
        initialRect = null
        initialPos = null
    }
    
    function onMove(event) {
        if (!active) return

        let scale = getScale();
        let delta;
        delta = (event.pageX - initialPos.x) / scale;
        node.style.width = `${initialRect.width / scale + delta}px`;
        delta = (event.pageY - initialPos.y) / scale;
        node.style.height = `${initialRect.height / scale + delta}px`;		

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
export {resize};