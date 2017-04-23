import { Injectable } from '@angular/core';

import { ImgPart } from './img-part';

const PART_WIDTH = 10;
const PART_HEIGHT = 10;
const FADEIN_DURATION = 12;
const FADEOUT_DURATION = 36;

const MOUSE_EFFECT_RADIUS = 100;
const BACK_TO_ORIGIN_FRACTION = .9;
const MOVE_TO_MOUSE_FRACTION = 1;

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
                let canvasX = x + offsetX;
                let canvasY = y + offsetY;
                parts.push({
                    offsetX: x,
                    offsetY: y,
                    width: PART_WIDTH,
                    height: PART_HEIGHT,
                    canvasOffsetX: canvasX,
                    canvasOffsetY: canvasY,
                    canvasOriginOffsetX: canvasX,
                    canvasOriginOffsetY: canvasY,
                    vx: 0,
                    vy: 0
                });
            }
        }
        return parts;
    }

    fadeOutParts(parts: ImgPart[]): ImgPart[] {
        for (let i = 0; i < parts.length; i++) {
            let part = parts[i];
            part.life = Math.floor(Math.random() * FADEOUT_DURATION);
            part.vx = Math.floor((Math.random() - .5) * 50);
            part.vy = Math.floor((Math.random() - .5) * 30);
            part.canvasOriginOffsetX = part.canvasOriginOffsetX + part.vx / 4 * FADEOUT_DURATION;
            part.canvasOriginOffsetY = 1000;
        }
        return parts;
    }

    fadeInParts(parts: ImgPart[]): ImgPart[] {
        for (let i = 0; i < parts.length; i++) {
            let part = parts[i];
            part.birth = Math.floor(Math.random() * FADEIN_DURATION);
            part.canvasOffsetY = 1000;
            part.vx = Math.floor((Math.random() - .5) * 100);
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
        // move
        if (this.movePart(part)) animated = true;
        return animated;
    }

    movePart(part): boolean {
        let animated = false;
        let fraction: number;

        if (this.mouseX != undefined && this.distant(part.canvasOffsetX, part.canvasOffsetY, this.mouseX, this.mouseY) < MOUSE_EFFECT_RADIUS) {
            // move to target
            fraction = 1;
            let distantToMouse = this.distant(part.canvasOffsetX, part.canvasOffsetY, this.mouseX, this.mouseY);
            if (distantToMouse == 0)
                return false;
            part.vx += (this.mouseX - part.canvasOffsetX) / distantToMouse;
            part.vy += (this.mouseY - part.canvasOffsetY) / distantToMouse;
            part.vx *= fraction;
            part.vy *= fraction;
            part.canvasOffsetX += part.vx;
            part.canvasOffsetY += part.vy;
            return true;
        } else {
            // move to orgin
            fraction = .9;
            let distantToOrigin = this.distant(part.canvasOffsetX, part.canvasOffsetY, part.canvasOriginOffsetX, part.canvasOriginOffsetY);
            if (distantToOrigin == 0) {
                return false;
            } else if (distantToOrigin < 1) {
                part.canvasOffsetX = part.canvasOriginOffsetX;
                part.canvasOffsetY = part.canvasOriginOffsetY;
                return true;
            }
            part.vx += (part.canvasOriginOffsetX - part.canvasOffsetX) / distantToOrigin;
            part.vy += (part.canvasOriginOffsetY - part.canvasOffsetY) / distantToOrigin;
            part.vx *= fraction;
            part.vy *= fraction;
            part.canvasOffsetX += part.vx;
            part.canvasOffsetY += part.vy;
            return true;
        }
    }

    distant(x1: number, y1: number, x2: number, y2: number): number {
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
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