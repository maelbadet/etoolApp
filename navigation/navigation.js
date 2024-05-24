// navigation.js
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import BorrowToolScreen from './screens/BorrowToolScreen';
import ExchangeToolScreen from './screens/ExchangeToolScreen';

const AppNavigator = createStackNavigator(
    {
        Register: RegisterScreen,
        Login: LoginScreen,
        Profile: ProfileScreen,
        BorrowTool: BorrowToolScreen,
        ExchangeTool: ExchangeToolScreen,
    },
    {
        initialRouteName: 'Register',
    }
);

export default createAppContainer(AppNavigator);
