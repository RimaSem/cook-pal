import styled from "styled-components";
import Logo from "./header/Logo";
import SearchBar from "./header/SearchBar";
import HeaderNav from "./header/HeaderNav";

const StyledHeader = styled.div`
  position: sticky;
  left: 0px;
  top: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 5em;
  padding: 0 1em;
  background-color: var(--color-white);
`;

const Header = () => {
  return (
    <StyledHeader>
      <Logo />
      <SearchBar />
      <HeaderNav />
    </StyledHeader>
  );
};

export default Header;
