import React, { Component } from 'react';
import { Container, Divider, Grid, Header, Icon } from 'semantic-ui-react'
import axios from 'axios';
import { Link } from "react-router-dom";
// import { Redirect,browserHistory  } from "react-router-dom";
import config from '../config';

class MovieList extends Component {

    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            movieList: [],
            countMoview: 0,
        };
        this.clickDetail = this.clickDetail.bind(this);
    }

    componentDidMount() {
        axios.get(`${config.siteUrlServer}/api/movie/time`)
          .then(res => {
            console.log(res.data)
            const movieList = res.data;
            const countData = movieList.length;
            this.setState({ movieList:movieList , countMoview:countData});
        });
    }

    clickDetail(id){
     
            console.log("vv",id);
            // this.setState({isLogin: true});
    }
    
    render() {
        
        const items_one = this.state.movieList.map((item,i)=>{
            return(
                <Grid.Column key={i}>
                    <Link to={`detail/${item._id}`}>
                    <img 
                        style={{maxHeight:'500px',paddingTop:'30px',width:"100%"}} 
                         src={`${config.siteUrlServer}/image/${item.pic_path}`}
                         onClick={() => this.clickDetail(item._id)}
                    />
                    </Link>
                    <Link to={`detail/${item._id}`}> 
                    <h3 style={{color:'white'}} onClick={() => this.clickDetail(item._id)}>{item.name}</h3>
                    </Link>
                    <p style={{color:"#c2c8d1"}}>{item.price} baht</p>
                </Grid.Column> 
            )
        })

        const items = (movieList) => {
            let table = []
            // Outer loop to create parent
            if(movieList.length == 0) return false;
    
            console.log('movieList',movieList);
            for (let i = 0; i < 2; i++) {
                let children = []
                //Inner loop to create children
                for (let j = 0; j < 3; j++) {
                    let countCal = ((i+1)*3)-3;
                    // if(typeof this.state.movieList[j].pic_path !== "undefined"){
                        // let path = this.movieList[(j+countCal)].pic_path;
                        // console.log('path:',i,' aray',(j+countCal));
                    // }
                    // children.push(<Grid.Column><img src={`http://localhost:3001/image/${path}`}/></Grid.Column>)
                    // children.push(<Grid.Column>xx</Grid.Column>)
                }
                //Create the parent and add the children
                table.push(<Grid.Row>{children}</Grid.Row>)
            }
            
            return table
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
        </div>
        );
    }
}
export default MovieList;