import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Test } from '../../test';

@Component({
  selector: 'pm-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent {
  pageTitle = 'tests';

  @Input() errorMessage: string;
  @Input() tests: Test[];
  @Input() displayCode: boolean;
  @Input() selectedtest: Test;
  @Output() checked = new EventEmitter<boolean>();
  @Output() initializeNewtest = new EventEmitter<void>();
  @Output() selected = new EventEmitter<Test>();

  checkChanged(value: boolean): void {
    this.checked.emit(value);
  }

  newtest(): void {
    this.initializeNewtest.emit();
  }

  testSelected(test: Test): void {
    this.selected.emit(test);
  }
}
