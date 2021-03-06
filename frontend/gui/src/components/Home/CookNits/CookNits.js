import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import ImageUpload from './ImageUpload/ImageUpload';
import PostImage from './PostImage/PostImage';
import { makeStyles } from '@material-ui/core/styles'
// import avatarImg from '../../../static/images/img_01.jpeg';
// import postDefault from "../../../static/images/post-default.jpg";
import Button from "@material-ui/core/Button";
import './CookNits.css'
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    photo: {
        textAlign: 'center',
        backgroundColor: 'rgb(28 37 35)',
        padding: theme.spacing(1)
    },
    media: {
        height: 400,
        width: 400,
    },
}))

function CookNits({ currentUser }) {

    const classes = useStyles();
    console.log(window.scrollY);
    const [contentImage, setContentImage] = useState(null);
    const [styleImage, setStyleImage] = useState(null);
    const [nstImage, setNstImage] = useState(null);
    const [postId, setPostId] = useState(null);

    const handleContentImage = (img) => {
        setContentImage(img);
        console.log("c : ", img);
    }

    const handleStyledImage = (img) => {
        setStyleImage(img);
        console.log("s : ", img);
    }

    const handleNST = async () => {
        // console.log('handleNST:', localStorage.getItem('token'))

        try {
            let uploadData = new FormData();
            uploadData.append('title', '')
            uploadData.append('description', '')
            uploadData.append('content_image', contentImage, contentImage.name)
            uploadData.append('style_image', styleImage, styleImage.name)
            console.log(`Token ${localStorage.getItem('token')}`)
            const response = await axios.post(
                `http://127.0.0.1:8000/posts/create/`,
                uploadData,
                {
                    headers: {
                        ...axios.defaults.headers,
                        "content-type": "multipart/form-data",
                        "Authorization": `Token ${localStorage.getItem('token')}`,
                    },
                }
            );

            setNstImage(`http://127.0.0.1:8000${response.data.imagelink}`);
            window.scrollTo(0, 4000);
            setPostId(response.data.pk)
            console.log("handleNST : ", response);
        } catch (error) {
            console.log(error);
        }
    };

    // const handleDownload = () => {/* download neural styled transfer image*/}

    return (
        <div className="cooknits-wrapper">
            {/* <h1>CookNits</h1> */}
            <Grid container spacing={8}>
                <Grid item xs={7} sm={6}>
                    <h2>Content Image : </h2>
                    <ImageUpload type='c' handleContentImage={handleContentImage} handleStyledImage={handleStyledImage} />
                </Grid>
                <Grid item xs={7} sm={6}>
                    <h2>Styled Image : </h2>
                    <ImageUpload type='s' handleContentImage={handleContentImage} handleStyledImage={handleStyledImage} />
                </Grid>
            </Grid>
            <Grid className="get_nst_btn_wrap" container spacing={8}>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleNST}
                        className={classes.submit}
                    >
                     Get NST 
                    </Button>
            </Grid>
            {
                nstImage && (
                    <Grid container spacing={8}>
                        <Grid item xs={8} sm={7}>
                            <h2> Neural Styled Image : </h2>
                            <div className={classes.photo}>
                                <img
                                    className={classes.media}
                                    src={nstImage}
                                    alt='nst'
                                />
                                {/* <button onClick={handleDownload}>Download</button> */}
                            </div>
                        </Grid>
                        <Grid item xs={6} sm={5}>
                            <PostImage pk={postId}/>
                        </Grid>
                    </Grid>
                )
            }
        </div>
    )
}

export default CookNits;
