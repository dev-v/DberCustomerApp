import {StyleSheet} from 'react-native';

const BaseStyle = {
  borderColor: '#ddd',
  edgeVertical: 20,
  edgeHorizontal: 16,
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  flexBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 6,
  },
}

export default StyleSheet.create({
  container: BaseStyle.container,
  flexBetween: BaseStyle.flexBetween,
});

const NavStyle = StyleSheet.create({
  titleStyle: {
    fontSize: 22,
    fontWeight: 'normal',
    color: '#595959',
    alignSelf: 'center',
  },
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
  }
});

const TextStyle = StyleSheet.create({
  navTitleStyle: {
    fontSize: 22,
    fontWeight: 'normal',
    color: '#595959',
    alignSelf: 'center',
  },
  title: {
    fontSize: 22,
    color: '#888',
    paddingVertical: 1,
  },
  subTitle: {
    fontSize: 20,
    color: '#888',
    paddingVertical: 1,
  },
  base: {
    fontSize: 16,
    color: '#889',
    paddingVertical: 3,
  },
  extra: {
    fontSize: 14,
    color: '#999',
    paddingVertical: 1,
  },
});

export {TextStyle, BaseStyle, NavStyle};