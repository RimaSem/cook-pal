import Logo from "./Logo";
import SearchBar from "./SearchBar";
import HeaderNav from "./HeaderNav";
import styled from "styled-components";

const Header: React.FC = () => (
  <StyledHeader>
    <Logo />
    <SearchBar />
    <HeaderNav />
  </StyledHeader>
);

export default Header;

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
