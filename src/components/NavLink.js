import React from 'react';
import {Text,TouchableOpacity,StyleSheet} from 'react-native';
import Spacer from './Spacer';
import {withNavigation} from 'react-navigation';

const NavLink = ({navigation,text,routeName}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
        <Spacer>
          <Text style={styles.link}>
            {text}
          </Text>
        </Spacer>
      </TouchableOpacity>
  );

};

const styles = StyleSheet.create({
  link:{
    color:'blue'
  }
});

// withNavigation make sure have direct access to navigation prop
// sou that able to call the navigation faunction
export default withNavigation(NavLink);