import { useSelector } from "react-redux";
import { errorMessageSelector } from "../../state/error/errorSelectors";
import styled from "styled-components";
import { StatusCodes } from "../../types/AuthMessages";

export const handleFetchError = (res: { ok: boolean; status: number }) => {
  if (!res.ok) {
    if (res.status === StatusCodes.INTERNAL_SERVER_ERROR) {
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
  const { errorMessage } = useSelector(errorMessageSelector);

  return <StyledErrorMessage>{errorMessage}</StyledErrorMessage>;
};

export default ErrorMessage;

const StyledErrorMessage = styled.div`
  margin: 3em 0;
  text-align: center;
`;
