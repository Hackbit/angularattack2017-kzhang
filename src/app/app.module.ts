import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { ImageCanvasComponent } from './image-canvas.component';
import { SwitchImageButton } from './switch-image-btn.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ImageCanvasComponent,
    SwitchImageButton
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
