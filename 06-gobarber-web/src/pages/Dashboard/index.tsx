import React from "react";
import { FiClock, FiPower } from "react-icons/fi";
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Calendar,
} from "./styles";

import logoImg from "../../assets/logo.svg";
import { useAuth } from "../../hooks/auth";

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />
          <Profile>
            <img
              src="https://avatars.githubusercontent.com/u/43760220?s=460&u=30128cecfc2638fd1ecf5b1f4a9329a8b09948a0&v=4"
              alt="GoBarber"
            />
            <div>
              <span>Bem-vindo,</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>
      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-feira</span>
          </p>
          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://avatars.githubusercontent.com/u/43760220?s=460&u=30128cecfc2638fd1ecf5b1f4a9329a8b09948a0&v=4"
                alt="Josué Heringer"
              />
              <strong>Josué Heringer</strong>
              <span>
                <FiClock /> 08:00
              </span>
            </div>
          </NextAppointment>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  );
};
export default Dashboard;
