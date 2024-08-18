interface ICircle {
    x: number;
    y: number;
    size: number;
    color: string;
    value: string;
}

class Circle implements ICircle {
    private _value: string;
    private _x: number;
    private _y: number;

    constructor(value: string, x: number, y: number) {
        this._value = value;
        this._x = x;
        this._y = y;
    }
    size: number;
    color: string;

    public get value(): string {
        return this._value;
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }
}