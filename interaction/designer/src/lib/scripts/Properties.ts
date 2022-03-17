import { writable } from 'svelte/store';
import { ComponentsList } from './Global';

export const isShowProperties = writable(false);
export const Properties = writable([]);

let selected_node = "";

let components: JSON;

ComponentsList.subscribe(obj => {
    components = obj;
});

function showProperties(node_id: string) {
    let properties = components[node_id.split('-')[0]].properties;
    
    Properties.set(properties);
    isShowProperties.set(true);
    selected_node = node_id;
}


function hideProperties() {
    Properties.set([]);
}

function update_node(propertiesToUpdate: []) {
    let node = document.getElementById(selected_node);
    
}

export { showProperties, hideProperties, update_node };