import "./edit_form.css";
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
import { PropertyColumns } from "./MainPage";

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
    <div className="row edit-main-cont">
      <div className="offset-2 col-8">
        <form id="edit-property-form">
          <h1 className="form-title">Edit Property</h1>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <div className="main-form-cont">
            <div className="left-cont">
              <div>
                <label htmlFor="state" className="text-muted">
                  State
                </label>
                <div className="input-icon">
                  <i className="fa-solid fa-caret-down"></i>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="State"
                    name="state"
                    id="state"
                    className="form-control input-padding"
                  >
                    <option value="">Choose a state</option>
                    {usStates.map((state) => {
                      return (
                        <option
                          key={state.abbreviation}
                          value={state.abbreviation}
                        >
                          {state.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="city" className="text-muted">
                  city
                </label>
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
              </div>
              <div>
                <label htmlFor="address" className="text-muted">
                  Address
                </label>
                <div className="input-icon">
                  <i className="fa-regular fa-map"></i>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Address"
                    required
                    type="text"
                    name="address"
                    id="address"
                    className="form-control input-padding"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="price">price</label>
                <div className="input-icon">
                  <i className="fa-solid fa-dollar-sign"></i>
                  <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0"
                    required
                    type="number"
                    name="price"
                    id="price"
                    className="form-control input-padding"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="bedrooms" className="text-muted">
                  Bedrooms
                </label>
                <div className="input-icon">
                  <i className="fa-solid fa-bed"></i>
                  <input
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    placeholder="Bedrooms"
                    required
                    type="number"
                    name="bedrooms"
                    id="bedrooms"
                    className="form-control input-padding"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="bathrooms" className="text-muted">
                  Bathrooms
                </label>
                <div className="input-icon">
                  <i className="fa-solid fa-shower"></i>
                  <input
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    placeholder="Bathrooms"
                    required
                    type="number"
                    name="bathrooms"
                    id="bathrooms"
                    className="form-control input-padding"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="sq_footage" className="text-muted">
                  Sq Footage
                </label>
                <div className="input-icon">
                  <i className="fa-solid fa-ruler"></i>
                  <input
                    value={sq_footage}
                    onChange={(e) => setSqFootage(e.target.value)}
                    placeholder="Sq Footage"
                    required
                    type="number"
                    name="sq_footage"
                    id="sq_footage"
                    className="form-control input-padding"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="year_built" className="text-muted">
                  Year Built
                </label>
                <div className="input-icon">
                  <i className="fa-solid fa-calendar-days"></i>
                  <input
                    value={year_built}
                    onChange={(e) => setYearBuilt(e.target.value)}
                    placeholder="Year Built"
                    required
                    type="number"
                    name="year_built"
                    id="year_built"
                    className="form-control input-padding"
                  />
                </div>
              </div>
              <div className="edit-check">
                <div>
                  <input
                    value={multistory}
                    onChange={(e) => setMultistory(!multistory)}
                    type="checkbox"
                    name="multistory"
                    id="multistory"
                    checked={multistory}
                    className="form-check-input"
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
                    className="form-check-input"
                  />
                  <label htmlFor="new_build">New Build</label>
                </div>
              </div>
            </div>
            <div className="right-cont">
              <div className="right-upload">
                <input
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/photo"
                  type="url"
                  pattern="https://.*"
                  className="form-control"
                ></input>
                <button
                  className="btn btn-secondary upload-btn"
                  type="button"
                  onClick={handleImageUpload}
                >
                  <i className="fa-solid fa-upload"></i>
                </button>
              </div>
              <div className="right-images">
                {getImages &&
                  getImages.map((image) => {
                    return (
                      <div key={image.id}>
                        <img alt="" src={image.picture_url}></img>
                        <button
                          type="button"
                          onClick={() =>
                            deleteImage({
                              property_id: propertyId,
                              image_id: image.id,
                            })
                          }
                        >
                          <i className="fa-regular fa-trash-can"></i>{" "}
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="cancel-update">
            <button
              onClick={() => navigate("/properties/mine")}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button onClick={handleSubmit} className="btn btn-secondary">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPropertyForm;
