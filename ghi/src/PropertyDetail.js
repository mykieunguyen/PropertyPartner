import { useParams } from "react-router-dom";
import { useGetPropertyQuery } from "./app/apiSlice";
import { useGetImagesQuery } from "./app/apiSlice";
import "./detail_page.css";
import { capitalizeFirstLetter } from "./MainPage";

const PropertyDetail = () => {
  const { id: propertyId } = useParams();
  const { data: property, isLoading: propertyLoading } =
    useGetPropertyQuery(propertyId);
  const { data: images, isLoading: imagesLoading } =
    useGetImagesQuery(propertyId);

  if (propertyLoading || imagesLoading) {
    return <p>Loading...</p>;
  }

  console.log(property);
  return (
    <div className="container-fluid">
      <div className="img-container">
        <div className="main-img">
          <img className="img-fluid" src={images[0].picture_url}></img>
        </div>
        {/* <div className="extra-img">
          {images.slice(1, 5).map((image) => {
            return (
              <img
                key={image.id}
                src={image.picture_url}
                className="img-thumbnail"
              ></img>
            );
          })}
        </div> */}
        <div className="extra-img">
          <div>
            {images[1] && <img src={images[1].picture_url}></img>}
            {images[2] && <img src={images[2].picture_url}></img>}
          </div>
          <div>
            {images[3] && <img src={images[3].picture_url}></img>}
            {images[4] && <img src={images[4].picture_url}></img>}
          </div>
        </div>
      </div>
      <div className="detail_container">
        <div className="prop_container container">
          <div>
            <h3>
              <i className="fa-solid fa-flag"> for sale</i>
            </h3>
            <h3>${property.price.toLocaleString()}</h3>
          </div>
          <div className="bed-bath">
            <h6>
              {property.bedrooms}bds /{property.bathrooms}ba
            </h6>
            <h6>{property.sq_footage} sqft</h6>
            {property.multistory ? <h6>multistory</h6> : <h6>singlestory</h6>}
          </div>
          <div>
            {property.new_build ? <h6>New build</h6> : <h6>Old build</h6>}
            <h6>Built in {property.year_built}</h6>
            <h6>{capitalizeFirstLetter(property.address)}</h6>
          </div>
        </div>
        <div className="container">
          <div className="contacts_container">
            <h3>
              <i class="fa-solid fa-address-card"> Contacts</i>
            </h3>
            <div>
              <p>
                {property.owner.first_name} {property.owner.last_name}
              </p>
              <p>Email: {property.owner.email}</p>
              <p>Phone Number: {property.owner.phone_number}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
