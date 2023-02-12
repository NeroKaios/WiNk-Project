import {Component, Output, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SearchParams} from "../../core/models/search-params.interface";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  Observable,
  shareReplay,
  Subscription, tap,
  throttleTime
} from "rxjs";
import {Parser} from "@angular/compiler";
@Component({
  selector: 'app-books-search',
  templateUrl: './books-search.component.html',
  styleUrls: ['./books-search.component.scss'],
})
export class BooksSearchComponent{
  formGroup: FormGroup
  debouncerSub : Subscription | undefined = new Subscription()

  readOnlyState: boolean = true;

  parole : SearchParams | null = null;

  @Output() search: EventEmitter<SearchParams | null> = new EventEmitter<SearchParams | null>();
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

  onSearch(event : KeyboardEvent): void {
    console.log(event.key)
    if (this.formGroup.invalid) {
      this.searchTerm.markAsTouched()
    }
    else {
      this.debouncerSub = this.formGroup.get('searchTerm')?.valueChanges.pipe(
        debounceTime(800),
        filter(value => !!value.trim()),
        distinctUntilChanged(),
        )
        .subscribe(
          () => {
            /*this.parole = this.formGroup.get('searchTerm')!.value
            this.parole!.searchTerm.concat(event.key)
            if (!this.parole) {
              this.emettiParola()
            }*/
            if (this.formGroup.get('searchTerm')?.value.length > 0) {
              this.search.emit(this.formGroup.value)
              if (!this.debouncerSub?.closed) {
                this.cancelSub()
              }
            }
          }
        )
    }
  }
  emettiParola() :void{
    this.search.emit(this.parole)
  }
  cancelSub():void{
    this.debouncerSub?.unsubscribe();
  }
  changeNumberOfBooks():void{
    this.searchedNumberOfBooks.emit(Number((<HTMLSelectElement>document.getElementById('select')).value));
    this.readOnlyState = !this.readOnlyState
    this.searchTerm.markAsPending()
  }
}
