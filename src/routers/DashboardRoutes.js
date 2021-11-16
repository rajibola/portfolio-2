import {Operations, Transactions} from '../dashboard';

export const DashboardRoutes = [
  {
    Component: Transactions,
    path: '/transactions',
  },
  {
    Component: Operations,
    path: '/operations',
  },
];
