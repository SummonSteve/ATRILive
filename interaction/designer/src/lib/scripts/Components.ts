enum ComponentType{
    Object,
    Rect,
    Line,
    Ellipse,
    Image,
    Text,
    CubismLive2d,
}

abstract class Drawable {
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

    public get use_shadow() : boolean {
        return this.shadow;
    }

    public set use_shadow(value: boolean){
        this.shadow = value;
        this.style += "box-shadow: 4px 4px 4px rgba(0,0,0,0.2);";
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
    
    constructor(x: number, y: number, h: number, w: number) {
        super(x, y);
        this.width = w;
        this.height = h;
        this.style = `transform: translate(2px,2px); width: ${this.width}px; height: ${this.height}px; position: absolute; display: inline-block; background: rgba(255, 65, 65, 0.5);`;
    }
}


export{ Rect, ComponentType }