import React, { useState, useEffect } from "react";

const FilterSidebar = (props) => {
  const [searchInput, setSearchInput] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [filterFootage, setFilterFootage] = useState("");
  const [minNumOfBeds, setMinNumOfBeds] = useState(0);
  const [maxNumOfBeds, setMaxNumOfBeds] = useState(100);
  const [minNumOfBaths, setMinNumOfBaths] = useState(0);
  const [maxNumOfBaths, setMaxNumOfBaths] = useState(100);
  const [filterSinglestory, setFilterSinglestory] = useState(false);
  const [filterMultistory, setFilterMultistory] = useState(false);
  const [filterNew, setFilterNew] = useState(false);
  const [filterOld, setFilterOld] = useState(false);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const multistoryState = findStateBool(filterMultistory, filterSinglestory);
    const newState = findStateBool(filterNew, filterOld);

    let filteredProperties = [...props.originalProps];
    if (searchInput) {
      filteredProperties = filteredProperties.filter(
        (property) =>
          property.city.toLowerCase().includes(searchInput.toLowerCase()) ||
          property.state.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    if (filterPrice) {
      filteredProperties = filteredProperties.filter(
        (prop) => prop.price < parseInt(filterPrice)
      );
    }
    if (filterFootage) {
      filteredProperties = filteredProperties.filter(
        (prop) => prop.sq_footage < parseInt(filterFootage)
      );
    }
    if (minNumOfBeds || maxNumOfBeds) {
      filteredProperties = filteredProperties.filter(
        (prop) => prop.bedrooms >= minNumOfBeds && prop.bedrooms <= maxNumOfBeds
      );
    }
    if (minNumOfBaths || maxNumOfBaths) {
      filteredProperties = filteredProperties.filter(
        (prop) =>
          prop.bathrooms >= minNumOfBaths && prop.bathrooms <= maxNumOfBaths
      );
    }
    if (multistoryState !== null) {
      filteredProperties = filteredProperties.filter(
        (prop) => prop.multistory === multistoryState
      );
    }
    if (newState !== null) {
      filteredProperties = filteredProperties.filter(
        (prop) => prop.new_build === newState
      );
    }
    props.setProps(filteredProperties);
  };

  return (
    <>
      <div>
        <div className="input-group">
          <div className="form-outline">
            <h6>Search by City or State</h6>
            <input
              type="search"
              id="form1"
              onChange={(e) => setSearchInput(e.target.value)}
              className="form-control"
              placeholder="city or state"
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="price" className="form-label">
              Max Price
            </label>
            <input
              type="range"
              className="form-range"
              min="0"
              max="100000000"
              value={filterPrice}
              onChange={(e) => {
                setFilterPrice(e.target.value);
              }}
              id="price"
            />
            {filterPrice && <p>${filterPrice}</p>}
          </div>
          <div>
            <label htmlFor="square_footage" className="form-label">
              Max Square Feet
            </label>
            <input
              type="range"
              className="form-range"
              min="0"
              max="10000"
              value={filterFootage}
              onChange={(e) => {
                setFilterFootage(e.target.value);
              }}
              id="square_footage"
            />
            {filterFootage && <p>{filterFootage} sq feet</p>}
          </div>
          <div>
            <h6>Bedrooms</h6>
            <label>min</label>
            <input
              type="number"
              max="100"
              value={minNumOfBeds}
              onChange={(e) => {
                setMinNumOfBeds(e.target.value);
              }}
              id="square_footage"
            />
            <label>max</label>
            <input
              type="number"
              max="100"
              value={maxNumOfBeds}
              onChange={(e) => {
                setMaxNumOfBeds(e.target.value);
              }}
              id="square_footage"
            />
            <h6>Bathrooms</h6>
            <label>min</label>
            <input
              type="number"
              max="100"
              value={minNumOfBaths}
              onChange={(e) => {
                setMinNumOfBaths(e.target.value);
              }}
              id="square_footage"
            />
            <label>max</label>
            <input
              type="number"
              max="100"
              value={maxNumOfBaths}
              onChange={(e) => {
                setMaxNumOfBaths(e.target.value);
              }}
              id="square_footage"
            />
          </div>
        </div>
        <div>
          <h6>Property Characteristics</h6>
          <div>
            <div>
              <label htmlFor="singlestory">Singlestory</label>
              <input
                type="checkbox"
                id="singlestory"
                value={filterSinglestory}
                onChange={(e) => setFilterSinglestory(!filterSinglestory)}
              />
            </div>
            <div>
              <label htmlFor="multistory">Multistory</label>
              <input
                type="checkbox"
                id="new_build"
                value={filterMultistory}
                onChange={(e) => setFilterMultistory(!filterMultistory)}
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="new_build">New</label>
              <input
                type="checkbox"
                id="new_build"
                value={filterNew}
                onChange={(e) => setFilterNew(!filterNew)}
              />
            </div>
            <div>
              <label htmlFor="old_build">Old</label>
              <input
                type="checkbox"
                name="old_build"
                id="old_build"
                value={filterOld}
                onChange={(e) => setFilterOld(!filterOld)}
              />
            </div>
          </div>
        </div>
        <button onClick={handleFilterSubmit}>APPLY</button>
      </div>
    </>
  );
};

export default FilterSidebar;

const findStateBool = (trueState, falseState) => {
  let finalState = null;
  if (trueState && !falseState) {
    finalState = true;
  } else if (!trueState && falseState) {
    finalState = false;
  }
  return finalState;
};
