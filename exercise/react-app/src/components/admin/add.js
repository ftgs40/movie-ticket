import React,{ Component } from 'react';
import { Container,Button, Form, Grid, Header, Segment, Label, Menu, Table, Icon } from 'semantic-ui-react'
import axios from 'axios';

class AddMoviewAdmin extends Component{

    constructor(props){
      super(props);
    //   this.state = {movieList: []};

    //   this.clickLogin   = this.clickLogin.bind(this);
    }

    componentDidMount() {
        // axios.get(`http://localhost:3001/api/movie/time`)
        //   .then(res => {
        //     console.log(res.data)
        //     const movieList = res.data;
        //     this.setState({ movieList:movieList });
        // });
    }

    render() {
        
        return (
            <div style={{paddingTop:'30px'}}>
                <Container>
                    <Header as='h1' dividing>
                        Add Movie
                    </Header>
                   
                </Container>
            </div>
        );
      }
}
export default AddMoviewAdmin;