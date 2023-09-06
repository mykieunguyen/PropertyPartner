import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ErrorNotification from "./ErrorNotification";
import {
  useCreateImagesMutation,
  useGetImagesQuery,
  useDeleteImageMutation,
} from "./app/apiSlice";
import validator from "validator";

function CreateImageForm(props) {
  const { data: getImages, isLoading: imageLoading } = useGetImagesQuery(
    props.property_id
  );
  const [deleteImage] = useDeleteImageMutation();
  const [createImages] = useCreateImagesMutation();
  const [imageUrl, setImageUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    e.preventDefault();
    if (validator.isURL(imageUrl)) {
      setErrorMessage("");
      createImages({
        data: { picture_url: imageUrl },
        property_id: props.property_id,
      });
      setImageUrl("");
    } else {
      setErrorMessage("Invalid URL");
    }
  };

  const redirecthandler = (e) => {
    e.preventDefault();
    navigate("/properties/mine");
  };

  return (
    <div className="image-form">
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <div className="image-upload-container">
        <h3>
          <i class="fa-solid fa-images"></i> Upload Property Images
        </h3>
        <div>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://images.unsplash.com/photo"
            type="url"
            pattern="https://.*"
            className="form-control"
            id="image_url"
          ></input>
          <button
            className="btn btn-secondary upload-btn"
            type="button"
            onClick={handleImageUpload}
          >
            <i className="fa-solid fa-upload"></i>
          </button>
        </div>
      </div>
      <div className="container images-cont">
        {getImages &&
          getImages.map((image) => {
            return (
              <div key={image.id}>
                <button
                  type="button"
                  onClick={() =>
                    deleteImage({
                      property_id: props.property_id,
                      image_id: image.id,
                    })
                  }
                >
                  <i className="fa-regular fa-trash-can"></i>{" "}
                </button>
                <img alt="" src={image.picture_url}></img>
              </div>
            );
          })}
      </div>
      <div className="finish-btn">
        <button className="btn btn-secondary" onClick={redirecthandler}>
          Finish
        </button>
      </div>
    </div>
  );
}

export default CreateImageForm;
