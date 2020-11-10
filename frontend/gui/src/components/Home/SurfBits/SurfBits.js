import React, { useState, useEffect } from 'react'
//import { all_posts } from './surfbitData/surfbit_data';
import PostList from '../../PostList/PostList';
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import './SurfBits.css'

// const useStyles = makeStyles((theme) => ({
//     formControl: {
//         margin: theme.spacing(1),
//         minWidth: 120,
//     },
//     select: {
//         '&:before': {
//              borderColor: 'var(--galaxy-blue)',
//          },
//          '&:hover:not(.Mui-disabled):before': {
//              borderColor: 'var(--galaxy-blue)',
//          }
//     },
//     icon: {
//         fill: "green",
//     },
// }));

function SurfBits() {

    //const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const [sortBy, setSortBy] = useState('none');
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        let source = axios.CancelToken.source();

        const loadData = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/posts/`,
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

    const handleChange = (event) => {
        setSortBy(event.target.value);
        axios({
            method: 'GET',
            url: `http://127.0.0.1:8000/posts/sortby/${sortBy}`
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
            console.log(res.data)
            setPosts(res.data);
        });
    }

    return (
        <div className="surfbits-wrapper">
            <Grid container spacing={8}>
                <Grid item xs={4} sm={3}>
                    <select id="lang-dropdown" value={sortBy} onChange={handleChange}>
                        <option value="none">None</option>
                        <option value="top">Top</option>
                        <option value="hot">Hot</option>
                        <option value="new">New</option>
                    </select>
                </Grid>
                <Grid item xs={10} sm={9}>
                    <input type="text" className="search-text-input" value={searchText} onChange={handleSearchText} placeholder="Search Bits .... " />
                    <input type="button" onClick={handleSearchQuery} value="Go"/>
                    {/* <h2> Search Bits... </h2> */}
                </Grid>
            </Grid>
            <Divider />
            <PostList posts={posts} />
        </div>
    )
}

export default SurfBits
