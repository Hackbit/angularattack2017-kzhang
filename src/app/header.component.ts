import { Component, Output, EventEmitter } from '@angular/core';
import { FileService } from './file.service';

@Component({
    selector: 'my-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    title = 'Blast the image';
    subTitle = 'Roll over the image bellow to see the effect';

    @Output() onSelectImage = new EventEmitter();

    constructor(private fileService: FileService) { }

    readImage(fileInput: HTMLInputElement) {
        this.fileService.readFile(fileInput.files[0]).then(() => { this.onSelectImage.emit(); });
    }
}