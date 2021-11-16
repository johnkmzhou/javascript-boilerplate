import React from 'react';
import { useColorScheme, Platform } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
  SafeAreaView,
} from 'react-native-safe-area-context';
import {
  ApplicationProvider,
  IconRegistry,
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const BottomTabBar = ({ navigation, state }) => {
  const insets = useSafeAreaInsets();

  return (
    <BottomNavigation
      style={{ paddingBottom: insets.bottom }}
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}
    >
      <BottomNavigationTab
        title="HOME"
        icon={props => <Icon {...props} name="home-outline" />}
      />
      <BottomNavigationTab
        title="SEARCH"
        icon={props => <Icon {...props} name="search-outline" />}
      />
      <BottomNavigationTab
        title="SETTINGS"
        icon={props => <Icon {...props} name="settings-outline" />}
      />
    </BottomNavigation>
  );
};

export default () => {
  return (
    <SafeAreaProvider>
      <IconRegistry icons={EvaIconsPack} />
      <Display />
    </SafeAreaProvider>
  );
};

const Display = () => {
  const colorScheme = useColorScheme();
  const { Navigator, Screen } = createBottomTabNavigator();
  const insets = useSafeAreaInsets();

  // workaround for translucent Status Bar in Android
  // https://github.com/akveo/react-native-ui-kitten/issues/743
  const mapping = {
    components: {
      Popover: {
        meta: { parameters: { top: { type: 'number' } } },
        appearance: { default: { mapping: { top: insets.top } } },
      },
    },
  };

  return (
    <ApplicationProvider
      {...eva}
      theme={colorScheme === 'dark' ? eva.dark : eva.light}
      customMapping={Platform.OS == 'android' ? insets.top : null}
    >
      <NavigationContainer>
        <Navigator tabBar={props => <BottomTabBar {...props} />}>
          <Screen name="Home" component={GenericScreen} />
          <Screen name="Search" component={GenericScreen} />
          <Screen name="Settings" component={GenericScreen} />
        </Navigator>
      </NavigationContainer>
    </ApplicationProvider>
  );
};

const GenericScreen = props => {
  return <SafeAreaView style={{ flex: 1 }}></SafeAreaView>;
};
