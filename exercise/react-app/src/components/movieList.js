import React, { Component } from 'react';
import { Container, Divider, Grid, Header, Icon } from 'semantic-ui-react'
import axios from 'axios';
import { Link } from "react-router-dom";
// import { Redirect,browserHistory  } from "react-router-dom";
import myConfig from '../config';

class MovieList extends Component {

    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            movieList: [],
            countMoview: 0,
        };
    }

    componentDidMount() {
        this.getMovieList();
    }

    componentWillReceiveProps(nextProps){
        // console.log(nextProps);
        this.getMovieList(nextProps.sort, nextProps.subSort);
    }

    getMovieList(sort = '',subSort = ''){
        let suffix = '/api/movie/time';
        if(sort != ""){
            if(subSort == '') return false;
            if(sort == "name"){
                suffix = '/api/movie/sortName/'+subSort;
            }else if(sort == "price"){
                suffix = '/api/movie/sortPrice/'+subSort;
            }else if(sort == "searchName"){
                suffix = '/api/movie/search/'+subSort;
            }else{
                return false;
            }
        }
        const headers = {headers: {
                            'authorization': myConfig.publicKey,
                        }}
        axios.get(myConfig.siteUrlServer+suffix, headers)
          .then(res => {
            console.log(res.data)
            const movieList = res.data;
            const countData = movieList.length;
            this.setState({ movieList:movieList , countMoview:countData});
        });
    }
    
    render() {
        
        let items_one = this.state.movieList.map((item,i)=>{
            return(
                <Grid.Column key={i}>
                    <Link to={`detail/${item._id}`}>
                    <img 
                        style={{maxHeight:'500px',paddingTop:'30px',width:"100%"}} 
                         src={`${myConfig.siteUrlServer}/image/${item.pic_path}`}
                    />
                    </Link>
                    <Link to={`detail/${item._id}`}> 
                    <h3 style={{color:'white'}} >{item.name}</h3>
                    </Link>
                    <p style={{color:"#c2c8d1"}}>{item.price} baht</p>
                </Grid.Column> 
            )
        })
        let notFound 
        if(items_one ==""){
            notFound = <div style={{textAlign:"center",color:"white"}}><h1>..Movie not found</h1></div>
        }

        return (
            <div>
                <Grid columns={4} divided>
       {/* {this.state.countMoview > 0 ? items(this.state.movieList) : <Grid.Row>x</Grid.Row>} */}
                {/* {items(this.state.movieList)} */}
                {/* {this.createTable()} */}
                    <Grid.Row>
                        {items_one}
                    </Grid.Row>
                    {/* <Grid.Row>
                        <Grid.Column>
                        <p />
                        </Grid.Column>
                        <Grid.Column>
                        <p />
                        </Grid.Column>
                        <Grid.Column>
                        <p />
                        </Grid.Column>
                    </Grid.Row> */}
                </Grid>
                {notFound}
        </div>
        );
    }
}
export default MovieList;