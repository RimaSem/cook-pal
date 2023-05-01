import { StyledPageHeading, MainContainer } from "../styles/sharedStyles";
import styled from "styled-components";

const LoginContainer = styled(MainContainer)`
  flex-direction: column;
  align-items: center;
`;

const PageHeading = styled(StyledPageHeading)``;

const Text = styled.p``;

const Login: React.FC = () => (
  <LoginContainer>
    <PageHeading>Log in</PageHeading>
    <Text>Work in progress...</Text>
  </LoginContainer>
);

export default Login;
