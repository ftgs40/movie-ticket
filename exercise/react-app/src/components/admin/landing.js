import React,{ Component } from 'react';
import { Container,Button, Form, Grid, Header, Segment, Label, Menu, Table, Icon } from 'semantic-ui-react'
import axios from 'axios';
import { Link } from "react-router-dom";
import moment from 'moment'

class LandingAdmin extends Component{

    constructor(props){
      super(props);
      this.state = {movieList: []};

    //   this.clickLogin   = this.clickLogin.bind(this);
    //   this.setUser  = this.setUser.bind(this);
    //   this.setPass  = this.setPass.bind(this);
    }

    componentDidMount() {
        axios.get(`http://localhost:3001/api/movie/time`)
          .then(res => {
            console.log(res.data)
            const movieList = res.data;
            this.setState({ movieList:movieList });
        });
    }

    render() {
        const items = this.state.movieList.map((item,i)=>{
            return(
                <Table.Row key={i}>
                    <Table.Cell textAlign="center">{(i+1)}</Table.Cell>
                    <Table.Cell><a href="javascript:void(0)">{item.name}</a></Table.Cell>
                    <Table.Cell>{moment(item.start_date).format('DD/YYYY/MM')}</Table.Cell>
                    <Table.Cell>{moment(item.expried_date).format('DD/YYYY/MM')}</Table.Cell>
                    <Table.Cell textAlign="center">
                        <a><Icon name='trash' /></a>
                    </Table.Cell>
                </Table.Row>
            )
        })
        
        return (
            <div style={{paddingTop:'30px'}}>
                <Container>
                    <Header as='h1' dividing>
                        All Movie
                    </Header>
                    <Link to="/admin/movie_add">
                        <Button>+ Add Movie</Button>
                    </Link>
                    {/* <Header as='h3'>Column Flow</Header> */}
                    <Table celled>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell textAlign="center">#</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Start Date</Table.HeaderCell>
                            <Table.HeaderCell>Expired Date</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {items}
                        </Table.Body>

                    </Table>
                </Container>
            </div>
        );
      }
}
export default LandingAdmin;