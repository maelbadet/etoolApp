// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import BorrowToolScreen from './screens/BorrowToolScreen';
import ExchangeToolScreen from './screens/ExchangeToolScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Register">
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="BorrowTool" component={BorrowToolScreen} />
          <Stack.Screen name="ExchangeTool" component={ExchangeToolScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}
