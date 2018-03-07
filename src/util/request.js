import {Util} from "./Util";

const checkSystemStatus = (response) => {
  // status为9999以下的系统异常，平台统一处理
  const code = response.code;
  if (code == 200 || code > 9999) {
    return response;
  } else if (code == 600) {//请求登录
  } else {
    throw new Error(response.msg);
  }
}

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }
  const error = new Error('请求错误！');
  error.response = response;
  throw error;
}

const request = (url, options) => {
  return fetch(url, options)
      .then(checkStatus)
      .then(checkSystemStatus)
      .finally(() => {
      });
}

class WrapService {
  baseUrl;

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  request = (path, options) => {
    return request(`${this.baseUrl}${path}`,
        //此处后续需研究 same-origin
        Object.assign({credentials: 'include'}, options));
  };

  getUrl = (path) => {
    return this.baseUrl + path;
  }

  get = (path) => {
    return this.request(path);
  };

  post = (path, data) => {
    let body = '';
    if (typeof data == 'object') {
      data = JSON.parse(JSON.stringify(data));
      let val;
      if (Array.isArray(data)) {
        body = JSON.stringify(data);
      } else {
        Object.keys(data).map((key) => {
          val = data[key];
          if (Util.isBlank(val)) {
            return;
          }

          // body += `&${key}=${(typeof val == 'object')
          //   ? JSON.stringify(val)
          //   : val}`;

          body += `&${key}=${encodeURI(val)}`;
        });
        body = body.substring(1);
      }
    } else {
      body = encodeURI(data);
    }

    return this.request(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });
  };
}

const shopPubService = new WrapService('http://localhost:8080/pub/');

const platPubService = new WrapService('http://localhost:8081/pub/');

const uploadPubService = new WrapService('http://localhost:8100/pub/');

const customService = new WrapService('http://localhost:8082/');

const selfService = customService;

const loginService = selfService;

const uploadTokenUrl = (imgType, bsId) => selfService.getUrl(`token/upload/${imgType}/${bsId}`);
const downloadTokenUrl = selfService.getUrl('token/download');


export {loginService, selfService, platPubService, uploadPubService, shopPubService, uploadTokenUrl, downloadTokenUrl};
