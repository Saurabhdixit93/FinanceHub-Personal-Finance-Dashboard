import type { Transaction } from "../types";

export const calcIncome = (items: Transaction[]): number =>
  items
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

export const calcExpenses = (items: Transaction[]): number =>
  items
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

export const calcBalance = (items: Transaction[]): number =>
  calcIncome(items) - calcExpenses(items);

export const groupByCategory = (
  items: Transaction[],
): Record<string, number> => {
  return items.reduce(
    (acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    },
    {} as Record<string, number>,
  );
};

export const groupByMonth = (
  items: Transaction[],
): { month: string; income: number; expense: number }[] => {
  const map: Record<string, { income: number; expense: number }> = {};
  items.forEach((t) => {
    const month = t.date.slice(0, 7);
    if (!map[month]) map[month] = { income: 0, expense: 0 };
    if (t.type === "income") map[month].income += t.amount;
    else map[month].expense += t.amount;
  });
  return Object.entries(map)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({
      month: new Date(month + "-01").toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      }),
      ...data,
    }));
};

export const formatCurrency = (amount: number): string =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    amount,
  );

export const getHighestSpendCategory = (
  items: Transaction[],
): { category: string; amount: number } | null => {
  const expenses = items.filter((t) => t.type === "expense");
  if (expenses.length === 0) return null;
  const grouped = groupByCategory(expenses);
  const sorted = Object.entries(grouped).sort(([, a], [, b]) => b - a);
  return { category: sorted[0][0], amount: sorted[0][1] };
};

export const calcSavingsRate = (items: Transaction[]): number => {
  const income = calcIncome(items);
  if (income === 0) return 0;
  const expenses = calcExpenses(items);
  return ((income - expenses) / income) * 100;
};
