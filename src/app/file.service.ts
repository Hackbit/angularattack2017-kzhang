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

    loadImage(containerWidth: number, containerHeight: number): Promise<HTMLCanvasElement> {
        return new Promise((resolve, reject) => {
            let img = document.createElement('img') as HTMLImageElement;
            img.onload = () => {
                resolve(img);
            };
            img.src = this.imageData;
        }).then((img: HTMLImageElement) => {
            let maxW = Math.min(Math.floor(containerWidth * .9), img.width);
            let maxH = Math.min(Math.floor(containerHeight * .9), img.height);

            let scale = Math.min(maxW / img.width, maxH / img.height);

            let drawWidth = Math.floor(img.width * scale);
            let drawHeight = Math.floor(img.height * scale);

            let imgCanvas = document.createElement('canvas');
            imgCanvas.width = drawWidth;
            imgCanvas.height = drawHeight;
            let imgContext = imgCanvas.getContext('2d');
            imgContext.drawImage(img, 0, 0, img.width, img.height, 0, 0, drawWidth, drawHeight);

            return imgCanvas;
        });
    }
}