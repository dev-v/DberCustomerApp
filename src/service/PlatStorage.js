import {platPubService} from '../util/request';

export default {
  platShopVipStrategy({resolve, reject}) {
    platPubService.get(`getVipCardStrategy`).then(({response}) => {
      const data = {};
      response.map(d => data[d.id] = d);
      storage.save({key: 'platShopVipStrategy', data});
      resolve(data);
    }).catch(e => {
      reject && reject(e);
    });
  },
}
