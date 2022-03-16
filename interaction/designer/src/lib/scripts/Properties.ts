import { writable } from 'svelte/store';

export const isShowProperties = writable(false);
export const Properties = writable([]);

let selected_node = "";

function show_properties(node_id: string) {
    let componentType = node_id.split('-')[1];
    switch (componentType) {
        case 'rect':
            Properties.set([
                {name: 'rect', value: 'rect'},
            ]);
            break;
    }
    isShowProperties.set(true);
    selected_node = node_id;
}

function hide_properties(node_id: string) {

}

function update_node(propertiesToUpdate: []) {
    let node = document.getElementById(selected_node);
    
}

export { show_properties, hide_properties, update_node };