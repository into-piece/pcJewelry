import request from '@/utils/request';

export async function queryImageUrl(parmas) {
  return request('/business/upload-img/listUploadImg', {
    method: 'POST',
    data: {
      ...parmas,
    },
  });
}
