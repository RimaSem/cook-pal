import React from "react";
import { Icon } from "@mdi/react";
import { mdiArrowLeft, mdiArrowRight } from "@mdi/js";

type DotButtonPropType = {
  selected: boolean;
  onClick: () => void;
};

export const DotButton: React.FC<DotButtonPropType> = (props) => {
  const { selected, onClick } = props;

  return (
    <button
      className={"embla__dot".concat(selected ? " embla__dot--selected" : "")}
      type="button"
      onClick={onClick}
      aria-label="Dot button"
    />
  );
};

type PrevNextButtonPropType = {
  enabled: boolean;
  onClick: () => void;
};

export const PrevButton: React.FC<PrevNextButtonPropType> = (props) => {
  const { enabled, onClick } = props;

  return (
    <button
      className="embla__button embla__button--prev"
      onClick={onClick}
      disabled={!enabled}
      aria-label="Back button"
    >
      <Icon path={mdiArrowLeft} size={0.85} />
    </button>
  );
};

export const NextButton: React.FC<PrevNextButtonPropType> = (props) => {
  const { enabled, onClick } = props;

  return (
    <button
      className="embla__button embla__button--next"
      onClick={onClick}
      disabled={!enabled}
      aria-label="Next button"
    >
      <Icon path={mdiArrowRight} size={0.85} />
    </button>
  );
};
