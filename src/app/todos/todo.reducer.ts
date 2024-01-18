import { createReducer, on } from '@ngrx/store';
import { borrar, borrarCompletados, crear, editar, toggle, toggleAll } from './todo.actions';
import { Todo } from './models/todo.model';

export const initialState:Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Vencer a Thanos'),
  new Todo('Comprar traje de Iroman'),
  new Todo('Robar escudo de Capitan America'),
];

export const todoReducer = createReducer(
  initialState,
  on(borrarCompletados, state => state.filter( todo => !todo.completado ) ),
  on(crear, (state, { texto }) => [...state, new Todo( texto ) ] ),
  on(toggle, (state, { id }) => {
    return state.map( todo => {
      if ( todo.id === id ) {
        return {
          ...todo,
          completado: !todo.completado
        }
      } else {
        return todo
      }
    })
  }),
  on(toggleAll, (state, { completado }) => state.map( todo => {
    return {
      ...todo,
      completado: completado
    }
  })),
  on(editar, (state, { id, texto }) => {
    return state.map( todo => {
      if ( todo.id === id ) {
        return {
          ...todo,
          texto: texto
        }
      } else {
        return todo
      }
    })
  }),
  on(borrar, (state, { id }) => {
    return state.filter( todo => todo.id !== id )
  }),
);
