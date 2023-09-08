import "./form.css";
import React, { useState, useEffect } from "react";
import { useCreatePropertyMutation } from "./app/apiSlice";
import ErrorNotification from "./ErrorNotification";
import { usStates } from "./states.js";
import CreateImageForm from "./CreateImageForm";

function CreatePropertyForm() {
  const [price, setPrice] = useState("");

  const [city, setCity] = useState("");

  const [bedrooms, setBedrooms] = useState("");

  const [bathrooms, setBathrooms] = useState("");

  const [address, setAddress] = useState("");

  const [sq_footage, setSqFootage] = useState("");

  const [year_built, setYearBuilt] = useState("");

  const [multistory, setMultistory] = useState(false);

  const [new_build, setNewBuild] = useState(false);

  const [error, setError] = useState("");

  const [state, setState] = useState("");

  const [createProperty, result] = useCreatePropertyMutation();

  const [propertyFormStatus, setPropertyFormStatus] = useState(false);

  const [propertyId, setPropertyId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    createProperty({
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
    });
    setPropertyFormStatus(!propertyFormStatus);
  };

  useEffect(() => {
    if (result.isSuccess) {
      setPropertyId(result.data.id);
    } else if (result.isError) {
      setError(result.error);
    }
  }, [result, setError]);

  return (
    <div className="main-container">
      {!propertyFormStatus ? (
        <div className="form-container">
          <div className="form-image"></div>
          <div className="create-property-container">
            <h1>List Property</h1>
            <ErrorNotification error={error} />
            <form onSubmit={handleSubmit} id="create-property-form">
              <div className="form-group">
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
              <div className="form-group">
                <label htmlFor="city" className="text-muted">
                  City
                </label>
                <div className="input-icon">
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
              </div>
              <div className="form-group">
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
              <div className="form-group">
                <label htmlFor="price" className="text-muted">
                  Price
                </label>
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
              <div className="form-group">
                <label htmlFor="year_built" className="text-muted">
                  Year Built
                </label>
                <div className="input-icon">
                  <i className="fa-solid fa-calendar-days"></i>
                  <input
                    value={year_built}
                    onChange={(e) => setYearBuilt(e.target.value)}
                    placeholder="2022"
                    required
                    type="number"
                    name="year_built"
                    id="year_built"
                    className="form-control input-padding"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="sq_footage" className="text-muted">
                    Square Footage
                  </label>
                  <div className="input-icon">
                    <i className="fa-solid fa-ruler"></i>
                    <input
                      value={sq_footage}
                      onChange={(e) => setSqFootage(e.target.value)}
                      placeholder="0"
                      required
                      type="number"
                      name="sq_footage"
                      id="sq_footage"
                      className="form-control input-padding"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="bedrooms" className="text-muted">
                  Bedrooms
                </label>
                <div className="input-icon">
                  <i className="fa-solid fa-bed"></i>

                  <input
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    placeholder="0"
                    required
                    type="number"
                    name="bedrooms"
                    id="bedrooms"
                    className="form-control input-padding"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="bathrooms" className="text-muted">
                  Bathrooms
                </label>
                <div className="input-icon">
                  <i className="fa-solid fa-shower"></i>
                  <input
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    placeholder="0"
                    required
                    type="number"
                    name="bathrooms"
                    id="bathrooms"
                    className="form-control input-padding"
                  />
                </div>
              </div>
              <div className="check-container">
                <div>
                  <input
                    value={multistory}
                    onChange={(e) => setMultistory(!multistory)}
                    type="checkbox"
                    name="multistory"
                    id="multistory"
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
                    className="form-check-input"
                  />
                  <label htmlFor="new_build">New Build</label>
                </div>
              </div>
              <div className="btn-container">
                <p className="text-muted">
                  *Images can be added in the next step
                </p>
                <button className="btn btn-secondary">Add</button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="form-container">
          <CreateImageForm property_id={propertyId ? propertyId : null} />
        </div>
      )}
    </div>
  );
}

export default CreatePropertyForm;
