import React from 'react'
import Grid from '@material-ui/core/Grid'
import ImageUpload from './ImageUpload/ImageUpload';
import PostImage from './PostImage/PostImage';
import {makeStyles} from '@material-ui/core/styles'
import avatarImg from '../../../static/images/img_01.jpeg';
import './CookNits.css'

const useStyles = makeStyles(theme => ({
    photo: {
      textAlign: 'center',
      backgroundColor: 'rgb(28 37 35)',
      padding:theme.spacing(1)
    },
    media: {
      height: 400,
    },
}))

function CookNits() {

    const classes = useStyles();

    const handleDownload = () => {
        // download neural styled transfer image
    }

    return (
        <div className="cooknits-wrapper">
            <h1>CookNits</h1>
            <Grid container spacing={8}>
                <Grid item xs={7} sm={6}>
                    <h2>Content Image : </h2>
                    <ImageUpload />
                </Grid>
                <Grid item xs={7} sm={6}>
                    <h2>Styled Image : </h2>
                    <ImageUpload />
                </Grid>
            </Grid>
            <Grid container spacing={8}>
                <Grid item xs={8} sm={7}>
                    <h2> Neural Styled Image : </h2>
                    <div className={classes.photo}>
                        <img
                        className={classes.media}
                        // src={'/api/posts/photo/'+post.image}
                        src={avatarImg}
                        />
                        {/* <button onClick={handleDownload}>Download</button> */}
                    </div>
                </Grid>
                <Grid item xs={6} sm={5}>
                   <PostImage />
                </Grid>
            </Grid>
        </div>
    )
}

export default CookNits
