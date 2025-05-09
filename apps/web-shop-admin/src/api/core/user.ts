import type { UserInfo } from '@vben/types';

import { requestClient } from '#/api/request';

/**
 * 获取用户信息
 */
export async function getUserInfoApi(token) {
  return requestClient.get<UserInfo>('/admin/getAdminInfoByToken', {
    params: { token },
  });
}
