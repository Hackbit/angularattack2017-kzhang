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
}