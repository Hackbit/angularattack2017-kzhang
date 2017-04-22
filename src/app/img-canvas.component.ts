import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';

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
    imgCanvas: HTMLCanvasElement;
    imgParts: ImgPart[];

    constructor(private fileService: FileService, private imgPartService: ImgPartService) { }

    ngAfterViewInit() {
        this.canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d');
        this.redraw();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.redraw();
    }

    redraw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.width = Math.floor(this.canvas.parentElement.clientWidth);
        this.canvas.height = Math.floor(this.canvas.parentElement.clientHeight);

        this.fileService.loadImage(this.canvas.width, this.canvas.height).then((imgCanvas) => {
            this.imgCanvas = imgCanvas;
            let offsetX = (this.canvas.width - this.imgCanvas.width) >> 1;
            let offsetY = (this.canvas.height - this.imgCanvas.height) >> 1;
            this.imgParts = this.imgPartService.makeParts(this.imgCanvas.width, this.imgCanvas.height, offsetX, offsetY);
            this.draw();
        });
    }

    draw() {
        for (let i = 0; i < this.imgParts.length; i++) {

        }
    }
}