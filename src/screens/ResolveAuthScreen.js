import React,{useContext,useEffect} from 'react';
import {Context as AuthContext, Context} from '../context/authContext';

const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(AuthContext);
  
  // app打开时，只尝试一次是否可以自动登录
  useEffect(() => {
    tryLocalSignin();
  },[]);

  return null;
};

export default ResolveAuthScreen;
