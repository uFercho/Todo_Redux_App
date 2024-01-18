import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { Todo } from '../models/todo.model';
import { AppState } from '../../app.reducer';
import { FiltrosValidos } from '../../filtro/filtro.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent implements OnInit {

  public todos: Todo[] = [];
  public filtroActual: FiltrosValidos = 'todos';

  private store:Store<AppState> = inject(Store<AppState>)


  ngOnInit(): void {

    this.store.subscribe( ({ todos, filtro }) => {
      this.todos = todos;
      this.filtroActual = filtro;
    })

  }

}
