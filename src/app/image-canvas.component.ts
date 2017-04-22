import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { FileService } from './file.service';

@Component({
    selector: 'my-image-canvas',
    template: `
        <canvas #canvas></canvas>
    `
})
export class ImageCanvasComponent implements AfterViewInit {
    @ViewChild('canvas') canvasRef: ElementRef;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    host: HTMLElement;
    imageData: string;

    constructor(private fileService: FileService, private hostRef: ElementRef) { }

    ngAfterViewInit() {
        this.canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d');
        this.host = this.hostRef.nativeElement as HTMLElement;
        this.redraw();
    }

    redraw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.canvas.width = Math.floor(this.host.clientWidth);
        this.canvas.style.width = this.canvas.width + 'px';
        this.canvas.height = Math.floor(this.host.clientHeight);
        this.canvas.style.height = this.canvas.height + 'px';

        this.imageData = this.fileService.imageData;
        let img = document.createElement('img') as HTMLImageElement;
        img.onload = () => {
            this.context.drawImage(img, 0, 0);
        };
        img.src = this.imageData;
    }
}