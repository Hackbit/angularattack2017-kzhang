import { Component, ViewChild } from '@angular/core';
import { ImgCanvasComponent } from './img-canvas.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(ImgCanvasComponent) canvas: ImgCanvasComponent;

  onSelectImage() {
    this.canvas.redraw();
  }
}
