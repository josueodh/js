import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  UserAvatar,
} from './styles';

interface RouteParams {
  providerId: string;
}
const CreateAppointment: React.FC = () => {
  const route = useRoute();
  const { user } = useAuth();
  const { providerId } = route.params as RouteParams;
  const { goBack } = useNavigation();
  const navitageBack = useCallback(() => {
    goBack();
  }, [goBack]);
  return (
    <Container>
      <Header>
        <BackButton onPress={navitageBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>
        <HeaderTitle>Cabeleireiros</HeaderTitle>
        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>
    </Container>
  );
};

export default CreateAppointment;
