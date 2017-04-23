export class ImgPart {
    offsetX: number;
    offsetY: number;
    width: number;
    height: number;
    canvasOriginOffsetX: number;
    canvasOriginOffsetY: number;
    canvasOffsetX: number;
    canvasOffsetY: number;

    vx: number;
    vy: number;

    // fadeout
    life?: number;
    // fadein
    birth?: number;
}