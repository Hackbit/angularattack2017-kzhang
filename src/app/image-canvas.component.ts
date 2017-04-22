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

        this.fileService.loadImage().then((img) => {
            this.makeImageParts(img);
        });
    }

    makeImageParts(img: HTMLImageElement) {
        var maxW = Math.min(Math.floor(this.canvas.width * .9), img.width);
        var maxH = Math.min(Math.floor(this.canvas.height * .9), img.height);

        var scale = Math.min(maxW / img.width, maxH / img.height);

        var drawWidth = Math.floor(img.width * scale);
        var drawHeight = Math.floor(img.height * scale);

        var offsetX = (this.canvas.width - drawWidth) >> 1;
        var offsetY = (this.canvas.height - drawHeight) >> 1;

        this.context.drawImage(img, 0, 0, img.width, img.height, offsetX, offsetY, drawWidth, drawHeight);
    }
}