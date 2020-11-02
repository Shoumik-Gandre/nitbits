import React, { useState } from 'react'
import { all_posts } from './surfbitData/surfbit_data';
import PostList from '../../PostList/PostList';
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import './SurfBits.css'

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    select: {
        '&:before': {
             borderColor: 'var(--galaxy-blue)',
         },
         '&:hover:not(.Mui-disabled):before': {
             borderColor: 'var(--galaxy-blue)',
         }
    },
    // select: {
    //     "&:before": {
    //       borderColor: "red"
    //     }
    // },
    // select: {
    //     color: "white !important",
    //     '&:before': {
    //         borderColor: "green !important",
    //         color: "white !important",
    //     },
    //     '&:after': {
    //         borderColor: "green",
    //     }
    // },
    icon: {
        fill: "green",
    },
}));

function SurfBits() {

    const classes = useStyles();

    const [sortBy, setSortBy] = useState('none');

    const [searchText, setSearchText] = useState("");

    const handleChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleSearchText = (event) => {
        setSearchText(event.target.value);
    }

    return (
        <div className="surfbits-wrapper">
            <Grid container spacing={8}>
                <Grid item xs={4} sm={3}>
                    {/* <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Sort By</InputLabel>
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={sortBy}
                        className={classes.select}
                        inputProps={{
                            classes: {
                                icon: classes.icon,
                            },
                        }}
                        onChange={handleChange}
                        label="Sort By"
                        >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={"top"}>Top</MenuItem>
                        <MenuItem value={"hot"}>Hot</MenuItem>
                        <MenuItem value={"new"}>New</MenuItem>
                        <MenuItem value={"rising"}>Rising</MenuItem>
                        </Select>
                    </FormControl> */}
                    <select id="lang-dropdown" value={sortBy} onChange={handleChange}>
                        <option value="none">None</option>
                        <option value="top">Top</option>
                        <option value="hot">Hot</option>
                        <option value="new">New</option>
                        <option value="rising">Rising</option>
                    </select>
                </Grid>
                <Grid item xs={10} sm={9}>
                    <input type="text" className="search-text-input" value={searchText} onChange={handleSearchText} placeholder="Search Bits .... " />
                    {/* <h2> Search Bits... </h2> */}
                </Grid>
            </Grid>
            <Divider />
            <PostList posts={all_posts} />
        </div>
    )
}

export default SurfBits
