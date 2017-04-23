import { Injectable } from '@angular/core';

import { ImgPart } from './img-part';

const PART_WIDTH = 2;
const PART_HEIGHT = 2;
@Injectable()
export class ImgPartService {
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
                    canvasOffsetY: y + offsetY
                });
            }
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
        return animated;
    }

    isPartVisible(part: ImgPart): boolean {
        return !(part.birth != undefined && part.birth > 0);
    }
}