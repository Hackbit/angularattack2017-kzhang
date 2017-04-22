import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <my-header></my-header>
    <my-image-canvas></my-image-canvas>
    <my-switch-image-btn></my-switch-image-btn>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
