function resize(element, getscale) {
    const right = document.createElement('div')
    right.classList.add('grabber')
    right.classList.add('right')
    
    const left = document.createElement('div')
    left.classList.add('grabber')
    left.classList.add('left')
    
    const top = document.createElement('div')
    top.classList.add('grabber')
    top.classList.add('top')
    
    const bottom = document.createElement('div')
    bottom.classList.add('grabber')
    bottom.classList.add('bottom')
    
    const topLeft = document.createElement('div')
    topLeft.classList.add('grabber')
    topLeft.classList.add('top')
    topLeft.classList.add('left')
    
    const topRight = document.createElement('div')
    topRight.classList.add('grabber')
    topRight.classList.add('top')
    topRight.classList.add('right')
    
    const bottomLeft = document.createElement('div')
    bottomLeft.classList.add('grabber')
    bottomLeft.classList.add('bottom')
    bottomLeft.classList.add('left')
    
    const bottomRight = document.createElement('div')
    bottomRight.classList.add('grabber')
    bottomRight.classList.add('bottom')
    bottomRight.classList.add('right')
            
    const grabbers = [right, left, top, bottom, topLeft, topRight, bottomLeft, bottomRight]
    
    let active = null, initialRect = null, initialPos = null
    
    grabbers.forEach(grabber => {
        element.appendChild(grabber)
        grabber.addEventListener('mousedown', onMousedown)
    })
    
    function onMousedown(event) {
        active = event.target
        const rect = element.getBoundingClientRect()
        const parent = element.parentElement.getBoundingClientRect()
        
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

        active.classList.remove('selected')
        active = null
        initialRect = null
        initialPos = null
    }
    
    function onMove(event) {
        if (!active) return;
        let scale = getscale();
        let delta = 0;

        if (active.classList.contains('right')) {
            delta = (event.pageX - initialPos.x) / scale;
            element.style.width = `${initialRect.width / scale + delta}px`				
        }
        
        if (active.classList.contains('left')) {
            delta = (initialPos.x - event.pageX) / scale;
            element.style.left = `${initialRect.left / scale - delta}px`
            element.style.width = `${initialRect.width / scale + delta}px`
        }
        
        if (active.classList.contains('top')) {
            delta = (initialPos.y - event.pageY) / scale;
            element.style.top = `${initialRect.top / scale- delta}px`
            element.style.height = `${initialRect.height / scale+ delta}px`
        }
        
        if (active.classList.contains('bottom')) {
            delta = (event.pageY - initialPos.y) / scale;
            element.style.height = `${initialRect.height / scale + delta}px`
        }
    }
    
    window.addEventListener('mousemove', onMove)	
    window.addEventListener('mouseup', onMouseup)	
    
    return {
        destroy() {
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mousemove', onMousedown)
            
            grabbers.forEach(grabber => {
                element.removeChild(grabber)
            })
        }
    }
}

export {resize};