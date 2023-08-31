import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorNotification from './ErrorNotification';
import { useCreateImagesMutation } from './app/apiSlice';


function CreateImageForm (props) {

    const navigate = useNavigate();

    const [imageList, setImageList] = useState([]);

    const [error, setError] = useState('');

    const [createImages, result] = useCreateImagesMutation();

    const addImageClick = (e) => {
        e.preventDefault();
        setImageList([...imageList, null])

    }

    const imageLinkChangeHandler = (e, imageIndex) => {
        e.preventDefault();
        imageList[imageIndex] = e.target.value;
        setImageList([...imageList])
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const property_id = props.property_id
        if (property_id === null) {
            return
        }
        for (let image of imageList) {
          if (!image) {continue}
            await createImages({'data': {"picture_url": image}, "property_id": property_id})
        }
    }

    useEffect(() =>{
      if (result.isSuccess) {
        navigate("/properties/mine")
      } else if (result.isError) {
        setError(result.error);
    }
    }, [result, setError, navigate])

    return (
        <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add a Image</h1>
            <ErrorNotification error={error} />
            <form onSubmit={handleSubmit} id="create-property-form">
                <button onClick={addImageClick}>+</button>
               <div className="form-floating mb-3">
                {imageList.map((image, imageIndex) => {return (<input onChange={e => imageLinkChangeHandler(e, imageIndex)} key={imageIndex} value={image===null?'':image} placeholder="Picture URL" type="text" name="picture_url" id="picture_url" className="form-control" />)})}
              </div>
              <button type="submit">Submit</button>
            </form>
            </div>
            </div>
            </div>

    )
}

export default CreateImageForm
