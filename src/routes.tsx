export const RoutePath = {
  table: "/table",
  chart: "/chart",
} as const;

export type RoutePath = (typeof RoutePath)[keyof typeof RoutePath];

export const routes: { to: RoutePath; label: string }[] = [
  { to: RoutePath.table, label: "Table" },
  { to: RoutePath.chart, label: "Chart" },
];
