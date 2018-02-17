import {registerService, startLocate} from 'react-native-hamap';

import {Util} from "../../../util/Util";

if (Util.isIos) {
  registerService('1a7e3ecbf2e43b928f5a4cc423b696f5');
}


componentWillMount()
{
  startLocate((location, error) => {
    console.warn(location, error)
  })
}