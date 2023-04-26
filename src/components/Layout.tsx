import styled from "styled-components";
import { useRef } from "react";
import { Outlet } from "react-router-dom";
import Menu from "./Menu";
import Header from "./Header";
import CarouselSlider from "./slider/CarouselSlider";
import Nav from "./Nav";
import Footer from "./Footer";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { toggleMenu } from "../features/menu/menuSlice";
import { EmblaOptionsType } from "embla-carousel-react";

const Overlay = styled.div`
  z-index: 2;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: var(--color-footer-link);
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

const Layout = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuState = useAppSelector((state) => state.menu.isOpened);
  const dispatch = useAppDispatch();

  const OPTIONS: EmblaOptionsType = {};
  const SLIDE_COUNT = 5;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

  return (
    <>
      {menuState && (
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
