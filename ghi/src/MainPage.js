import { useGetPropertiesQuery } from "./app/apiSlice";
import Card from "react-bootstrap/Card";

const MainPage = () => {
  const { data: properties, isLoading } = useGetPropertiesQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="container">
        {properties &&
          properties.map((property) => {
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
                    <Card.Title>{property.price}</Card.Title>
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
    </>
  );
};

export default MainPage;
