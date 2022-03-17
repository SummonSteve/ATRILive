import { writable } from 'svelte/store';
import { Component } from './Components';

const ComponentsList = writable(JSON);

function addComponent(k, obj, prop) {
    ComponentsList.update((items) => {
        let item = new Component(k, obj, prop);
        items[k] = item;
        return items;
    });
}


export { addComponent, ComponentsList };