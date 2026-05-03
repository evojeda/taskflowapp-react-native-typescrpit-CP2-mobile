import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/auth/LoginScreen';
import TabRoutes from './TabRoutes';

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <TabRoutes /> : <LoginScreen />}
    </NavigationContainer>
  );
}