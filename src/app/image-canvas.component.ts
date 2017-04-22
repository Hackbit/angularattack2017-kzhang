import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';

import { FileService } from './file.service';

@Component({
    selector: 'my-image-canvas',
    templateUrl: './image-canvas.component.html',
    styleUrls: ['./image-canvas.component.css']
})
export class ImageCanvasComponent implements AfterViewInit {
    @ViewChild('canvas') canvasRef: ElementRef;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    imgCanvas: HTMLCanvasElement;

    constructor(private fileService: FileService) { }

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
            this.makeImageParts();
        });
    }

    makeImageParts() {
        let offsetX = (this.canvas.width - this.imgCanvas.width) >> 1;
        let offsetY = (this.canvas.height - this.imgCanvas.height) >> 1;
        this.context.drawImage(this.imgCanvas, 0, 0, this.imgCanvas.width, this.imgCanvas.height, offsetX, offsetY, this.imgCanvas.width, this.imgCanvas.height);
    }
}