import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { ImageCanvasComponent } from './image-canvas.component';

import { FileService } from './file.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ImageCanvasComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
