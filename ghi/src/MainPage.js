import { useGetPropertiesQuery } from "./app/apiSlice";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";


const MainPage = () => {
  const { data: properties, isLoading } = useGetPropertiesQuery();
  const [searchInput, setSearchInput] = useState('');
  const [props, setProps] = useState([]);

  useEffect(() => {
    if (isLoading || !properties) return;

    const searchedProperties = searchInput
    ? properties.filter(property => (property.city.toLowerCase().includes(searchInput.toLowerCase()) || property.state.toLowerCase().includes(searchInput.toLowerCase())))
    : properties;
    setProps(searchedProperties)
  }, [searchInput, isLoading, properties])

  if (isLoading) {
    return <p>Loading...</p>;
  }



  return (
    <>
    <div className='container'>
      <div className="input-group">
        <div className="form-outline">
          <input type="search" id="form1" onChange={(e) => setSearchInput(e.target.value)} className="form-control" />
          <label className="form-label" htmlFor="form1">Search</label>
        </div>
      </div>
      <div>
        {
          props.map((property) => {
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
    </>
  );
};

export default MainPage;
