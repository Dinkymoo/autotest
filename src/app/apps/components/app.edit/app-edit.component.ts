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

import { App } from '../../app';
import { GenericValidator } from '../../../shared/generic-validator';
import { NumberValidators } from '../../../shared/number.validator';

@Component({
  selector: 'pm-app-edit',
  templateUrl: './app-edit.component.html',
  styleUrls: ['./app-edit.component.css']
})
export class AppEditComponent implements OnInit, OnChanges, OnDestroy {
  pageTitle = 'app Edit';
  @Input() errorMessage: string;
  @Input() selectedapp: App;
  @Output() create = new EventEmitter<App>();
  @Output() update = new EventEmitter<App>();
  @Output() delete = new EventEmitter<App>();
  @Output() clearCurrent = new EventEmitter<void>();

  componentActive = true;
  appForm: FormGroup;

  app: App | null;

  // Use with the generic validation message class
  displayMessage: { [key: string]: string } = {};
  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  constructor(private fb: FormBuilder) {
    // Defines all of the validation messages for the form.
    // These could instead be retrieved from a file or database.
    this.validationMessages = {
      appName: {
        required: 'app name is required.',
        minlength: 'app name must be at least three characters.',
        maxlength: 'app name cannot exceed 50 characters.'
      },
      appCode: {
        required: 'app code is required.'
      },
      starRating: {
        range: 'Rate the app between 1 (lowest) and 5 (highest).'
      }
    };

    // Define an instance of the validator for use with this form,
    // passing in this form's set of validation messages.
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    // Define the form group
    this.appForm = this.fb.group({
      appName: ['', [Validators.required,
                         Validators.minLength(3),
                         Validators.maxLength(50)]],
      appCode: ['', Validators.required],
      starRating: ['', NumberValidators.range(1, 5)],
      description: ''
    });

    // Watch for value changes
    this.appForm.valueChanges.subscribe(
      value => this.displayMessage = this.genericValidator.processMessages(this.appForm)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {

    // patch form with value from the store
    if (changes.selectedapp) {
      const app: any = changes.selectedapp.currentValue as App;
      this.displayapp(app);
    }
  }

  ngOnDestroy(): void {
    this.componentActive = false;
  }

  // Also validate on blur
  // Helpful if the user tabs through required fields
  blur(): void {
    this.displayMessage = this.genericValidator.processMessages(this.appForm);
  }

  displayapp(app: App | null): void {
    // Set the local app property
    this.app = app;

    if (this.app && this.appForm) {
      // Reset the form back to pristine
      this.appForm.reset();

      // Display the appropriate page title
      if (this.app.id === 0) {
        this.pageTitle = 'Add app';
      } else {
        this.pageTitle = `Edit app: ${this.app.appName}`;
      }

      // Update the data on the form
      this.appForm.patchValue({
        appName: this.app.appName,
        appCode: this.app.appCode,
        starRating: this.app.starRating,
        description: this.app.description
      });
    }
  }

  cancelEdit(): void {
    // Redisplay the currently selected app
    // replacing any edits made
    this.displayapp(this.app);
  }

  deleteapp(): void {
    if (this.app && this.app.id) {
      if (confirm(`Really delete the app: ${this.app.appName}?`)) {
        this.delete.emit(this.app);
      }
    } else {
      // No need to delete, it was never saved
      this.clearCurrent.emit();
    }
  }

  saveapp(): void {
    if (this.appForm.valid) {
      if (this.appForm.dirty) {
        // Copy over all of the original app properties
        // Then copy over the values from the form
        // This ensures values not on the form, such as the Id, are retained
        const p = { ...this.app, ...this.appForm.value };

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
