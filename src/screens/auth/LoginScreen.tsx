import { useRef, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Platform, Animated,} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import AppIcon from '../../components/AppIcon';

export default function LoginScreen() {
  const { login } = useAuth();
  const { colors } = useTheme();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const scaleAnim = useRef(new Animated.Value(1)).current;

  function showMessage(title: string, message: string) {
    if (Platform.OS === 'web') {
      window.alert(`${title}\n${message}`);
    } else {
      Alert.alert(title, message);
    }
  }

  function animateButton() {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.96,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }

  async function handleLogin() {
    animateButton();

    if (!username.trim() || !password.trim()) {
      setLoginError('Preencha usuário e senha.');
      showMessage('Atenção', 'Preencha usuário e senha.');
      return;
    }

    const success = await login(username.trim(), password.trim());

    if (!success) {
      setLoginError('Usuário ou senha inválidos.');
      showMessage('Erro no login', 'Usuário ou senha inválidos.');
      return;
    }

    setLoginError('');
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        padding: 24,
      }}
    >
      <View
        style={{
          backgroundColor: colors.card,
          borderRadius: 28,
          padding: 24,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 10,
          elevation: 4,
        }}
      >
        <View style={{ alignItems: 'center', marginBottom: 24 }}>
          <View
            style={{
              width: 78,
              height: 78,
              borderRadius: 39,
              backgroundColor: colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 14,
            }}
          >
            <AppIcon source={require('../../img/user.png')} size={70} />
          </View>

          <Text style={{ color: colors.text, fontSize: 26, fontWeight: 'bold' }}>
            TaskFlow
          </Text>

          <Text style={{ color: colors.text, opacity: 0.6, marginTop: 4 }}>
            Entre para organizar sua rotina
          </Text>
        </View>

        <Text style={{ color: colors.text, fontWeight: 'bold', marginBottom: 8 }}>
          Usuário
        </Text>

        <TextInput
          placeholder="Digite seu usuário"
          placeholderTextColor="#999"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            if (loginError) setLoginError('');
          }}
          autoCapitalize="none"
          style={{
            backgroundColor: colors.background,
            color: colors.text,
            padding: 14,
            borderRadius: 14,
            marginBottom: 14,
          }}
        />

        <Text style={{ color: colors.text, fontWeight: 'bold', marginBottom: 8 }}>
          Senha
        </Text>

        <TextInput
          placeholder="Digite sua senha"
          placeholderTextColor="#999"
          value={password}
          secureTextEntry
          onChangeText={(text) => {
            setPassword(text);
            if (loginError) setLoginError('');
          }}
          style={{
            backgroundColor: colors.background,
            color: colors.text,
            padding: 14,
            borderRadius: 14,
            marginBottom: 10,
          }}
        />

        {loginError !== '' && (
          <Text style={{ color: '#FF6B6B', fontSize: 12, marginBottom: 12 }}>
            {loginError}
          </Text>
        )}

        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            onPress={handleLogin}
            style={{
              backgroundColor: colors.primary,
              padding: 14,
              borderRadius: 16,
              alignItems: 'center',
              marginTop: 6,
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>
              Entrar
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}