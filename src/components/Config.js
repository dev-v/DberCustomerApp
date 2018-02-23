import {LocaleConfig} from 'react-native-calendars';
import {Easing} from "react-native";

LocaleConfig.locales['zhCN'] = {
  monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二'],
  monthNamesShort: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
  dayNames: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  dayNamesShort: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
};

LocaleConfig.defaultLocale = 'zhCN';


const AnimatedConfig = {
  cubic: {
    duration: 200,
    easing: Easing.cubic,
  }
}

export {AnimatedConfig};