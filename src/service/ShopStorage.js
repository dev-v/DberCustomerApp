import {shopPubService} from '../util/request';
import {Util} from "../util/Util";

export default {
  shop({id, resolve, reject}) {
    shopPubService.get(`getShopDetail/${id}`).then(({response: data}) => {
      storage.save({key: 'shop', id, data});
      resolve(data);
    }).catch(e => {
      reject && reject(e);
    });
  },
  shopServices({id, resolve, reject}) {
    shopPubService.get(`getServices/${id}`).then(({response: data}) => {
      storage.save({key: 'shopServices', id, data});
      resolve(data);
    }).catch(e => {
      reject && reject(e);
    });
  },
  shopSites({id, resolve, reject}) {
    shopPubService.get(`getShopSites/${id}`).then(({response: data}) => {
      storage.save({key: 'shopSites', id, data});
      resolve(data);
    }).catch(e => {
      reject && reject(e);
    });
  },
  shopCards({id, resolve, reject}) {
    shopPubService.get(`getVipCards/${id}`).then(({response: data}) => {
      storage.save({key: 'shopCards', id, data});
      resolve(data);
    }).catch(e => {
      reject && reject(e);
    });
  },
  shopImageUrls({id, resolve, reject}) {
    Util.runs(storage.load({
      key: 'shopImageUrls',
      id,
    })).then(([envKeys,]) => {
    }).catch(e => {
      reject && reject(e);
    });
  },
}
