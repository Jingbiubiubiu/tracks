import {AsyncStorage} from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import {navigate} from '../navigationRef';

const authReducer = (state,action) => {
  switch (action.type) {
    case 'add_error':
      return {...state,errorMessage:action.payload};
    case 'signin':
      // 当signup之后，就不应该出现signup的报错信息，所以直接置为空
      return {errorMessage:'',token:action.payload};
    case 'clear_error_message':
      return {...state,errorMessage:''};
    case 'signout':
      return {token:null,errorMessage:''};
    default:
      return state;
  };
};

// 自动登录功能
// 检查本地是否有token,如果有，自动登录，跳转到List界面；
// 没有token就返回Signup界面
const tryLocalSignin = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({type:'signin',payload:token});
    navigate('TrackList');
  } else {
    navigate('Signup')
  };
};

// signup 和 signin 界面来回跳转的时候，清楚之前页面的报错信息
const clearErrorMessage = dispatch => () => {
  dispatch({type:'clear_error_message'});
};

// const add = (a,b) => {
//   return a+b;
// }; 和以下的形式完全等价
// const add = (a,b) => a+b;
// 所以一下的function都改了形式
const signup = (dispatch) => async ({email,password}) => {
  // make api request to sign up with email and password
  // if sign up,modify the sate,and say authenticated
  // if signing up fails, reflect an error massage
  try{
    const response = await trackerApi.post('/signup',{email,password});
    await AsyncStorage.setItem('token',response.data.token);
    dispatch({type:'signin',payload:response.data.token});

    navigate('TrackList');
  } catch (err) {
    dispatch({
      type:'add_error',
      payload:'Something went wrong with sign up'
    });
  };
};



const signin = (dispatch) => async ({email,password}) => {
  // try to sign in 
  // handle success by updating state
  // handle failure by showing error massage
  try {
    const response = await trackerApi.post('/signin',{email,password});
    await AsyncStorage.setItem('token',response.data.token);
    dispatch({type:'signin',payload:response.data.token});
    
    navigate('TrackList')
  } catch (err) {
    dispatch({
      type:'add_error',
      payload:'Something went wrong with sign in'
    });
  };
};


const signout = (dispatch) => async () => {
    // sign out
    await AsyncStorage.removeItem('token');
    dispatch({type:'signout'});
    navigate('loginFlow');
  };


export const {Provider,Context} = createDataContext(
  authReducer,
  {signup,signin,signout,clearErrorMessage,tryLocalSignin},
  {token:null, errorMessage:''}
);


