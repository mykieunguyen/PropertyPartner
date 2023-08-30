import { useGetPropertiesQuery } from "./app/apiSlice";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import "./main.css";

import FilterSidebar from "./FilterSidebar";
import MainPageBanner from "./MainPageBanner";

const MainPage = () => {
  const { data: properties, isLoading } = useGetPropertiesQuery();
  const [props, setProps] = useState([]);

  useEffect(() => {
    if (isLoading || !properties) return;
    setProps(properties);
  }, [isLoading, properties]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="container">
        <MainPageBanner />
        <div className="properties-container">
          <FilterSidebar
            originalProps={properties}
            properties={props}
            setProps={setProps}
          />
          <div>
            <div className="input-group"></div>
            <div>
              {props.map((property) => {
                return (
                  <div key={property.id}>
                    <Card style={{ width: "18rem" }}>
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
                        <Card.Title>${property.price}</Card.Title>
                        <Card.Subtitle>
                          {property.city}, {property.state}
                        </Card.Subtitle>
                        <Card.Text>
                          <span>{property.bedrooms} BDS </span>
                          <span>{property.bathrooms} BA </span>
                          <span>{property.sq_footage} SQFT </span>
                        </Card.Text>
                        <footer>{property.address}</footer>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
