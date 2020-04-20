import { createAppContainer, createSwitchNavigator } from 'react-navigation';
// import AuthorizationStack from './AuthorizationStack';
import AppStack from './AppStack';
// import AuthorizationLoadingScreen from '../screens/AuthorizationLoadingScreen';

export default createAppContainer(
  createSwitchNavigator(
    {
    //   AuthLoading: AuthorizationLoadingScreen,
      App: AppStack,
    //   Auth: AuthorizationStack,
    },
    {
      initialRouteName: 'MapScreen',
    },
  ),
);
