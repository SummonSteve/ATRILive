import { addComponent } from "./Global";
import { CanvasSize } from "./Live2d";

enum ComponentType {
    Object,
    Rect,
    Line,
    Ellipse,
    Image,
    Text,
    Live2d,
    CollisionRect,
}

class Component {
    public id: string;
    public obj: Drawable;
    public properties: Array<JSON>;

    constructor(id: string, obj: Drawable, properties: Array<JSON>) {
        this.id = id;
        this.obj = obj;
        this.properties = properties;
    }
}

abstract class Drawable {
    public type: ComponentType;
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public id: string;
    public name: string;
    public parent: Drawable;
    public children: Drawable[];
    public properties: any;
    public style: string;
    public isSelected: boolean;
    public isDraggable: boolean;
    public isResizable: boolean;
    public isSelectable: boolean;
    public isDeletable: boolean;
    public isMovable: boolean;
    public isEditable: boolean;
    public isVisible: boolean;
    public isLocked: boolean;
    public shadow: boolean;
    public animatorQueue: Animation[];

    public get use_shadow(): boolean {
        return this.shadow;
    }

    public set use_shadow(value: boolean) {
        this.shadow = value;
        this.style += "box-shadow: 4px 4px 4px rgba(0,0,0,0.2);";
    }


    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.id = Math.random().toString(36).substring(2, 15);
        this.name = '';
        this.parent = null;
        this.children = [];
        this.properties = {};
        this.style = '';
        this.isSelected = true;
        this.isDraggable = true;
        this.isResizable = true;
        this.isSelectable = true;
        this.isDeletable = true;
        this.isMovable = true;
        this.isEditable = true;
        this.isVisible = true;
        this.isLocked = false;
    }

    //abstract gen_component(x: number, y: number);
}

class Rect extends Drawable {

    public color: string;

    constructor(x: number, y: number, h: number, w: number) {
        super(x, y);
        this.type = ComponentType.Rect;
        this.width = w;
        this.height = h;
        this.color = 'ff3841';
        this.style = `transform: translate(2px,2px); width: ${this.width}px; height: ${this.height}px; position: absolute; display: inline-block; background: rgba(255, 65, 65, 0.5);`;

        let properties = [
            { 'name': 'x', 'value': this.x },
            { 'name': 'y', 'value': this.y },
            { 'name': 'width', 'value': this.width },
            { 'name': 'height', 'value': this.height },
            { 'name': 'color', 'value': this.color },
        ];
        addComponent(this.id, this, properties);
    }
}

class Live2d extends Drawable {
    
    public size: CanvasSize;

    constructor(x: number, y: number, h: number, w: number) {
        super(x, y);
        this.type = ComponentType.Live2d;
        this.width = w;
        this.height = h;
        this.size = new CanvasSize(this.id, this.width, this.height);

        let properties = [
            { 'name': 'X', 'value': this.x },
            { 'name': 'Y', 'value': this.y },
            { 'name': 'Width', 'value': this.width },
            { 'name': 'Height', 'value': this.height },
        ];
        
        addComponent(this.id, this, properties);
    }
}

class Line extends Drawable {

    public color: string;

    constructor(x: number, y: number, l: number) {
        super(x, y);
        this.id += '-line';
        this.width = l;
        this.height = 1;
        this.style = `transform: translate(2px,2px); width: ${this.width}px; height: ${this.height}px; position: absolute; display: inline-block; background: rgba(255, 65, 65, 0.5);`;
    }
}

class CollisionRect extends Rect {

}

export { Rect, Live2d, ComponentType, Component }
