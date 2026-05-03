import { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import Header from '../../components/Header';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { getMotivationalQuote, QuoteResponse } from '../../services/api';
import AppIcon from '../../components/AppIcon';

export default function HomeScreen() {
  const { colors } = useTheme();
  const { user } = useAuth();

  const [quote, setQuote] = useState<QuoteResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  async function loadQuote() {
    try {
      setLoading(true);
      setError('');

      const data = await getMotivationalQuote();
      setQuote(data);
    } catch {
      setError('Não foi possível carregar a frase motivacional.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadQuote();

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

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header />

      <Animated.View
        style={{
          flex: 1,
          padding: 20,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: 6,
          }}
        >
          Olá, {user?.name} 👋
        </Text>

        <Text
          style={{
            color: colors.text,
            opacity: 0.65,
            fontSize: 13,
            marginBottom: 18,
          }}
        >
          Organize seu dia com leveza e foco.
        </Text>

        <View
          style={{
            backgroundColor: colors.card,
            padding: 18,
            borderRadius: 22,
            marginBottom: 18,
            shadowColor: '#000',
            shadowOpacity: 0.08,
            shadowRadius: 10,
            elevation: 3,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <View
              style={{
                width: 42,
                height: 42,
                borderRadius: 21,
                backgroundColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}
            >
              <AppIcon source={require('../../img/heart.png')} size={22} color="#fff" />
            </View>

            <View>
              <Text style={{ color: colors.text, fontWeight: 'bold', fontSize: 16 }}>
                Frase motivacional
              </Text>
              <Text style={{ color: colors.text, opacity: 0.55, fontSize: 12 }}>
                Uma inspiração para começar
              </Text>
            </View>
          </View>

          {loading && (
            <Text style={{ color: colors.text, opacity: 0.7 }}>
              Carregando frase...
            </Text>
          )}

          {error !== '' && (
            <Text style={{ color: 'red' }}>
              {error}
            </Text>
          )}

          {!loading && !error && quote && (
            <>
              <Text
                style={{
                  color: colors.text,
                  fontSize: 16,
                  lineHeight: 23,
                  fontWeight: '500',
                }}
              >
                “{quote.quote}”
              </Text>

              <Text
                style={{
                  color: colors.text,
                  marginTop: 10,
                  fontSize: 12,
                  opacity: 0.6,
                }}
              >
                — {quote.author}
              </Text>
            </>
          )}

          <TouchableOpacity
            onPress={loadQuote}
            style={{
              backgroundColor: colors.primary,
              padding: 13,
              borderRadius: 14,
              alignItems: 'center',
              marginTop: 18,
            }}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>
              Buscar nova frase
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}