import { Component, input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = input.required<string>(); // why signals for string ?
  subTitle = input<string>();
}
