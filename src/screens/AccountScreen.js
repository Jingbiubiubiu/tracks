import React,{useContext} from 'react';
import {Text,StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-navigation';
import {Button} from 'react-native-elements';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/authContext';

const AccountScreen = () => {
  const { signout } = useContext(AuthContext);

  return(
    // SafeAreaView 保证屏幕内容不会顶着屏幕的最上方
    <SafeAreaView forceInset={{ top:'always' }}>
      <Text style={{fontSize:48}}>AccountScreen</Text>
      <Spacer>
        <Button title='Sign Out' onPress={signout}/>
      </Spacer>
    </SafeAreaView>
  ); 
};

const styles = StyleSheet.create({});

export default AccountScreen;