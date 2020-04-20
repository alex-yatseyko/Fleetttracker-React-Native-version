import { NavigationActions } from 'react-navigation';

class NavigationService {
  navigator;

  setTopLevelNavigator = navigatorRef => {
    this.navigator = navigatorRef;
  };

  navigate = (routeName, params = {}, action = null) => {
    if (!this.navigator) {
      throw new Error('navigator has not been initialized yet');
    }

    this.navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
        action,
      }),
    );
  };
}

export default new NavigationService();
