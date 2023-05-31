import { errorMessageSelector } from "../../state/error/errorSelectors";
import styled from "styled-components";
import { FetchErrorMessages, StatusCodes } from "../../types/AuthMessages";
import { useAppSelector } from "../../state/hooks";

export const handleFetchError = (res: {
  ok?: boolean;
  status: number;
  data: { meals: [] };
}) => {
  if (res.status >= 400) {
    if (res.status === StatusCodes.INTERNAL_SERVER_ERROR) {
      throw Error(FetchErrorMessages.ERROR_500);
    }
    throw Error("Error " + res.status + FetchErrorMessages.FETCH_ERROR);
  } else if (!res.data.meals) {
    throw Error(FetchErrorMessages.FETCH_ERROR);
  }
};

interface ErrorMessageProps {
  children?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ children }) => {
  const { errorMessage } = useAppSelector(errorMessageSelector);
  return (
    <StyledErrorMessage>
      {children ? children : errorMessage}
    </StyledErrorMessage>
  );
};

export default ErrorMessage;

const StyledErrorMessage = styled.div`
  margin: 3em 0;
  text-align: center;
`;
