import {
  Component,
  EventEmitter,
  Input,
  Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NzInputDirective, NzInputGroupComponent } from 'ng-zorro-antd/input';
import { NzIconDirective } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-search-bar',
  imports: [
    NzInputGroupComponent,
    NzInputDirective,
    NzIconDirective,
    ReactiveFormsModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Input() control: any = {};
  @Input({ required: true }) text!: string;
  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();


  onSearch(value: Event): void {
    const target = value.target as HTMLInputElement;
    this.searchChange.emit(target?.value);
  }

  clearSearch(): void {
    this.control.setValue('');
    this.searchChange.emit('');
  }
}
