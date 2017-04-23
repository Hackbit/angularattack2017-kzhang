import { Injectable } from '@angular/core';

import { ImgPart } from './img-part';

const PART_WIDTH = 2;
const PART_HEIGHT = 2;
@Injectable()
export class ImgPartService {
    mouseX: number;
    mouseY: number;

    setMousePosition(x: number, y: number) {
        this.mouseX = Math.round(x);
        this.mouseY = Math.round(y);
    }

    makeParts(w: number, h: number, offsetX: number, offsetY: number): ImgPart[] {
        let parts: ImgPart[] = [];
        let columns = Math.ceil(w / PART_WIDTH);
        let rows = Math.ceil(h / PART_HEIGHT);

        for (let i = 0; i < rows; i++) {
            let y = i * PART_HEIGHT;
            for (let j = 0; j < columns; j++) {
                let x = j * PART_WIDTH;
                parts.push({
                    offsetX: x,
                    offsetY: y,
                    width: PART_WIDTH,
                    height: PART_HEIGHT,
                    canvasOffsetX: x + offsetX,
                    canvasOffsetY: y + offsetY,
                    canvasOriginOffsetX: x + offsetX,
                    canvasOriginOffsetY: y + offsetY
                });
            }
        }
        return parts;
    }

    fadeOutParts(parts: ImgPart[]): ImgPart[] {
        for (let i = 0; i < parts.length; i++) {
            parts[i].life = Math.floor(Math.random() * 12);
        }
        return parts;
    }

    fadeInParts(parts: ImgPart[]): ImgPart[] {
        for (let i = 0; i < parts.length; i++) {
            parts[i].birth = Math.floor(Math.random() * 12);
        }
        return parts;
    }

    animateParts(parts: ImgPart[]): boolean {
        let changed = false;
        for (let i = 0; i < parts.length; i++) {
            if (this.animatePart(parts[i]))
                changed = true;
        }
        return changed;
    }

    animatePart(part: ImgPart): boolean {
        let animated = false;
        // fadein
        if (part.birth != undefined && part.birth > 0) {
            part.birth--;
            if (part.birth <= 0) { // born
                animated = true;
            }
        }
        // fadeout
        if (part.life != undefined && part.life > 0) {
            part.life--;
            if (part.life <= 0) { // die
                animated = true;
            }
        }
        return animated;
    }

    isPartAlive(part: ImgPart): boolean {
        let isBorn = part.birth == undefined || part.birth <= 0;
        let isDead = part.life != undefined && part.life <= 0;
        return isBorn && !isDead;
    }

    isInsideCanvas(part: ImgPart, canvas: HTMLCanvasElement): boolean {
        return part.canvasOffsetX > 0 && part.canvasOffsetX < canvas.width
            && part.canvasOffsetY > 0 && part.canvasOffsetY < canvas.height;
    }
}