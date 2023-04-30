import { useSelector } from "react-redux";
import { getErrorMessage } from "../../state/error/errorSelectors";
import styled from "styled-components";

export const handleFetchError = (res: { ok: boolean; status: number }) => {
  if (!res.ok) {
    throw Error(res.status + ": Could not fetch the data for that resource");
  }
};

const StyledErrorMessage = styled.div`
  margin: 3em 0;
  text-align: center;
`;

const ErrorMessage: React.FC = () => {
  const { errorMessage } = useSelector(getErrorMessage);

  return <StyledErrorMessage>{errorMessage}</StyledErrorMessage>;
};

export default ErrorMessage;
