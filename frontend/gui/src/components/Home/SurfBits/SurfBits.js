import React, { useState, useEffect } from 'react'
//import { all_posts } from './surfbitData/surfbit_data';
import PostList from '../../PostList/PostList';
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import axios from 'axios';
import './SurfBits.css'

const useStyles = makeStyles((theme) => ({
    submit: {
        margin: "auto",
        marginBottom: theme.spacing(2),
    },
}));

function SurfBits({ currentUser }) {

    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const [sortBy, setSortBy] = useState("hot");
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        let source = axios.CancelToken.source();

        const loadData = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/posts/sortby/hot/`,
                    { cancelToken: source.token, }
                );
                setPosts(response.data);
            } catch (err) {
                if (axios.isCancel(err)) {
                    console.log("dashboard caught cancel");
                } else {
                    throw err;
                }
            }
        }

        loadData();

        return () => {
            source.cancel();
        };
    }, []);

    const handlePosts = async() => {
        try {
            const response = await axios({
                method: 'GET',
                url: `http://127.0.0.1:8000/posts/home/`,
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                }
            });
            setPosts(response.data);
        } catch (err) {
            console.log("handlePosts", err);
        }
    }

    const handleChange = (event) => {
        let temp = event.target.value;
        setSortBy(temp);
        axios({
            method: 'GET',
            url: `http://127.0.0.1:8000/posts/sortby/${event.target.value}/`
        }).then(res => {
            setPosts(res.data);
        });
    };

    const handleSearchText = (event) => {
        setSearchText(event.target.value);
    }

    const handleSearchQuery = (event) => {
        (searchText !== "") && axios({
            method: 'GET',
            url: `http://127.0.0.1:8000/posts/search/${searchText}/`
        }).then(res => {
            // console.log(res.data)
            setPosts(res.data);
        });
    }

    return (
        <div className="surfbits-wrapper">
            <Grid container spacing={8}>
                <Grid item xs={4} sm={3}>
                    <select id="lang-dropdown" value={sortBy} onChange={handleChange}>
                        <option value="hot">Hot</option>
                        <option value="top">Top</option>
                        <option value="new">New</option>
                    </select>
                </Grid>
                <Grid item xs={7} sm={7}>
                    <input type="text" className="search-text-input" value={searchText} onChange={handleSearchText} placeholder="Search Bits .... " />
                </Grid>
                <Grid item xs={3} sm={2}>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleSearchQuery}
                        className={classes.submit}
                    >
                        Go
                    </Button>
                </Grid>
            </Grid>
            <Divider />
            <PostList posts={posts} currentUser={currentUser} handlePosts={handlePosts} />
        </div>
    )
}

export default SurfBits
