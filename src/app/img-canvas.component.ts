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
    imgParts: ImgPart[] = [];
    resizeSubject = new Subject<string>()

    constructor(private fileService: FileService, private imgPartService: ImgPartService) { }

    imgChangeHandler() {
        this.loadImg();
    }

    ngAfterViewInit() {
        this.canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d');
        this.shadowCanvas = document.createElement('canvas');
        this.shadowContext = this.shadowCanvas.getContext('2d');

        this.resetCanvasSize();
        this.imgChangeHandler();
        this.startAnimation();

        this.resizeSubject.debounceTime(300).subscribe(() => {
            this.resetCanvasSize();
            this.loadImg();
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

    isDirty() {
        return true;
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.resizeSubject.next('resize');
    }

    resetCanvasSize() {
        this.shadowCanvas.width = this.canvas.width = Math.floor(this.canvas.parentElement.clientWidth);
        this.shadowCanvas.height = this.canvas.height = Math.floor(this.canvas.parentElement.clientHeight);
    }

    loadImg(): Promise<any> {
        return this.fileService.loadImage(this.canvas.width, this.canvas.height).then((imgCanvas) => {
            this.imgCanvas = imgCanvas;
            let offsetX = (this.canvas.width - this.imgCanvas.width) >> 1;
            let offsetY = (this.canvas.height - this.imgCanvas.height) >> 1;
            this.imgParts = this.imgPartService.makeParts(this.imgCanvas.width, this.imgCanvas.height, offsetX, offsetY);
        });
    }

    draw() {
        this.shadowContext.fillStyle = '#fff';
        this.shadowContext.fillRect(0, 0, this.shadowCanvas.width, this.shadowCanvas.height);
        for (let i = 0; i < this.imgParts.length; i++) {
            let part = this.imgParts[i];
            this.shadowContext.drawImage(this.imgCanvas, part.offsetX, part.offsetY, part.width, part.height, part.canvasOffsetX, part.canvasOffsetY, part.width, part.height);
        }
        this.context.drawImage(this.shadowCanvas, 0, 0);
    }
}