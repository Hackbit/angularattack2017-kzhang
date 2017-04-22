import { Component } from '@angular/core';

import { FileService } from './file.service';

@Component({
    selector: 'my-image-canvas',
    template: `
        <img src="{{imageData}}">
    `
})
export class ImageCanvasComponent {
    imageData: string = '';

    constructor(private fileService: FileService) { }

    redraw() {
        this.imageData = this.fileService.imageData;
    }
}