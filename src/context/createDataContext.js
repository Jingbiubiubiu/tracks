import React,{useReducer} from 'react';

export default (reducer,actions,initialValue) => {
  const Context = React.createContext();

  const Provider = ({children}) => {
    const [state,dispatch] = useReducer(reducer,initialValue);

    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    };

    return(
      <Context.Provider value={{state,...boundActions}}>
        {children}
      </Context.Provider>
    );
  }; 
  // Context是个context object，用来让所有子屏幕获得data，重点是获得data
  // Provider是个component可以让data在整个APP可用，重点是提供data
  return {Context,Provider};
};