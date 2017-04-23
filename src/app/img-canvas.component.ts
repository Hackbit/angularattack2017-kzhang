import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

import { FileService } from './file.service';
import { ImgPartService } from './img-part.service';
import { ImgPart } from './img-part';

@Component({
    selector: 'my-img-canvas',
    templateUrl: './img-canvas.component.html',
    styleUrls: ['./img-canvas.component.css'],
    providers: [ImgPartService]
})
export class ImgCanvasComponent implements AfterViewInit {
    @ViewChild('canvas') canvasRef: ElementRef;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    shadowCanvas: HTMLCanvasElement;
    shadowContext: CanvasRenderingContext2D;
    imgCanvas: HTMLCanvasElement;
    _imgParts: ImgPart[];

    set imgParts(value: ImgPart[]) {
        this._imgParts = value;
        this._isDirty = true;
    }

    get imgParts(): ImgPart[] {
        return this._imgParts;
    }

    resizeSubject = new Subject<string>()

    constructor(private fileService: FileService, private imgPartService: ImgPartService) { }

    imgChangeHandler() {
        this.fadeOutOldImg();
    }

    fadeInNewImg() {
        this.loadImg().then(() => {
            this.imgParts = this.imgPartService.fadeInParts(this.makeParts());
        });
    }

    fadeOutOldImg() {
        this.imgParts = this.imgPartService.fadeOutParts(this.imgParts);
    }

    ngAfterViewInit() {
        this.canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d');
        this.shadowCanvas = document.createElement('canvas');
        this.shadowContext = this.shadowCanvas.getContext('2d');

        this.resetCanvasSize();
        this.fadeInNewImg();
        this.startAnimation();

        this.resizeSubject.debounceTime(300).subscribe(() => {
            this.resetCanvasSize();
            this.fadeInNewImg();
        });
    }

    startAnimation() {
        window.requestAnimationFrame(() => {
            if (this.isDirty()) {
                this.draw();
            }
            this.startAnimation();
        });
    }

    private _isDirty = false;

    isDirty() {
        if (!this.imgParts) return false;
        let result = false;
        if (this._isDirty) {
            this._isDirty = false;
            result = true;
        }
        if (this.imgPartService.animateParts(this.imgParts)) {
            result = true;
        }
        return result;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.resizeSubject.next('resize');
    }

    @HostListener('window:mousemove', ['$event'])
    onMouseMove(event) {
        let rect = this.canvas.getBoundingClientRect();
        this.imgPartService.setMousePosition(event.offsetX - rect.left, event.offsetY - rect.top);
    }

    resetCanvasSize() {
        this.shadowCanvas.width = this.canvas.width = Math.floor(this.canvas.parentElement.clientWidth);
        this.shadowCanvas.height = this.canvas.height = Math.floor(this.canvas.parentElement.clientHeight);
    }

    makeParts() {
        let offsetX = (this.canvas.width - this.imgCanvas.width) >> 1;
        let offsetY = (this.canvas.height - this.imgCanvas.height) >> 1;
        return this.imgPartService.makeParts(this.imgCanvas.width, this.imgCanvas.height, offsetX, offsetY);
    }

    loadImg(): Promise<any> {
        return this.fileService.loadImage(this.canvas.width, this.canvas.height).then((imgCanvas) => {
            this.imgCanvas = imgCanvas;
        });
    }

    draw() {
        this.shadowContext.fillStyle = '#fff';
        this.shadowContext.fillRect(0, 0, this.shadowCanvas.width, this.shadowCanvas.height);
        let partsAllDead = true;
        for (let i = 0; i < this.imgParts.length; i++) {
            let part = this.imgParts[i];
            if (this.imgPartService.isPartAlive(part)) {
                partsAllDead = false;
                if (this.imgPartService.isInsideCanvas(part, this.canvas)) {
                    this.shadowContext.drawImage(this.imgCanvas, part.offsetX, part.offsetY, part.width, part.height, part.canvasOffsetX, part.canvasOffsetY, part.width, part.height);
                }
            }
        }
        if (partsAllDead) {
            this.fadeInNewImg();
        }
        this.context.drawImage(this.shadowCanvas, 0, 0);
    }
}