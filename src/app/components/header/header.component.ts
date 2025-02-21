import {
  Component,
  input,
  InputSignal
} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
  title: InputSignal<string> = input.required<string>();
  subTitle:  InputSignal<string | undefined> = input<string>();
}
