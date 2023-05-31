import styled from "styled-components";
import { MoonLoader } from "react-spinners";
import { useTheme } from "styled-components";

const Spinner: React.FC = () => {
  const { colors } = useTheme();
  return <StyledSpinner color={colors.accentGreen} />;
};

export default Spinner;

const StyledSpinner = styled(MoonLoader)`
  margin: 6em auto;
`;
