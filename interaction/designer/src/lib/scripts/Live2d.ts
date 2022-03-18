import { writable } from 'svelte/store';

class CanvasSize {
    public id: string;
    public x: number;
    public y: number;
    
    constructor(id: string, x: number, y: number) {
        this.id = id;
        this.x = x;
        this.y = y;
    }
}


export { CanvasSize }