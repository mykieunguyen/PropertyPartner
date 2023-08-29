import React, { useState, useEffect } from 'react';
import { useCreatePropertyMutation} from './app/apiSlice';
import ErrorNotification from './ErrorNotification';
import {usStates} from './states.js';
import CreateImageForm from './CreateImageForm';


function CreatePropertyForm () {

    const [price, setPrice] = useState('');

    const [city, setCity] = useState('');

    const [bedrooms, setBedrooms] = useState('');

    const [bathrooms, setBathrooms] = useState('');

    const [address, setAddress] = useState('');

    const [sq_footage, setSqFootage] = useState('');

    const [year_built, setYearBuilt] = useState('');

    const [multistory, setMultistory] = useState(false);

    const [new_build, setNewBuild] = useState(false);

    const [error, setError] = useState('');

    const [state, setState] = useState('');

    const [createProperty, result] = useCreatePropertyMutation();

    const [propertyFormStatus, setPropertyFormStatus] = useState(false);

    const [propertyId, setPropertyId] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        createProperty({price, city, bedrooms, bathrooms, address, sq_footage, year_built, multistory, new_build, state});
        setPropertyFormStatus(!propertyFormStatus)
      }

    useEffect(() =>{
      if (result.isSuccess) {
        setPropertyId(result.data.id)
      } else if (result.isError) {
        setError(result.error);
    }
    }, [result, setError])
    console.log(result)

      return (
        <div className="row">
        <div className="offset-3 col-6">
          {!propertyFormStatus?(<div className="shadow p-4 mt-4">
            <h1>Add a Property</h1>
            <ErrorNotification error={error} />
            <form onSubmit={handleSubmit} id="create-property-form">
               <div className="form-floating mb-3">
                <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0" required type="number" name="price" id="price" className="form-control" />
                <label htmlFor="price">price</label>
              </div>
              <div className="form-floating mb-3">
                <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" required type="text" name="city" id="city" className="form-control" />
                <label htmlFor="city">city</label>
              </div>
              <div className="form-floating mb-3">
                <input value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} placeholder="Bedrooms" required type="number" name="bedrooms" id="bedrooms" className="form-control" />
                <label htmlFor="bedrooms">Bedrooms</label>
              </div>
              <div className="form-floating mb-3">
                <input value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} placeholder="Bathrooms" required type="number" name="bathrooms" id="bathrooms" className="form-control" />
                <label htmlFor="bathrooms">Bathrooms</label>
              </div>
              <div className="form-floating mb-3">
                <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required type="text" name="address" id="address" className="form-control" />
                <label htmlFor="address">Address</label>
              </div>
              <div className="form-floating mb-3">
                <input value={sq_footage} onChange={(e) => setSqFootage(e.target.value)} placeholder="Sq Footage" required type="number" name="sq_footage" id="sq_footage" className="form-control" />
                <label htmlFor="sq_footage">Sq Footage</label>
              </div>
              <div className="form-floating mb-3">
                <input value={year_built} onChange={(e) => setYearBuilt(e.target.value)} placeholder="Year Built" required type="number" name="year_built" id="year_built" className="form-control" />
                <label htmlFor="year_built">Year Built</label>
              </div>
              <div>
                <input value={multistory} onChange={(e) => setMultistory(!multistory)} type="checkbox" name="multistory" id="multistory" />
                <label htmlFor="multistory">Multistory</label>
              </div>
              <div>
                <input value={new_build} onChange={(e) => setNewBuild(!new_build)} type="checkbox" name="new_build" id="new_build" />
                <label htmlFor="new_build">New Build</label>
              </div>
              <div className="form-floating mb-3">
                <select value={state} onChange={(e) => setState(e.target.value)} placeholder="State" name="state" id="state" className="form-control">
                    <option value="">Choose a state</option>
                    {usStates.map(state => {
                        return (
                            <option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>
                        );
                    })}
                </select>
                <label htmlFor="state">State</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>)
          :(<CreateImageForm property_id={propertyId?propertyId:null}/>)}
        </div>
      </div>
    );
};



export default CreatePropertyForm;
