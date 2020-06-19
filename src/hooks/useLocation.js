// hooks一般可以理解为提取一些共用的function
import {useState,useEffect} from 'react';
import {Accuracy,requestPermissionsAsync,watchPositionAsync} from 'expo-location';

// 将和Location有关的东西提取出来
export default (shouldTrack,callback) => {
  const [err,setErr] = useState(null);
 
  // 每一次render的时候，都会比较现在shouldTrack的值和之前shouldTrack的值
  // 如果两个值不一样，即有变化，就根据if语句判断执行哪个命令
  useEffect(() => {
    let subscriber;
    const startWatching = async () => {
      try {
        await requestPermissionsAsync();
        subscriber = await watchPositionAsync(
          {
            // 每1秒或者移动10m的时候记录位置
            accuracy:Accuracy.BestForNavigation,
            timeInterval:1000,
            distanceInterval:10
          },
          // 当位置update的时候，就call callback
          callback
        );
      } catch (err) {
        setErr(err);
      }
    };

    if (shouldTrack) {
      startWatching();
    } else {
      // stop watching
      if (subscriber) {
        subscriber.remove();
      }
      subscriber = null;
    }
    
    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  },[shouldTrack,callback]);

  // hook 一般是返回array，当然其他的也可以
  return [err];
};