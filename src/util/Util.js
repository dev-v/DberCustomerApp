import React from 'react';
import moment from 'moment';
import {Platform, Dimensions, Text} from 'react-native';
import {TextStyle} from "../components/themes/Styles";

const IS_IOS = Platform.OS === 'ios';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

class Time {
  static format_date = 'YYYY-MM-DD';
  static format_time = 'HH:mm';

  static today(hour = 23, minute = 59, second = 59) {
    return moment().hour(hour).minute(minute).second(second);
  }

  static tomorrow(hour, minute, second) {
    return Time.today(hour, minute, second).add(1, 'd');
  }

  static formatDate(time, format = Time.format_date) {
    return typeof time == 'string' ? time : time.format(format);
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
}

class Util {

  static isBlank = val => (val == 0 && typeof val == 'string') || (!val && val != 0);

  static wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
  }

  static hp(percentage) {
    const value = (percentage * viewportHeight) / 100;
    return Math.round(value);
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
}

class DomUtil {

  static wrapTextWithString(content, style = TextStyle.base) {
    if (content && (typeof content == 'string')) {
      return <Text style={style}>{content}</Text>;
    }
    return content;
  };
}


export {Time, Util, IS_IOS, DomUtil};