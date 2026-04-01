export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
  description?: string;
}

export interface TransactionState {
  items: Transaction[];
  status: "idle" | "loading" | "error";
}

export interface FilterState {
  search: string;
  category: string | null;
  type: TransactionType | null;
}

export interface UIState {
  role: "admin" | "viewer";
  darkMode: boolean;
}

export interface RootState {
  transactions: TransactionState;
  filters: FilterState;
  ui: UIState;
}
