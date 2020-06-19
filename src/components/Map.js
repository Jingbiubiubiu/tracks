import React,{useContext} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import MapView,{Polyline,Circle} from 'react-native-maps';
import {Context as LocationContext} from '../context/LocationContext';

const Map = () => {
  const {
    state: {currentLocation,locations} 
  } = useContext(LocationContext);
  // const {state} = useContext(LocationContext);
  // console.log('123');
  // console.log(state);

  // 如果无法取到现有位置，就不展示任何东西
  if (!currentLocation) {
    return <ActivityIndicator size="large" sytle={{marginTop:200}} />
  }
  
  return(
    <MapView 
      style={styles.map}
      initialRegion={{
        // 将currentLocation的经度和纬度拆解出来，作为原始位置
        ...currentLocation.coords,
        // latitude:37.33233,
        // longitude:-122.03121,
        // Delta是设置想展示的视野的大小
        latitudeDelta:0.01,
        longitudeDelta:0.01
      }}
    >
      {/* 当track地理位置时，用圆圈显示当前的位置 */}
      <Circle 
        center={currentLocation.coords}
        radius={30}
        strokeColor='rgba(158,158,255,1.0)'
        fillColor='rgba(158,158,255,0.3)'
      />
      {/* 将locations里的每一个元素遍历，
      然后提取出每个元素（以loc代指）的coords组成一个新的array */}
      <Polyline coordinates={locations.map(loc => loc.coords)} />

    </MapView>   
  );
};

const styles = StyleSheet.create({
  // MapView 也必须至少有高度才能看到
  map:{
    height:300
  }
});

export default Map;