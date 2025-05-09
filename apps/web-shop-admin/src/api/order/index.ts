import { requestClient } from '#/api/request';

/**
 * 订单列表
 */
export async function orderListApi(params) {
  return requestClient.get('/admin/store/order/list', { params });
}

/**
 * 订单记录
 */
export async function orderLogApi(params) {
  return requestClient.get('/admin/store/order/status/list', { params });
}
