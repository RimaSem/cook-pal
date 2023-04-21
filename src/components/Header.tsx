import styled from "styled-components";
import Logo from "./header/Logo";
import SearchBar from "./header/SearchBar";
import HeaderNav from "./header/HeaderNav";

const StyledHeader = styled.div`
  z-index: 2;
  position: sticky;
  left: 0px;
  top: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1600px;
  width: 100vw;
  height: 5em;
  padding: 0 1em;
  background-color: var(--color-white);

  @media (max-width: 865px) {
    height: 3.5em;
  }
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
