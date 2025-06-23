import { Table, Guest } from "./types";

export interface TableState {
  tables: Table[];
  collapsed: Record<string, boolean>;
}

export const MAX_GUESTS_PER_TABLE = 8;

export const initialState: TableState = {
  tables: [],
  collapsed: {},
};

function genId() {
  return Date.now().toString() + Math.random().toString(36).slice(2);
}

export function addTable(state: TableState): TableState {
  const newTable: Table = {
    id: genId(),
    name: `Стол №${state.tables.length + 1}`,
    guests: [],
  };
  return {
    ...state,
    tables: [...state.tables, newTable],
    collapsed: { ...state.collapsed, [newTable.id]: false },
  };
}

export function addGuest(
  state: TableState,
  tableId: string,
  guest: Guest
): TableState {
  return {
    ...state,
    tables: state.tables.map((table) =>
      table.id === tableId && table.guests.length < MAX_GUESTS_PER_TABLE
        ? { ...table, guests: [...table.guests, guest] }
        : table
    ),
  };
}

export function toggleCollapse(state: TableState, tableId: string): TableState {
  return {
    ...state,
    collapsed: {
      ...state.collapsed,
      [tableId]: !state.collapsed[tableId],
    },
  };
}

export function removeTable(state: TableState, tableId: string): TableState {
  return {
    ...state,
    tables: state.tables.filter((table) => table.id !== tableId),
    collapsed: Object.fromEntries(
      Object.entries(state.collapsed).filter(([id]) => id !== tableId)
    ),
  };
}

export function removeGuest(
  state: TableState,
  tableId: string,
  guestId: string
): TableState {
  return {
    ...state,
    tables: state.tables.map((table) =>
      table.id === tableId
        ? {
            ...table,
            guests: table.guests.filter((guest) => guest.id !== guestId),
          }
        : table
    ),
  };
}
