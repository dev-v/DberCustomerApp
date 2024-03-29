import React from 'react';
import Shop from "../shop/Shop";
import AccountBind from "../user/AccountBind";
import Deposit from "../user/Deposit";
import Upgrade from "../user/Upgrade";
import Bill from "../user/Bill";
import Holiday from "../user/Holiday/Holiday";
import BookingSite from "../user/BookingSite";
import Setting from "../user/Setting";
import Vip from "../user/Vip/Vip";
import GlobalCardBuy from "../user/Vip/GlobalCardBuy";
import IconButton from "../components/Icon/IconButton";
import ShopDetail from "../shop/detail/ShopDetail";
import Modals from "../components/Modal/Modals";
import BookingServiceDetail from "../shop/service/BookingServiceDetail";
import SliderExample from "../components/SliderExample";

export default {
  Modals: {
    screen: Modals,
  },
  ShopDetail: {
    screen: ShopDetail,
  },
  SliderExample: {
    screen: SliderExample,
    userDrawer: true,
  },
  BookingServiceDetail: {
    screen: BookingServiceDetail,
    userDrawer: true,
  },
  Shop: {
    main: true,
    screen: Shop,
    userDrawer: true,
    navigationOptions: {
      title: '成都市',
      headerLeft: <IconButton size={IconButton.size.large} name='md-qr-scanner'/>,
    }
  },
  Setting: {
    screen: Setting,
    navigationOptions: {
      title: '编辑资料',
    },
    userDrawer: {},
  },
  Vip: {
    screen: Vip,
    navigationOptions: {
      title: '会员卡',
    },
    userDrawer: {},
  },
  AccountBind: {
    screen: AccountBind,
    navigationOptions: {
      title: '绑定',
    },
    userDrawer: {},
  },
  Bill: {
    screen: Bill,
    navigationOptions: {
      title: '账单',
    },
    userDrawer: {},
  },
  BookingSite: {
    screen: BookingSite,
    navigationOptions: {
      title: '场地预约',
    },
    userDrawer: {},
  },
  Deposit: {
    screen: Deposit,
    navigationOptions: {
      title: '充值',
    },
    userDrawer: {},
  },
  Holiday: {
    screen: Holiday,
    navigationOptions: {
      title: '年假',
    },
    userDrawer: {},
  },
  Upgrade: {
    screen: Upgrade,
    navigationOptions: {
      title: '升级',
    },
    userDrawer: {},
  },
  GlobalCardBuy: {
    screen: GlobalCardBuy,
    navigationOptions: {
      title: '全城卡',
    },
  },
}
