import styled from "styled-components";

const StyledMenu = styled.div`
  z-index: 3;
  position: fixed;
  right: 0;
  display: flex;
  flex-direction: column;
  transition: right 0.5s;
  width: 420px;
  height: 100vh;
  background-color: var(--color-white);

  @media (max-width: 520px) {
    width: 100%;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 6em auto;
  width: 95%;

  a {
    margin-bottom: 1.4em;
    font-size: 1.2rem;
    color: var(--color-text-dark);
    text-decoration: none;
  }
`;

const Menu = () => {
  return (
    <StyledMenu>
      <MenuContainer>
        <a href="#">Home</a>
        <a href="#">All Recipes</a>
        <a href="#">Daily Suggestions</a>
        <a href="#">Your Favorites</a>
        <a href="#">Custom Meal Plan</a>
        <a href="#">Create Grocery List</a>
        <a href="#">Log In</a>
      </MenuContainer>
    </StyledMenu>
  );
};

export default Menu;
