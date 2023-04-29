import { useSelector } from "react-redux";
import { getErrorMessage } from "../../state/error/errorSelectors";
import styled from "styled-components";

const StyledErrorMessage = styled.div`
  margin: 3em 0;
  text-align: center;
`;

const ErrorMessage: React.FC = () => {
  const { errorMessage } = useSelector(getErrorMessage);

  return <StyledErrorMessage>{errorMessage}</StyledErrorMessage>;
};

export default ErrorMessage;
