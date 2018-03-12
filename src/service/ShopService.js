import {shopPubService} from '../util/request';
import AMap from "../components/AMap3D/AMap";

class ShopService {
  shops(location) {
    return shopPubService.post("queryShopByPosition", this.buildPosition(location));
  }

  count(location) {
    return shopPubService.post("countShopByPosition", this.buildPosition(location));
  }

  getSiteBookings(bookingDate, siteId) {
    return shopPubService.post("getSiteBookings", {bookingDate, siteId});
  }

  buildPosition({longitude, latitude, longitudeDelta, latitudeDelta}) {
    return {
      leftTop: {
        lat: (latitude + latitudeDelta / 2) * AMap.coordinateUnit,
        lng: (longitude + longitudeDelta / 2) * AMap.coordinateUnit,
      },
      rightBottom: {
        lat: (latitude - latitudeDelta / 2) * AMap.coordinateUnit,
        lng: (longitude - longitudeDelta / 2) * AMap.coordinateUnit,
      }
    };
  }
}

export default new ShopService();
