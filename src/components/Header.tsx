import styled from "styled-components";
import Logo from "./header/Logo";
import SearchBar from "./header/SearchBar";

const StyledHeader = styled.div`
  position: fixed;
  left: 0px;
  top: 0px;
  display: flex;
  align-items: center;
  border: 2px solid red;
  width: 100%;
  height: 5em;
  background-color: var(--color-white);
`;

const Header = () => {
  return (
    <StyledHeader>
      <Logo />
      <SearchBar />
    </StyledHeader>
  );
};

export default Header;
