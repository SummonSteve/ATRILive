import { writable } from 'svelte/store';

export const isShowProperties = writable(false);
export const Properties = writable([]);

let selected_node = "";

function show_properties(node_id: string) {
    Properties.set([
        {name: 'rect', value: 'rect'},
        {name: 'rect', value: 'rect'},
        {name: 'rect', value: 'rect'},
        {name: 'rect', value: 'rect'},
        {name: 'rect', value: 'rect'},
        {name: 'rect', value: 'rect'},
        {name: 'rect', value: 'rect'},
    ]); //todo get properties from node
    isShowProperties.set(true);
    selected_node = node_id;
}

function hide_properties(node_id: string) {

}

function update_node(propertiesToUpdate: []) {
    let node = document.getElementById(selected_node);
    
}

export { show_properties, hide_properties, update_node };