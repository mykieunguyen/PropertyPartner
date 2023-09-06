import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useGetPropertiesForAccountQuery, useDeletePropertyMutation } from "./app/apiSlice";
import Card from "react-bootstrap/Card";
import DeleteConfirmation from "./DeleteConfirmation";


const UserProperties = () => {
    const { data: properties, isLoading} = useGetPropertiesForAccountQuery();

    const [deleteProperty] = useDeletePropertyMutation();

    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);

    const [deleteMessage, setDeleteMessage] = useState(null);

    const [propertyId, setPropertyId] = useState(null);

    const showDeleteModal = () => {
      setDeleteMessage('Are you sure you want to delete the property?');
      setDisplayConfirmationModal(true);
    }

    const hideConfirmationModal = () => {
      setDisplayConfirmationModal(false);
    }

    const submitDelete = (property) => {
      setDisplayConfirmationModal(false);
      deleteProperty(property);
    }

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
                      <button className="btn btn-primary" onClick={() => {
                      setPropertyId(property.id)
                      showDeleteModal()
                      }}>Unlist</button>
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
                <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={() => submitDelete(propertyId)} hideModal={hideConfirmationModal} message={deleteMessage} />
              </div>
            );
          })}
      </div>
    </div>
    </>
  );
}

export default UserProperties;
