import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { ImgCanvasComponent } from './img-canvas.component';

import { FileService } from './file.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ImgCanvasComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
