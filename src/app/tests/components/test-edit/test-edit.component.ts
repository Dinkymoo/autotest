import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  EventEmitter,
  Output,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Test } from '../../test';
import { GenericValidator } from '../../../shared/generic-validator';
import { NumberValidators } from '../../../shared/number.validator';

@Component({
  selector: 'pm-test-edit',
  templateUrl: './test-edit.component.html',
  styleUrls: ['./test-edit.component.css']
})
export class testEditComponent implements OnInit, OnChanges, OnDestroy {
  pageTitle = 'test Edit';
  @Input() errorMessage: string;
  @Input() selectedtest: Test;
  @Output() create = new EventEmitter<Test>();
  @Output() update = new EventEmitter<Test>();
  @Output() delete = new EventEmitter<Test>();
  @Output() clearCurrent = new EventEmitter<void>();

  componentActive = true;
  testForm: FormGroup;

  test: Test | null;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      testName: {
        required: 'test name is required.',
        minlength: 'test name must be at least three characters.',
        maxlength: 'test name cannot exceed 50 characters.'
      },
      testCode: {
        required: 'test code is required.'
      },
      starRating: {
        range: 'Rate the test between 1 (lowest) and 5 (highest).'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // Define the form group
    this.testForm = this.fb.group({
      testName: ['', [Validators.required,
                         Validators.minLength(3),
                         Validators.maxLength(50)]],
      testCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      description: ''
    });

    // Watch for value changes
    this.testForm.valueChanges.subscribe(
      value => this.displayMessage = this.genericValidator.processMessages(this.testForm)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {

    // patch form with value from the store
    if (changes.selectedtest) {
      const test: any = changes.selectedtest.currentValue as Test;
      this.displaytest(test);
    }
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.testForm);
  }

  displaytest(test: Test | null): void {
    // Set the local test property
    this.test = test;

    if (this.test && this.testForm) {
      // Reset the form back to pristine
      this.testForm.reset();

      // Display the appropriate page title
      if (this.test.id === 0) {
        this.pageTitle = 'Add test';
      } else {
        this.pageTitle = `Edit test: ${this.test.testName}`;
      }

      // Update the data on the form
      this.testForm.patchValue({
        testName: this.test.testName,
        testCode: this.test.testCode,
        starRating: this.test.starRating,
        description: this.test.description
      });
    }
  }

  cancelEdit(): void {
    // Redisplay the currently selected test
    // replacing any edits made
    this.displaytest(this.test);
  }

  deletetest(): void {
    if (this.test && this.test.id) {
      if (confirm(`Really delete the test: ${this.test.testName}?`)) {
        this.delete.emit(this.test);
      }
    } else {
      // No need to delete, it was never saved
      this.clearCurrent.emit();
    }
  }

  savetest(): void {
    if (this.testForm.valid) {
      if (this.testForm.dirty) {
        // Copy over all of the original test properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const p = { ...this.test, ...this.testForm.value };

        if (p.id === 0) {
          this.create.emit(p);
        } else {
          this.update.emit(p);
        }
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

}
