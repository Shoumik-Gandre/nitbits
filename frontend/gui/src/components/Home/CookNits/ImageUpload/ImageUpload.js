import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles'
import defaultImagePreview from '../../../../static/images/image_select_01.jpg';
import './ImageUpload.css';

const useStyles = makeStyles(theme => ({
  photo: {
    textAlign: 'center',
    backgroundColor: 'rgb(28 37 35)',
    padding: theme.spacing(1)
  },
  media: {
    marginTop: "30px",
    height: 200
  },
}))

function ImageUpload({ type, handleContentImage, handleStyledImage }) {

  const classes = useStyles();

  const [file, setFile] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log("handle uploading-", file);
    if (type === 'c') handleContentImage(file);
    else if (type === 's') handleStyledImage(file);
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };

    reader.readAsDataURL(file);

    // if(type === 'c') handleContentImage(file);
    // else if(type === 's') handleStyledImage(file);
    console.log(file);
  };

  let $imagePreview = null;
  if (imagePreviewUrl) {
    // $imagePreview = <img src={imagePreviewUrl} alt="img" />;

    $imagePreview = (<div className={classes.photo}>
      <img
        className={classes.media}
        src={imagePreviewUrl}
        alt="alt"
      />
    </div>);
  } else {
    $imagePreview = (
      <div className={classes.photo}>
        <img
          className={classes.media}
          src={defaultImagePreview}
          alt="alt"
        />
        <h3>Please select an Image for Preview</h3>
      </div>
    );
  }

  return (
    <div className="previewComponent">
      <form onSubmit={handleSubmit}>
        <input className="fileInput" type="file" onChange={handleImageChange} />
        <button type="submit">Submit</button>
        {/* <button className="submitButton" type="submit" onClick={handleSubmit}>
          Upload Image
        </button> */}
      </form>
      <div className="imgPreview">{$imagePreview}</div>
    </div>
  );
}

export default ImageUpload;
