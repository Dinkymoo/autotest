import { Component, Input, Output, EventEmitter } from '@angular/core';
import { App } from '../../app';

@Component({
  selector: 'pm-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css']
})
export class AppListComponent {
  pageTitle = 'apps';

  @Input() errorMessage: string;
  @Input() apps: App[];
  @Input() displayCode: boolean;
  @Input() selectedapp: App;
  @Output() checked = new EventEmitter<boolean>();
  @Output() initializeNewapp = new EventEmitter<void>();
  @Output() selected = new EventEmitter<App>();

  checkChanged(value: boolean): void {
    this.checked.emit(value);
  }

  newapp(): void {
    this.initializeNewapp.emit();
  }

  appSelected(app: App): void {
    this.selected.emit(app);
  }
}
