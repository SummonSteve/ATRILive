
function handledrag(node: HTMLDivElement) {
     let moving = false;
     let left = 10;
     let top = 110;

     node.style.position = 'absolute';
     node.style.top = `${top}px`;
     node.style.left = `${left}px`;
     node.style.userSelect = 'none';
     

     node.addEventListener('mousedown', (e) => {
         if(e.button === 1) {
             moving = true;
             node.style.cursor = 'move';
         }
     });
     
    window.addEventListener('mousemove', (e) => {
          if (moving) {
                 left += e.movementX;
                 top += e.movementY;
                 node.style.top = `${top}px`;
                 node.style.left = `${left}px`;
            }
     });
    
     window.addEventListener('mouseup', () => {
         moving = false;
         node.style.cursor = 'default';
     });

}

let itemList = ["test"];

function addItem(item) {
    itemList.push(item);
}

export {handledrag, addItem, itemList};
