import Logo from "./header/Logo";
import SearchBar from "./header/SearchBar";
import HeaderNav from "./header/HeaderNav";
import styled from "styled-components";

const StyledHeader = styled.div`
  z-index: 4;
  position: sticky;
  left: 0;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100em;
  width: 100%;
  height: 5em;
  padding: 0 1em;
  background-color: ${({ theme }) => theme.colors.white};

  @media ${({ theme }) => theme.mQueries.primaryQ} {
    height: 3.5em;
  }
`;

const Header: React.FC = () => (
  <StyledHeader>
    <Logo />
    <SearchBar />
    <HeaderNav />
  </StyledHeader>
);

export default Header;
