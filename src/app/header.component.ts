import { Component } from '@angular/core';

@Component({
    selector: 'my-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    title = 'Blast the image';
    subTitle = 'Roll over the image bellow to see the effect'
}