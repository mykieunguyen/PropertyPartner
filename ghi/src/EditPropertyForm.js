import React, { useState, useEffect } from "react";
import {
  useUpdatePropertyMutation,
  useGetPropertyQuery,
  useGetImagesQuery,
  useDeleteImageMutation,
  useCreateImagesMutation,
} from "./app/apiSlice";
import { usStates } from "./states.js";
import { useParams, useNavigate } from "react-router-dom";
import validator from "validator";

function EditPropertyForm() {
  const { id: propertyId } = useParams();

  const { data: property, isLoading: propertyLoading } =
    useGetPropertyQuery(propertyId);

  const { data: getImages, isLoading: imageLoading } =
    useGetImagesQuery(propertyId);

  const [price, setPrice] = useState("");

  const [city, setCity] = useState("");

  const [bedrooms, setBedrooms] = useState("");

  const [bathrooms, setBathrooms] = useState("");

  const [address, setAddress] = useState("");

  const [sq_footage, setSqFootage] = useState("");

  const [year_built, setYearBuilt] = useState("");

  const [multistory, setMultistory] = useState(false);

  const [new_build, setNewBuild] = useState(false);

  const [state, setState] = useState("");

  const [imageUrl, setImageUrl] = useState("");

  const [updateProperty] = useUpdatePropertyMutation();

  const [deleteImage] = useDeleteImageMutation();

  const [createImages] = useCreateImagesMutation();

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!propertyLoading) {
      setPrice(property.price);
      setCity(property.city);
      setBedrooms(property.bedrooms);
      setBathrooms(property.bathrooms);
      setAddress(property.address);
      setSqFootage(property.sq_footage);
      setYearBuilt(property.year_built);
      setMultistory(property.multistory);
      setNewBuild(property.new_build);
      setState(property.state);
    }
  }, [property, propertyLoading]);

  if (propertyLoading && imageLoading) {
    return <p>...loading</p>;
  }

  const handleImageUpload = (e) => {
    e.preventDefault();
    if (validator.isURL(imageUrl)) {
      setErrorMessage("");
      createImages({
        data: { picture_url: imageUrl },
        property_id: propertyId,
      });
      setImageUrl("");
    } else {
      setErrorMessage("Invalid URL");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProperty({
      data: {
        price,
        city,
        bedrooms,
        bathrooms,
        address,
        sq_footage,
        year_built,
        multistory,
        new_build,
        state,
      },
      property_id: propertyId,
    });
    navigate("/properties/mine");
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <h1>Edit a Property</h1>
        <form id="create-property-form">
          <div className="form-floating mb-3">
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
              required
              type="number"
              name="price"
              id="price"
              className="form-control"
            />
            <label htmlFor="price">price</label>
          </div>
          <div className="form-floating mb-3">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              required
              type="text"
              name="city"
              id="city"
              className="form-control"
            />
            <label htmlFor="city">city</label>
          </div>
          <div className="form-floating mb-3">
            <input
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              placeholder="Bedrooms"
              required
              type="number"
              name="bedrooms"
              id="bedrooms"
              className="form-control"
            />
            <label htmlFor="bedrooms">Bedrooms</label>
          </div>
          <div className="form-floating mb-3">
            <input
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              placeholder="Bathrooms"
              required
              type="number"
              name="bathrooms"
              id="bathrooms"
              className="form-control"
            />
            <label htmlFor="bathrooms">Bathrooms</label>
          </div>
          <div className="form-floating mb-3">
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              required
              type="text"
              name="address"
              id="address"
              className="form-control"
            />
            <label htmlFor="address">Address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              value={sq_footage}
              onChange={(e) => setSqFootage(e.target.value)}
              placeholder="Sq Footage"
              required
              type="number"
              name="sq_footage"
              id="sq_footage"
              className="form-control"
            />
            <label htmlFor="sq_footage">Sq Footage</label>
          </div>
          <div className="form-floating mb-3">
            <input
              value={year_built}
              onChange={(e) => setYearBuilt(e.target.value)}
              placeholder="Year Built"
              required
              type="number"
              name="year_built"
              id="year_built"
              className="form-control"
            />
            <label htmlFor="year_built">Year Built</label>
          </div>
          <div>
            <input
              value={multistory}
              onChange={(e) => setMultistory(!multistory)}
              type="checkbox"
              name="multistory"
              id="multistory"
              checked={multistory}
            />
            <label htmlFor="multistory">Multistory</label>
          </div>
          <div>
            <input
              value={new_build}
              onChange={(e) => setNewBuild(!new_build)}
              type="checkbox"
              name="new_build"
              id="new_build"
              checked={new_build}
            />
            <label htmlFor="new_build">New Build</label>
          </div>
          <div className="form-floating mb-3">
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="State"
              name="state"
              id="state"
              className="form-control"
            >
              <option value="">Choose a state</option>
              {usStates.map((state) => {
                return (
                  <option key={state.abbreviation} value={state.abbreviation}>
                    {state.name}
                  </option>
                );
              })}
            </select>
            <label htmlFor="state">State</label>
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}
            <div>
              <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                type="url"
                pattern="https://.*"
              ></input>
              <button type="button" onClick={handleImageUpload}>
                Upload
              </button>
            </div>
          </div>
          {getImages &&
            getImages.map((image) => {
              return (
                <div key={image.id}>
                  <img
                    style={{ width: "200px" }}
                    alt=""
                    src={image.picture_url}
                  ></img>
                  <button
                    type="button"
                    onClick={() =>
                      deleteImage({
                        property_id: propertyId,
                        image_id: image.id,
                      })
                    }
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          <button onClick={handleSubmit} className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPropertyForm;
