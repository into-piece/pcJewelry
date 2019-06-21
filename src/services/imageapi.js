import request from '@/utils/request';

export async function queryImageUrl(parmas) {
  return request('/server/business/upload-img/listUploadImg', {
    method: 'POST',
    data: {
      ...parmas,
    },
  });
}
