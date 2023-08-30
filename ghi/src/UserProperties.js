import { NavLink } from "react-router-dom";
import { useGetPropertiesForAccountQuery, useDeletePropertyMutation, useUpdatePropertyMutation } from "./app/apiSlice";
import Card from "react-bootstrap/Card";
// import { useNavigate } from 'react-router-dom';


const UserProperties = () => {
    const { data: properties, isLoading } = useGetPropertiesForAccountQuery();

    const [deleteProperty] = useDeletePropertyMutation();


    if (isLoading) {return <div>Loading...</div>};

    return (
    <>
    <div className='container'>
      <div>
        {
          properties?.map((property) => {
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
                      <button className="btn btn-primary" onClick={() => deleteProperty(property.id)}>Unlist</button>
                      <button className="btn btn-primary"><NavLink
                      to={{
                        pathname: `/properties/${property.id}/edit`,
                      }}
                      >Edit
                      </NavLink></button>
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
}

export default UserProperties;
