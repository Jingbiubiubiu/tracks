import {NavigationActions} from 'react-navigation';

let navigator;

// is used to get aaccess to navigator
// setNavigator will be called with navigation objects
// and it allows to navigate between two different screens
// nav from 'react-navigation'这个库
// 重点是get aaccess to navigator
export const setNavigator = (nav) => {
  navigator = nav;
};

// 用来改变screens的function
export const navigate = (routeName,params) => {
  navigator.dispatch(
    NavigationActions.navigate({routeName,params})
  );
};