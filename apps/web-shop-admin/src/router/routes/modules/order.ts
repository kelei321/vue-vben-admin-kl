import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ic:baseline-view-in-ar',
      order: 1000,
      title: '订单',
    },
    name: 'Order',
    path: '/order',
    redirect: '/order/index',
    children: [
      {
        meta: {
          title: '订单',
        },
        name: 'OrderIndex',
        path: 'index',
        component: () => import('#/views/order/index.vue'),
      },
    ],
  },
];

export default routes;
