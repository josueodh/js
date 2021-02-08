import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../pages/SignUp';
import SingIn from '../pages/SignIn';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator>
    <Auth.Screen name="SigIn" component={SingIn} />
    <Auth.Screen name="SigIn" component={SignUp} />
  </Auth.Navigator>
);
export default AuthRoutes;
