import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const BackButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <StyledBackBtn type="button" onClick={() => navigate(-1)}>
      &larr; Go Back
    </StyledBackBtn>
  );
};

export default BackButton;

const StyledBackBtn = styled.button`
  margin: 2em 0 1em 1em;
  border: none;
  width: fit-content;
  background-color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  font-size: 1.2rem;
  font-family: inherit;
  text-align: left;

  &:hover {
    color: ${({ theme }) => theme.colors.accentGreen};
  }
`;
