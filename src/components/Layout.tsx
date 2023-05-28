import { useRef } from "react";
import { Outlet } from "react-router-dom";
import Menu from "./header/Menu";
import Header from "./header/Header";
import CarouselSlider from "./slider/CarouselSlider";
import Nav from "./home/Nav";
import Footer from "./footer/Footer";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { menuStatusSelector } from "../state/menu/menuSelectors";
import { toggleMenu } from "../state/menu/menuSlice";
import { EmblaOptionsType } from "embla-carousel-react";
import styled from "styled-components";

const Layout: React.FC = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { isOpened } = useAppSelector(menuStatusSelector);

  const OPTIONS: EmblaOptionsType = {};
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  return (
    <>
      {isOpened && (
        <Overlay ref={overlayRef} onClick={() => dispatch(toggleMenu())} />
      )}
      <StyledLayout>
        <Menu />
        <Header />
        <CarouselSlider slides={SLIDES} options={OPTIONS} />
        <Nav />
        <MainSection>
          <Outlet />
        </MainSection>
        <Footer />
      </StyledLayout>
    </>
  );
};

export default Layout;

const Overlay = styled.div`
  z-index: 2;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.footerLink};
`;

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;

const MainSection = styled.section`
  flex: 1;
`;
