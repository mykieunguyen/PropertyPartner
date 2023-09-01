import React, { useState, useEffect } from "react";

const FilterSidebar = (props) => {
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

  useEffect(() => {
    setFilterPrice("");
    setFilterFootage("");
    setMinNumOfBeds(0);
    setMaxNumOfBaths(100);
    setMinNumOfBaths(0);
    setMaxNumOfBaths(100);
    setFilterSinglestory(false);
    setFilterMultistory(false);
    setFilterNew(false);
    setFilterOld(false);
  }, [props.properties]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const multistoryState = findStateBool(filterMultistory, filterSinglestory);
    const newState = findStateBool(filterNew, filterOld);
    let filteredProperties = [...props.properties];

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
    props.setFilteredProperties(filteredProperties);
  };

  return (
    <>
      <div className="filter-container">
        <div className="filter-container-top">
          <div className="filter-full-width">
            <div>
              <h6>Max Price</h6>
              {filterPrice && <p>${parseInt(filterPrice).toLocaleString()}</p>}
            </div>
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
          </div>
          <div className="filter-full-width">
            <div>
              <h6>Max Square Feet</h6>
              {filterFootage && (
                <p>{parseInt(filterFootage).toLocaleString()} sqft</p>
              )}
            </div>
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
          </div>
          <div className="filter-bed-bath">
            <div>
              <h6>Bedrooms</h6>
            </div>
            <div className="min-max">
              <div>
                <label>min</label>
                <input
                  className="form-control"
                  type="number"
                  max="100"
                  value={minNumOfBeds}
                  onChange={(e) => {
                    setMinNumOfBeds(e.target.value);
                  }}
                  id="square_footage"
                />
              </div>
              <div>
                <label>max</label>
                <input
                  className="form-control"
                  type="number"
                  max="100"
                  value={maxNumOfBeds}
                  onChange={(e) => {
                    setMaxNumOfBeds(e.target.value);
                  }}
                  id="square_footage"
                />
              </div>
            </div>
            <div>
              <h6>Bathrooms</h6>
            </div>
            <div className="min-max">
              <div>
                <label>min</label>
                <input
                  className="form-control"
                  type="number"
                  max="100"
                  value={minNumOfBaths}
                  onChange={(e) => {
                    setMinNumOfBaths(e.target.value);
                  }}
                  id="square_footage"
                />
              </div>
              <div>
                <label>max</label>
                <input
                  className="form-control"
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
          </div>
        </div>
        <div className="filter-container-bottom">
          <h6>Property Characteristics</h6>
          <div className="filter-multistory-new">
            <div>
              <div>
                <input
                  type="checkbox"
                  id="singlestory"
                  checked={filterSinglestory}
                  onChange={(e) => setFilterSinglestory(!filterSinglestory)}
                />
                <label htmlFor="singlestory">Singlestory</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="multistory"
                  checked={filterMultistory}
                  onChange={(e) => setFilterMultistory(!filterMultistory)}
                />
                <label htmlFor="multistory">Multistory</label>
              </div>
            </div>

            <div>
              <div>
                <input
                  type="checkbox"
                  id="new_build"
                  checked={filterNew}
                  onChange={(e) => setFilterNew(!filterNew)}
                />
                <label htmlFor="new_build">New</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="old_build"
                  checked={filterOld}
                  onChange={(e) => setFilterOld(!filterOld)}
                />
                <label htmlFor="old_build">Old</label>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleFilterSubmit}
          type="button"
          className="btn btn-secondary"
        >
          APPLY
        </button>
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
