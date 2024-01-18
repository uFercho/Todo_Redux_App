import { createReducer, on } from '@ngrx/store';
import { FiltrosValidos, setFiltro } from './filtro.actions';

export const initialState: FiltrosValidos = "todos" as FiltrosValidos;

export const filtroReducer = createReducer(
  initialState,
  on(setFiltro, (state, { filtro }) => filtro ),
);
