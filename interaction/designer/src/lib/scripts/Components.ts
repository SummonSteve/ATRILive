enum ComponentType{
    Object,
    Rect,
    Line,
    Ellipse,
    Image,
    Text,
}

abstract class Drawable {
    public x: number;
    public y: number;
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

    public get use_shadow() : boolean {
        return this.shadow;
    }

    public set use_shadow(value: boolean){
        this.shadow = value;
        throw new Error("Not implemented.");
    }
    

    constructor(x: number, y: number){
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
    public width: number;
    public height: number;
    constructor(x: number, y: number, h: number, w: number) {
        super(x, y);
        this.width = w;
        this.height = h;
    }

    gen_rect_component(x: number, y: number) {
        this.style = `width: ${this.width}px; height: ${this.height}px;`;
    }
}


export{ Rect, ComponentType }