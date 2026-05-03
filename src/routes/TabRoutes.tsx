import { useRef } from 'react';
import { Animated, ImageSourcePropType } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/home/HomeScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import TaskStackRoutes from './TaskStackRoutes';
import AppIcon from '../components/AppIcon';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

type TabParamList = {
  Home: undefined;
  Tarefas: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

type AnimatedIconProps = {
  source: ImageSourcePropType;
  color: string;
};

function AnimatedIcon({ source, color }: AnimatedIconProps) {
  const scale = useRef(new Animated.Value(1)).current;

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <AppIcon source={source} size={22} color={color} />
    </Animated.View>
  );
}

export default function TabRoutes() {
  const { colors } = useTheme();
  const { user } = useAuth();

  const initialRouteName: keyof TabParamList =
    user?.role === 'admin' ? 'Settings' : 'Home';

  return (
    <Tab.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.text + '60',
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopWidth: 0,
          elevation: 8,
          height: 65,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          marginTop: -4,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <AnimatedIcon source={require('../img/home.png')} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Tarefas"
        component={TaskStackRoutes}
        options={{
          title: 'Tarefas',
          tabBarIcon: ({ color }) => (
            <AnimatedIcon source={require('../img/check-mark.png')} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color }) => (
            <AnimatedIcon source={require('../img/setting.png')} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}