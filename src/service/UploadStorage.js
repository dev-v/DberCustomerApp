import {uploadPubService} from '../util/request';

export default {
  uploadDownloadUrl({id, resolve}) {
    uploadPubService.get(`downloadUrl/${id}`).then(({response: data}) => {
      storage.save({key: 'uploadDownloadUrl', id, data});
      resolve(data);
    });
  },
  /**
   * @param id 格式为 type-bsId
   * @param resolve
   */
  uploadKeys({id, resolve}) {
    const ids = id.split('-');
    uploadPubService.get(`keys/${ids[0]}/${ids[1]}`).then(({response: data}) => {
      storage.save({key: 'uploadKeys', id, data});
      resolve(data);
    });
  }
}
