import { Injectable } from '@angular/core';

@Injectable()
export class FileService {
    imageData: string = 'assets/default.png';

    readFile(imageFile: File): Promise<any> {
        return new Promise((resolve, reject) => {
            let fileReader: FileReader = new FileReader();
            fileReader.onload = function () {
                resolve(fileReader.result);
            };
            fileReader.readAsDataURL(imageFile);
        }).then((data: string) => { this.imageData = data; });
    }

    loadImage(): Promise<any> {
        return new Promise((resolve, reject) => {
            let img = document.createElement('img') as HTMLImageElement;
            img.onload = () => {
                resolve(img);
            };
            img.src = this.imageData;
        });
    }
}