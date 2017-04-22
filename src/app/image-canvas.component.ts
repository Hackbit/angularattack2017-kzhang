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
        this.canvas.width = this.host.clientWidth;
        this.canvas.height = this.host.clientHeight;

        this.imageData = this.fileService.imageData;
        let img = document.createElement('img') as HTMLImageElement;
        img.onload = () => {
            this.context.drawImage(img, 0, 0);
        };
        img.src = this.imageData;
    }
}