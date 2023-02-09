import { Component, Output, EventEmitter } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SearchParams} from "../../core/models/search-params.interface";
@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.scss'],
})
export class BooksSearchComponent {
  formGroup: FormGroup;

  @Output() searchButtonClick: EventEmitter<SearchParams | null> =
    new EventEmitter<SearchParams | null>();

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      searchTerm: new FormControl('', Validators.required),
      category: new FormControl(''),
      orderBy: new FormControl(''),
    });
  }

  get searchTerm(): AbstractControl {
    return this.formGroup.get('searchTerm') as AbstractControl;
  }

  onSearch(): void {
    if (this.formGroup.invalid) {
      this.searchTerm.markAsTouched();
      return;
    }
    this.searchButtonClick.emit(this.formGroup.value);
  }
}
