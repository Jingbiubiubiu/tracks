import '../_mockLocation';
import React,{useContext,useCallback} from 'react';
import {StyleSheet} from 'react-native';
import Map from '../components/Map';
import {SafeAreaView,withNavigationFocus} from 'react-navigation';
import {Text} from 'react-native-elements';
import {Context as LocationContext} from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import TrackForm from '../components/TrackForm';

// isFocused 此屏幕现在是否出现在屏幕上
const TrackCreateScreen = ({ isFocused }) => {
  const {
    state:{recording},
    addLocation
  } = useContext(LocationContext);
  // useCallback有两个参数，第一个是function，第二个是变量
  // useCallback的作用是无论第一个function如何变化，只有当变量变化时
  // 再返回当前的function
  const callback = useCallback(
    (location) => {
      addLocation(location,recording);
    },
    [recording]
  );
  const [err] = useLocation(isFocused || recording ,callback);
  
  return(
    <SafeAreaView forceInset={{top:'always'}}>
      <Text h2>TrackCreateScreen</Text>
      <Map />
      {err ? <Text>Please enable location services</Text> : null}
      <TrackForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);