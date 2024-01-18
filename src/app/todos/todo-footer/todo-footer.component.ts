import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../app.reducer';
import { FiltrosValidos, setFiltro } from '../../filtro/filtro.actions';
import { borrarCompletados } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
})
export class TodoFooterComponent implements OnInit{

  public filtroActual: FiltrosValidos = 'todos';
  public filtros: FiltrosValidos[] = ['todos', 'completados', 'pendientes'];

  public pendientes: number = 0;

  private store:Store<AppState> = inject(Store<AppState>)

  ngOnInit(): void {

    this.store.subscribe( state => {

      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter( todo => !todo.completado ).length;

    })

  }

  cambiarFiltro(filtro: FiltrosValidos) {
    this.store.dispatch( setFiltro({ filtro }) )
  }

  borrarCompletados() {
    this.store.dispatch( borrarCompletados() )
  }

}
