import React,{useContext} from 'react';
import {View,StyleSheet} from 'react-native';
import {Context as AuthContext} from '../context/authContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import {NavigationEvents} from 'react-navigation';

const SignupScreen = ({navigation}) => {
  const {state,signup,clearErrorMessage} = useContext(AuthContext);
  
  return (
    <View style={styles.container}>
      <NavigationEvents
        // onWillBlur即将从当前页面转到其他页面
        // onWillBlur={clearErrorMessage}
        // onWillFocus即将从其他页面转到本页面
        onWillFocus={clearErrorMessage}
      />
      <AuthForm 
        headerText='Sign Up for Tracker' 
        errorMessage={state.errorMessage}
        // onSubmit={signup}等于onSubmit={({email,password}) => signup({email,password})}
        onSubmit={signup}
        submitButtonText='Sign Up'
      />
      <NavLink
        text='Already have an account? Sign in instead!'
        routeName='Signin'
      />
    </View>
  );
};

// 把原本的header隐藏掉
SignupScreen.navigationOptions = () => {
  return{
    // 以下两句效果一样，保留的这句是新版本的语法
    headerShown:false
    // header:null
  };
};

const styles = StyleSheet.create({
  container:{
    // flex:1 保证view元素占满整个页面
    flex:1,
    justifyContent:'center',
    // 添加额外得margin使view元素上移
    marginBottom:200
  }
  
});

export default SignupScreen;