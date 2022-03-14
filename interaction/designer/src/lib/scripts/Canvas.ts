import { writable } from 'svelte/store';

function mouseEvent(node: HTMLDivElement, is_placing: boolean) {
     let moving = false;
     let left = 10;
     let top = 110;

     node.style.position = 'absolute';
     node.style.top = `${top}px`;
     node.style.left = `${left}px`;
     node.style.userSelect = 'none';
     

     node.addEventListener('mousedown', (e) => {
         switch (e.button) {
                case 0:
                    break;
                case 1:
                    moving = true;
                    node.style.cursor = 'move';
                    break;
                case 2:
                    break;
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
    
     window.addEventListener('mouseup', (e) => {
        switch (e.button) {
            case 0:
                break;
            case 1:
                moving = false;
                node.style.cursor = 'default';
                break;
            case 2:
                break;
     }
     });

}

export const itemList = writable(['test']);

function addItem(item) {
    itemList.update((items) => {
        return [...items, item];
    });
}

export {mouseEvent, addItem};
