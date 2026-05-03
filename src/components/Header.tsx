import { View, Text, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import AppIcon from './AppIcon';

type Props = {
  showUserInfo?: boolean;
};

export default function Header({ showUserInfo = true }: Props) {
  const { user, logout } = useAuth();
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ backgroundColor: colors.card }}>
      <View
        style={{
          backgroundColor: colors.card,
          paddingHorizontal: 16,
          paddingTop: 10,
          paddingBottom: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottomLeftRadius: 18,
          borderBottomRightRadius: 18,
        }}
      >
        {showUserInfo ? (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={require('../img/user.png')}
              style={{
                width: 42,
                height: 42,
                borderRadius: 21,
                marginRight: 10,
              }}
            />

            <View>
              <Text style={{ color: colors.text, fontWeight: 'bold' }}>
                {user?.name}
              </Text>

              <Text style={{ color: colors.text, fontSize: 12, opacity: 0.7 }}>
                Perfil: {user?.role}
              </Text>
            </View>
          </View>
        ) : (
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: 'bold' }}>
            Configurações
          </Text>
        )}

        <TouchableOpacity onPress={logout}>
          <AppIcon
            source={require('../img/sair-do-usuario.png')}
            size={28}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}