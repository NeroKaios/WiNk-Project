import {Component, Output, EventEmitter} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SearchParams} from "../../core/models/search-params.interface";
import {debounceTime, distinctUntilChanged, filter, Subscription} from "rxjs";
import {CollectionResultModel} from "../../core/models/collection-result.interface";
import {Volume} from "../../core/models/volume.interface";
@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.scss'],
})
export class BooksSearchComponent{
  formGroup: FormGroup
  debouncerSub : Subscription | undefined = new Subscription()

  readOnlyState: boolean = true;

  @Output() search: EventEmitter<SearchParams | null> = new EventEmitter<SearchParams | null>();
  @Output() bookList : EventEmitter<CollectionResultModel<Volume[]>> = new EventEmitter
  @Output() searchedNumberOfBooks : EventEmitter<number> = new EventEmitter<number>();
  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      searchTerm: new FormControl('', Validators.required),
      selectNumber : new FormControl('', Validators.required)
    });
  }

  get searchTerm(): AbstractControl {
    return this.formGroup.get('searchTerm') as AbstractControl;
  }

  get selectNumber() : AbstractControl{
    return this.formGroup.get('selectNumber') as AbstractControl;
  }

  onSearch(): void {
    if (this.formGroup.invalid) {
      this.searchTerm.markAsTouched()
    }
    else {
      this.debouncerSub = this.formGroup.get('searchTerm')?.valueChanges/*.pipe(
        debounceTime(800),
        filter(value => !!value.trim()),
        distinctUntilChanged(),
        )*/
        .subscribe(
          () => {
              this.search.emit(this.formGroup.value)
              /*if (!this.debouncerSub?.closed) {
                this.cancelSub()
              }*/
          }
        )
    }
  }
  /*cancelSub():void{
    this.debouncerSub?.unsubscribe();
  }*/
  changeNumberOfBooks():void{
    this.searchedNumberOfBooks.emit(Number((<HTMLSelectElement>document.getElementById('select')).value));
    this.readOnlyState = !this.readOnlyState
    this.searchTerm.markAsPending()
  }
}
