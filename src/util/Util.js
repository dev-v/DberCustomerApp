import React from 'react';
import moment from 'moment';
import {Platform, Dimensions, Text, View} from 'react-native';
import {Colors7, TextStyle} from "../components/themes/Styles";
import Hr from "../components/Layout/Hr";

const IS_IOS = Platform.OS === 'ios';
const {width: WIDTH, height: HEIGHT} = Dimensions.get('window');

class Time {
  static format_date = 'YYYY-MM-DD';
  static format_time = 'HH:mm';

  static today(hour = 23, minute = 59, second = 59) {
    return moment().hour(hour).minute(minute).second(second);
  }

  static tomorrow(hour, minute, second) {
    return Time.today(hour, minute, second).add(1, 'd');
  }

  static parse(time) {
    return moment(time);
  }

  /**
   * @param time (moment|minute)
   * @param format
   */
  static formatTime(time, format = Time.format_time) {
    return typeof time == 'number' ? moment().hour(0).minute(time).format(format) : (time || moment()).format(format);
  }

  static formatDate(time, format = Time.format_date) {
    return typeof time == 'string' ? time : time.format(format);
  }

  static fromMinute(minute = 0) {
    return moment().hour(0).minute(minute);
  }

  static toMinute(time) {
    const type = typeof time;
    if (type == 'number') {
      return time;
    }
    if (type == 'string') {
      time = Time.parse(time);
    } else {
      time = moment(time);
    }
    return time.hour() * 60 + time.minute();
  }
}

class Util {

  static isBlank = val => (val == 0 && typeof val == 'string') || (!val && val != 0);

  static wp(percentage) {
    return Math.round((percentage * WIDTH) / 100);
  }

  static hp(percentage) {
    return Math.round((percentage * HEIGHT) / 100);
  }

  static isSame = (s, t) => {
    if (s == t) {
      return true;
    }
    if (s == undefined || t == undefined) {
      return false;
    }
    if (typeof s == 'object') {
      if (Array.isArray(s) && (s.length != t.length)) {
        return false;
      } else if (Object.keys(s).length != Object.keys(t).length) {
        return false;
      }

      for (let k in s) {
        if (s[k] != t[k]) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  static range = (val, start, end) => val >= start && val < end;

  static toStr(obj) {
    return this.isBlank(obj) ? obj : obj.toString();
  }

  static additionalField(data, destField = 'key', srcField = 'text') {
    if (data) {
      data.map((d) => {
        d[destField] = d[destField] || d[srcField];
      })
    }
  }
}

class DomUtil {

  static wrapTextWithString(content, style = TextStyle.base) {
    if (content && (typeof content == 'string')) {
      return <Text style={style}>{content}</Text>;
    }
    return content;
  };

  static noMoreNode = <View><Hr/><Text
      style={[TextStyle.base, {alignSelf: 'center', color: Colors7.gray}]}>没有更多</Text></View>;
}


export {Time, Util, IS_IOS, DomUtil, WIDTH, HEIGHT};
