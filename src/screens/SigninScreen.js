import React,{useContext} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import {Context} from '../context/authContext';
import {NavigationEvents} from 'react-navigation';

const SigninScreen  = () => {
  const {state,signin,clearErrorMessage} = useContext(Context);

  return(
    <View style={styles.container}>
      <NavigationEvents
        // onWillBlur即将从当前页面转到其他页面
        // onWillBlur={clearErrorMessage}
        // onWillFocus即将从其他页面转到本页面
        onWillFocus={clearErrorMessage}
      />
      <AuthForm 
        headerText='Sign In for Tracker' 
        errorMessage={state.errorMessage}
        onSubmit={signin}
        submitButtonText='Sign In'
      />
      <NavLink 
        text="Don't have an account? Sign up instead!"
        routeName='Singup'
      />
    </View>
  );
};

// 如果不需要返回function，就不用return和() => {}
SigninScreen.navigationOptions = {
    // 以下两句效果一样，保留的这句是新版本的语法
    headerShown:false
    // header:null
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

export default SigninScreen;