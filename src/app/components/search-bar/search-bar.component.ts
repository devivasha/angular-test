import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  standalone: true,
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  @Input() control: any;
  @Input({ required: true }) text!: string;
  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();
  searchValue: string = '';

  onSearch(value: Event):void {
    this.searchValue = (value.target as HTMLInputElement).value;
    const target = value.target as HTMLInputElement;
    this.searchChange.emit(target?.value);
  }

  clearSearch():void {
    this.control.setValue('');
    this.searchValue = '';
    this.searchChange.emit('');
  }
}
