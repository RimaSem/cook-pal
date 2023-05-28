import styled from "styled-components";
import Search from "./Search";
import useFilter from "../../hooks/useFilter";
import { areaOptions, categoryOptions } from "../../utils/basicUtils";
import { devices } from "../../styles/theme";

const Filters: React.FC = () => {
  const { filterByCategory, filterByArea } = useFilter();

  const categories = categoryOptions.map((category) => (
    <StyledOption key={category} value={category}>
      {category}
    </StyledOption>
  ));

  const areas = areaOptions.map((area) => (
    <StyledOption key={area} value={area}>
      {area}
    </StyledOption>
  ));

  return (
    <StyledFilters>
      <StyledSelect
        name="category"
        defaultValue="Category"
        onChange={(e) => {
          filterByCategory(e.target.value);
        }}
      >
        <StyledOption value="Category">Category</StyledOption>
        {categories}
      </StyledSelect>
      <StyledSelect name="area" onChange={(e) => filterByArea(e.target.value)}>
        <StyledOption value="Area">Area</StyledOption>
        {areas}
      </StyledSelect>
      <Search />
    </StyledFilters>
  );
};

export default Filters;

const StyledFilters = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5em;
  padding: 0.75em;
  min-width: 100%;
`;

const StyledSelect = styled.select`
  margin: 0 1.3em 0 0;
  border-radius: 6px;
  padding: 0.2em 0.1em;
  min-width: 13em;
  font-size: 1rem;
  font-family: inherit;
  font-weight: 300;
  text-align: center;

  &:focus {
    outline: none;
  }

  @media ${devices.tabletM} {
    margin: 0;
  }
`;

const StyledOption = styled.option`
  font-weight: 300;
`;
