import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import {
  AppLoading,
  Onboarding,
  ProposalView,
  ActivityMap
} from '../screens';
import Icon from 'react-native-vector-icons/FontAwesome';

import UserNavigator from './user-navigator';
import RegistrationNavigator from './registration-navigator';
import theme from 'src/assets/styles/theme';
import ChatNavigator from './chat-navigator';

// Manages the Matches and Scheduling flow
const HomeNavigator = createStackNavigator({
  Activity: {
    screen: ActivityMap
  },
  Proposal: {
    screen: ProposalView
  }
}, {
    headerMode: 'none',
    initialRouteName: 'Proposal'
  });

const AuthenticatedNavigator = createMaterialTopTabNavigator({
  User: {
    screen: UserNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="user" size={24} color={tintColor} />
    }
  },
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="sun-o" size={24} color={tintColor} />
    }
  },
  Chat: {
    screen: ChatNavigator, navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="comments" size={24} color={tintColor} />
    }
  },
}, {
    swipeEnabled: false,
    tabBarOptions: {
      allowFontScaling: false,
      showLabel: false,
      showIcon: true,
      style: {
        elevation: 0,
        paddingTop: Platform.select({ ios: 20, android: 0 }),
        backgroundColor: theme.colors.white,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.secondary
      },
      indicatorStyle: {
        backgroundColor: theme.colors.white
      },
      activeTintColor: theme.colors.primaryLight,
      inactiveTintColor: theme.colors.textColor,
    },
    initialRouteName: 'Home'
  });

// Manages Onboarding and Registration
const OnboardingNavigator = createStackNavigator({
  Onboarding: { screen: Onboarding },
  Register: { screen: RegistrationNavigator },
  Main: { screen: AuthenticatedNavigator }
}, { headerMode: 'none' });

const MainNavigator = createSwitchNavigator({
  AppLoading: {
    screen: AppLoading
  },
  onboarding: OnboardingNavigator,
}, {
    initialRouteName: 'AppLoading',
  });

export default MainNavigator;
