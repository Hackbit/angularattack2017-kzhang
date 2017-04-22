import { Injectable } from '@angular/core';

@Injectable()
export class FileService {
    imageData: string;

    readImage(imageFile: File): Promise<any> {
        return new Promise(function (resolve, reject) {
            let fileReader: FileReader = new FileReader();
            fileReader.onload = function () {
                resolve(fileReader.result);
            };
            fileReader.readAsDataURL(imageFile);
        }).then((data: string) => { this.imageData = data; });
    }
}