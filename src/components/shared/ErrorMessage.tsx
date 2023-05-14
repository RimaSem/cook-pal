import { useSelector } from "react-redux";
import { getErrorMessage } from "../../state/error/errorSelectors";
import styled from "styled-components";

export const handleFetchError = (res: { ok: boolean; status: number }) => {
  if (!res.ok) {
    if (res.status === 500) {
      throw Error(
        "Error " +
          res.status +
          ": Server is currently down. Please try again later!"
      );
    }
    throw Error(
      "Error " + res.status + ": Could not fetch data for that resource."
    );
  }
};

const ErrorMessage: React.FC = () => {
  const { errorMessage } = useSelector(getErrorMessage);

  return <StyledErrorMessage>{errorMessage}</StyledErrorMessage>;
};

export default ErrorMessage;

const StyledErrorMessage = styled.div`
  margin: 3em 0;
  text-align: center;
`;
