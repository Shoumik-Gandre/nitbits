import React, {useState} from 'react'
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import './PostImage.css';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    card: {
      maxWidth: 450,
      margin: "auto",
      textAlign: "center",
      marginTop: theme.spacing(5),
      paddingBottom: theme.spacing(2),
      backgroundColor: "#2a3840",
    },
    title: {
      marginTop: theme.spacing(2),
      color: "#00FFFF",
      // color: theme.palette.openTitle,
    },
    textField: {
      marginTop: "40px",
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 300,
    },
    submit: {
      margin: "auto",
      marginBottom: theme.spacing(2),
    },
  }));

function PostImage({ pk }) {

    const classes = useStyles();

    const [postDescription, setPostDescription] = useState("");

    const handlePostDescription = (event) => {
        setPostDescription(event.target.value);
    };

    const handlePostUpload = () => {
        axios({
            method: 'put',
            url: `http://127.0.0.1:8000/posts/${pk}/upload/`,
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            data: {
                'description': postDescription,
                'is_public': true
            }
        }).then(response=>{
            console.log(response)
        });
    }

    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h6" className={classes.title}>
                    Upload as Post
                </Typography>
                <TextField
                    placeholder="Enter post description ..."
                    multiline
                    value={postDescription}
                    className={classes.textField}
                    onChange={handlePostDescription}
                    rows={6}
                    rowsMax={10}
                />
            </CardContent>
            <CardActions>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handlePostUpload}
                    className={classes.submit}
                >
                    Upload
                </Button>
            </CardActions>
        </Card>
    )
}

export default PostImage;
