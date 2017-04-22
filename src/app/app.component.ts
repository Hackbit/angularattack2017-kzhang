import { Component, ViewChild } from '@angular/core';
import { ImageCanvasComponent } from './image-canvas.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(ImageCanvasComponent) canvas: ImageCanvasComponent;

  onSelectImage() {
    this.canvas.redraw();
  }
}
