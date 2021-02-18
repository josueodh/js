import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../pages/SignUp';
import SingIn from '../pages/SignIn';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#312e38' },
    }}
  >
    <Auth.Screen name="SigIn" component={SingIn} />
    <Auth.Screen name="SigUp" component={SignUp} />
  </Auth.Navigator>
);
export default AuthRoutes;
