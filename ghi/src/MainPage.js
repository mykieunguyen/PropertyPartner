import { useGetPropertiesQuery } from "./app/apiSlice";
import Card from "react-bootstrap/Card";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "./main.css";

import FilterSidebar from "./FilterSidebar";
import MainPageBanner from "./MainPageBanner";

const MainPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const { data: properties, isLoading } = useGetPropertiesQuery();
  const [props, setProps] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  useEffect(() => {
    if (isLoading || !properties) return;
    setProps(properties);
    setFilteredProperties(properties);
  }, [isLoading, properties]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleLocationSearch = () => {
    let filteredProperties = properties.filter(
      (property) =>
        property.city.toLowerCase().includes(searchInput.toLowerCase()) ||
        property.state.toLowerCase().includes(searchInput.toLowerCase())
    );
    setProps(filteredProperties);
    setFilteredProperties(filteredProperties);
  };

  return (
    <>
      <div className="container-fluid mainpage">
        <MainPageBanner />
        <div className="search-container">
          <input
            type="search"
            id="form1"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="form-control"
            placeholder="city or state"
          />
          <button
            onClick={handleLocationSearch}
            type="button"
            className="btn btn-secondary"
            id="search-button"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <div className="properties-filter-container">
          <FilterSidebar
            originalProps={properties}
            properties={props}
            setFilteredProperties={setFilteredProperties}
          />
          <div className="properties-container">
            {PropertyColumns(filteredProperties).map((col, index) => {
              return (
                <div className="col" key={index}>
                  {col.map((property) => {
                    return (
                      <div className="row" key={property.id}>
                        <Card style={{ width: "85%" }}>
                          {(property.images[0]?.picture_url && (
                            <Card.Img
                              variant="top"
                              src={property.images[0].picture_url}
                            />
                          )) || (
                            <Card.Img
                              variant="top"
                              src="https://st3.depositphotos.com/3907761/17915/v/450/depositphotos_179157200-stock-illustration-home-line-vector-icon.jpg"
                            />
                          )}
                          <Card.Body>
                            <Card.Title>
                              <NavLink
                                to={{
                                  pathname: `/properties/${property.id}`,
                                }}
                                className="stretched-link"
                              >
                                ${property.price.toLocaleString()}
                              </NavLink>
                            </Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                              <i className="fa-solid fa-location-dot"></i>
                              {property.city}, {property.state}
                            </Card.Subtitle>
                            <Card.Text>
                              <span>{property.bedrooms}BDS</span>
                              <span>|</span>
                              <span>{property.bathrooms}BA</span>
                              <span>|</span>
                              <span>{property.sq_footage}sqft</span>
                            </Card.Text>
                            <footer>
                              {capitalizeFirstLetter(property.address)}
                            </footer>
                          </Card.Body>
                        </Card>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;

export const PropertyColumns = (propsList) => {
  const groups = [[], [], []];
  let col = 0;

  for (const prop of propsList) {
    if (col === 0) {
      groups[0].push(prop);
      col += 1;
    } else if (col === 1) {
      groups[1].push(prop);
      col += 1;
    } else {
      groups[2].push(prop);
      col = 0;
    }
  }

  return groups;
};

export function capitalizeFirstLetter(string) {
  let converted = string
    .toLowerCase()
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(" ");

  return converted;
}
