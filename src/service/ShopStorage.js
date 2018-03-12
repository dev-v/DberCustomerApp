import {shopPubService} from '../util/request';
import {Util} from "../util/Util";

export default {
  shop({id, resolve}) {
    shopPubService.get(`getShopDetail/${id}`).then(({response: data}) => {
      storage.save({key: 'shop', id, data});
      resolve(data);
    });
  },
  shopServices({id, resolve}) {
    shopPubService.get(`getServices/${id}`).then(({response: data}) => {
      storage.save({key: 'shopServices', id, data});
      resolve(data);
    });
  },
  shopSites({id, resolve}) {
    shopPubService.get(`getShopSites/${id}`).then(({response: data}) => {
      storage.save({key: 'shopSites', id, data});
      resolve(data);
    });
  },
  shopCards({id, resolve}) {
    shopPubService.get(`getVipCards/${id}`).then(({response: data}) => {
      storage.save({key: 'shopCards', id, data});
      resolve(data);
    });
  },
  shopImageUrls({id, resolve}) {
    Util.runs(storage.load({
      key:,
      id,
    })).then(([envKeys,])=>{});
  },
}
