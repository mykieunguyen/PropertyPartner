import { useParams } from "react-router-dom";
import { useGetPropertyQuery } from "./app/apiSlice";
import { useGetImagesQuery } from "./app/apiSlice";

const PropertyDetail = () => {
  const { id: propertyId } = useParams();
  const { data: property, isLoading: propertyLoading } =
    useGetPropertyQuery(propertyId);
  const { data: images, isLoading: imagesLoading } =
    useGetImagesQuery(propertyId);

  if (propertyLoading || imagesLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <div>
        {images.map((image) => {
          return <img key={image.id} src={image.picture_url}></img>;
        })}
      </div>
      <div>
        <div>
          <div>
            <h3>for sale</h3>
            <h3>${property.price}</h3>
          </div>
          <div>
            <h6>
              {property.bedrooms}bds /{property.bathrooms}ba
            </h6>
            <h6>{property.sq_footage} sqft</h6>
            {property.multistory ? <h6>multistory</h6> : <h6>singlestory</h6>}
          </div>
          <div>
            {property.new_build ? <h6>NEW build</h6> : <h6>OLD build</h6>}
            <h6>{property.address}</h6>
          </div>
        </div>
        <div>
          <h3>Interested? Contact</h3>
          <p>
            {property.owner.first_name} {property.owner.last_name}
          </p>
          <p>Email: {property.owner.email}</p>
          <p>Phone Number: {property.owner.phone_number}</p>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
