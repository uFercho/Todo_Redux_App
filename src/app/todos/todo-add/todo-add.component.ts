import { Component, inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { crear } from '../todo.actions';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
})
export class TodoAddComponent {

  txtInput: FormControl;

  private store:Store<AppState> = inject(Store<AppState>)

  constructor() {
    this.txtInput = new FormControl('', Validators.required)
  }

  agregar() {

    if ( this.txtInput.invalid ) return;

    this.store.dispatch( crear({ texto: this.txtInput.value }) )

    this.txtInput.reset();

  }

}
