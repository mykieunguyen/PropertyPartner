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
    <div>
      <div>
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
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
      <div>
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
                      property_id: props.property_id,
                      image_id: image.id,
                    })
                  }
                >
                  Delete
                </button>
              </div>
            );
          })}
        <div>
          <button onClick={redirecthandler}>Finish</button>
        </div>
      </div>
    </div>
  );
}

export default CreateImageForm;
