import styled from "styled-components";
import Logo from "./header/Logo";
import SearchBar from "./header/SearchBar";
import Nav from "./header/Nav";

const StyledHeader = styled.div`
  position: sticky;
  left: 0px;
  top: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1em;
  width: 100%;
  height: 5em;
  background-color: var(--color-white);
`;

const Header = () => {
  return (
    <StyledHeader>
      <Logo />
      <SearchBar />
      <Nav />
    </StyledHeader>
  );
};

export default Header;
