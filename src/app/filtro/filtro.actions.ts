import { createAction, props } from '@ngrx/store';

export type FiltrosValidos = 'todos' | 'pendientes' | 'completados';

export const setFiltro = createAction(
  '[Filtro] Set Filtro',
  props<{ filtro: FiltrosValidos }>()
);

