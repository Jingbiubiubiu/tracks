// 此文件用于模拟用户在真实世界移动
import * as Location from 'expo-location';

// 代表在经度和纬度上改变10m
const tenMentersWithDegrees = 0.0001;

const getLocation = (increment) => {
  return {
    timestamp:10000000,
    coords:{
      speed:0,
      heading:0,
      accuracy:5,
      altitudeAccuracy:5,
      altitude:5,
      longitude:-122.0312186 + increment * tenMentersWithDegrees,
      latitude:37.33233141 + increment * tenMentersWithDegrees
    }
  };
};

// 1000代表1秒钟，就是每一秒就模拟一个在经纬度上都有变化10米的位置的改变
let counter = 0;
setInterval(() => {
  Location.EventEmitter.emit('Expo.locationChanged',{
    watchId:Location._getCurrentWatchId(),
    location:getLocation(counter)
  });
  counter++;
},1000);