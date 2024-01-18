import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl, Validators } from '@angular/forms';

import { Todo } from '../models/todo.model';
import { AppState } from '../../app.reducer';
import { borrar, editar, toggle } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent implements OnInit, AfterViewChecked {

  @Input() todo!: Todo;

  private store:Store<AppState> = inject(Store<AppState>)

  @ViewChild('inputFisico') txtInputFisico!: ElementRef;

  public checkCompletado: FormControl = new FormControl( false );
  public txtInput: FormControl = new FormControl( '', Validators.required );

  public editando: boolean = false;

  ngOnInit(): void {
    this.checkCompletado.setValue( this.todo.completado );

    this.checkCompletado.valueChanges
      .subscribe( valor => {
        this.store.dispatch( toggle({ id: this.todo.id }) )
      })

    this.txtInput.setValue( this.todo.texto );
  }

  editar() {
    this.editando = true;
    this.txtInput.setValue( this.todo.texto )
  }

  ngAfterViewChecked(){
    if ( this.editando ) this.txtInputFisico.nativeElement.select();
  }

  terminarEdicion() {
    this.editando = false;

    if ( this.txtInput.invalid ) return
    if ( this.txtInput.value === this.todo.texto ) return

    this.store.dispatch(
      editar({
        id: this.todo.id,
        texto: this.txtInput.value,
      })
    )
  }

  borrar() {
    this.store.dispatch( borrar({ id: this.todo.id }) )
  }

}
