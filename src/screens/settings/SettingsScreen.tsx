import { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import AppIcon from '../../components/AppIcon';

export default function SettingsScreen() {
  const { colors, toggleTheme, theme } = useTheme();
  const { user } = useAuth();

  const [treatment, setTreatment] = useState('Srta.');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    loadPreferences();

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  async function loadPreferences() {
    const saved = await AsyncStorage.getItem('@treatment');
    if (saved) setTreatment(saved);
  }

  async function handleTreatment(value: string) {
    setTreatment(value);
    await AsyncStorage.setItem('@treatment', value);
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header showUserInfo={false} />

      <Animated.View
        style={{
          flex: 1,
          padding: 20,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <Text style={{ color: colors.text, fontSize: 26, fontWeight: 'bold', marginBottom: 18 }}>
          Meu perfil
        </Text>

        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: 24,
            padding: 20,
            alignItems: 'center',
            marginBottom: 20,
            shadowColor: '#000',
            shadowOpacity: 0.08,
            shadowRadius: 10,
            elevation: 3,
          }}
        >
          <View
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              width: 58,
              height: 58,
              borderRadius: 29,
              backgroundColor: colors.background,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <AppIcon
              source={require('../../img/user.png')}
              size={66}
            />
          </View>
        </View>

          <Text style={{ color: colors.text, fontSize: 20, fontWeight: 'bold' }}>
            {treatment} {user?.name}
          </Text>

          <Text style={{ color: colors.text, opacity: 0.65, marginTop: 4 }}>
            Perfil: {user?.role === 'admin' ? 'Administrador' : 'Usuário'}
          </Text>
        </View>

        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: 20,
            padding: 16,
            marginBottom: 16,
          }}
        >
          <Text style={{ color: colors.text, fontWeight: 'bold', marginBottom: 12 }}>
            Aparência
          </Text>

          <TouchableOpacity
            onPress={toggleTheme}
            style={{
              backgroundColor: colors.background,
              padding: 14,
              borderRadius: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ color: colors.text }}>
              Tema atual: {theme === 'dark' ? 'Escuro' : 'Claro'}
            </Text>

            <AppIcon
              source={theme === 'dark' ? require('../../img/moon.png') : require('../../img/sun.png')}
              size={24}
              color={colors.text}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: 20,
            padding: 16,
          }}
        >
          <Text style={{ color: colors.text, fontWeight: 'bold', marginBottom: 12 }}>
            Forma de tratamento
          </Text>

          <View style={{ flexDirection: 'row', gap: 10 }}>
            {['Sr.', 'Sra.', 'Srta.'].map(item => (
              <TouchableOpacity
                key={item}
                onPress={() => handleTreatment(item)}
                style={{
                  flex: 1,
                  padding: 12,
                  borderRadius: 14,
                  alignItems: 'center',
                  backgroundColor: treatment === item ? colors.primary : colors.background,
                }}
              >
                <Text
                  style={{
                    color: treatment === item ? '#fff' : colors.text,
                    fontWeight: 'bold',
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Animated.View>
    </View>
  );
}