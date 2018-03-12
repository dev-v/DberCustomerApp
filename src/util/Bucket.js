import {Util} from "./Util";
import {protocol} from "../components/Config";

class Type {
  constructor(value, maxCount, isPub = false) {
    this.value = value;
    this.maxCount = maxCount;
    this.isPub = isPub;
  }
};

const ImgStyle = {
  webp: 'webp',
}

class ImgType {
  static SHOP = new Type(1, 1, true);
  static SHOP_ENV = new Type(2, 100, true);
  static SHOP_SERVICE = new Type(3, 20, true);
  static COACHER_IDENTIFICATION = new Type(4, 1);
  static CUSTOMER_IDENTIFICATION = new Type(5, 1);
  static MATRIX_CODE = new Type(6, 1);
  static COACHER_CERTIFICATE = new Type(7, 20);
  static FITNESS_TEST = new Type(8, 50);
  static IDENTITY = new Type(9, 10);
  static SHOP_SITE = new Type(10, 10, true);
}

class Bucket {

  // async getUpUrl(imgType) {
  //   const sKey = `_bucket_up_url_${imgType.value}_`;
  //   return storage(sKey) || uploadService.get(`pub/uploadUrl/${imgType.value}`)
  //     .then(({response}) => storage(sKey, response));
  // }

  // getUploadToken(imgType, bsId) {
  //   return selfService.get(`token/uploadToken/${imgType.value}/${bsId}`).then(res => res.response);
  // }

  //
  // del(imgType, bsId, id) {
  //   return selfService.get(`token/del/${imgType.value}/${bsId}/${id}`).then(res => res.response);
  // }


  getDownUrls(imgType, bsId, style = ImgStyle.webp) {
    const {value, isPub} = imgType;
    const id = `${value}-${bsId}`;
    if (isPub) {
      return Util.runs(storage.load({
        key: 'uploadDownloadUrl',
        id: value,
      }), storage.load({
        key: 'uploadKeys',
        id,
      })).then(([url, keys]) => {
        return keys.map(key => `${protocol}${url}/${key}-${style}`);
      });
    } else {
      // return selfService.post(`token/downloadUrls`, {style, protocol, type: imgType.value, bsId,}).then(res => {
      //   const {response} = res;
      //   if (response) {
      //     return response.map(url => {
      //       return [url, this.parseKey(url)];
      //     });
      //   }
      //   return [];
      // });
    }
  }

  parseKey(url) {
    const ss = url.split('?')[0].split('/');
    return ss[ss.length - 1].split('-')[0];
  }
}

const bucket = new Bucket();

export default bucket;

export {ImgType};
