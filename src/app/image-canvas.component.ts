import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';

import { FileService } from './file.service';

@Component({
    selector: 'my-image-canvas',
    template: `
        <canvas #canvas></canvas>
    `,
    styles: [`
        canvas {
            display: block;
        }
    `]
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

        let img = document.createElement('img') as HTMLImageElement;
        img.onload = () => {
            this.context.drawImage(img, 0, 0);
        };
        img.src = this.fileService.imageData;
    }
}