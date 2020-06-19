import React from 'react';
import {View,StyleSheet} from 'react-native';

// 建立一个有固定margin值的wrapper
// 把需要设置这个定值margin的元素都放到这个wrapper里面
const Spacer = ({children}) => {
  return(
    <View style={styles.spacer}> 
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  spacer:{
    margin:15
  }
});

export default Spacer;