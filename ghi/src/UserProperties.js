import "./user_dashboard.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  useGetPropertiesForAccountQuery,
  useDeletePropertyMutation,
} from "./app/apiSlice";
import Card from "react-bootstrap/Card";
import DeleteConfirmation from "./DeleteConfirmation";
import { capitalizeFirstLetter } from "./MainPage";

const UserProperties = () => {
  const { data: properties, isLoading } = useGetPropertiesForAccountQuery();

  const [deleteProperty] = useDeletePropertyMutation();

  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);

  const [deleteMessage, setDeleteMessage] = useState(null);

  const [propertyId, setPropertyId] = useState(null);

  const showDeleteModal = () => {
    setDeleteMessage("Are you sure you want to delete the property?");
    setDisplayConfirmationModal(true);
  };

  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  const submitDelete = (property) => {
    setDisplayConfirmationModal(false);
    deleteProperty(property);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="main-cont">
        <div className="container sec-cont">
          <div className="row top-container">
            <h1>Your Active Properties</h1>
            <button className="btn btn-secondary">
              <NavLink to="/properties/new"> New Listing</NavLink>
            </button>
          </div>
          <div className="user-props-container">
            {properties?.map((property) => {
              return (
                <div key={property.id}>
                  <Card>
                    <Card.Header>
                      <button className="edit-btn">
                        <NavLink
                          to={{
                            pathname: `/properties/${property.id}/edit`,
                          }}
                        >
                          {" "}
                          <i className="fa-solid fa-pen-to-square"></i>
                        </NavLink>
                      </button>
                    </Card.Header>
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
                        ${property.price.toLocaleString()}{" "}
                        <NavLink
                          to={{
                            pathname: `/properties/${property.id}`,
                          }}
                          className="stretched-link"
                        ></NavLink>
                      </Card.Title>
                      <Card.Subtitle>
                        <i className="fa-solid fa-location-dot"></i>
                        {property.city}, {property.state}
                      </Card.Subtitle>
                      <Card.Text>
                        <span>
                          {property.bedrooms}{" "}
                          <i className="fa-solid fa-bed"></i>{" "}
                        </span>
                        <span>|</span>
                        <span>
                          {property.bathrooms}{" "}
                          <i className="fa-solid fa-bath"></i>{" "}
                        </span>
                        <span>|</span>
                        <span>{property.sq_footage} sqft</span>
                      </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <p> {capitalizeFirstLetter(property.address)}</p>
                      <button
                        className="unlist-btn"
                        onClick={() => {
                          setPropertyId(property.id);
                          showDeleteModal();
                        }}
                      >
                        Unlist
                      </button>
                    </Card.Footer>
                  </Card>
                  <DeleteConfirmation
                    showModal={displayConfirmationModal}
                    confirmModal={() => submitDelete(propertyId)}
                    hideModal={hideConfirmationModal}
                    message={deleteMessage}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProperties;
