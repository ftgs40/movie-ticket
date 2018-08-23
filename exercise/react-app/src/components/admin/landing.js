import React,{ Component } from 'react';
import { Container,Button, Form, Grid, Header, Segment, Label, Menu, Table, Icon } from 'semantic-ui-react'
import axios from 'axios';
import { Link,Redirect } from "react-router-dom";
import moment from 'moment'
import myConfig from '../../config';

class LandingAdmin extends Component{

    constructor(props){
        super(props);
        this.state = {
          movieList: [],
          countMoview: 0,
          adminPer: this.checkAdminPer()
        };


    //   this.clickLogin   = this.clickLogin.bind(this);
    //   this.setUser  = this.setUser.bind(this);
    //   this.setPass  = this.setPass.bind(this);
    }

    checkAdminPer(){
        let aut_admin = localStorage.getItem('adminAut');
        if(aut_admin == null){
            return false
        }else{
            if( new Date().valueOf() > parseInt(aut_admin) ){
                return false
            }
            return true
        }
    }

    clickDelete(id, name){
        let conf = window.confirm("คุณต้องการลบหนังเรื่อง "+name+" ใช่หรือไม่ ?")
        if(conf){
            const data = {id:id};
            console.log(data)
            const headers = {headers: {
                'authorization': myConfig.publicKey,
            }}
            axios.post(`${myConfig.siteUrlServer}/api/movie/delete`, data, headers)
            .then(res => {
                console.log(res.data)
                this.getMovieList()
            });
        }
    }

    componentDidMount() {
        this.getMovieList();
    }

    getMovieList(){
        const headers = {headers: {
            'authorization': myConfig.publicKey,
        }}
        axios.get(`${myConfig.siteUrlServer}/api/movie/time`, headers)
          .then(res => {
            console.log(res.data)
            const movieList = res.data;
            const countData = movieList.length;
            this.setState({ movieList:movieList , countMoview:countData});
        });
    }

    render() {
        if(!this.state.adminPer) return (<Redirect to="/"/>)
   
        const items = this.state.movieList.map((item,i)=>{
            return(
                <Table.Row key={i}>
                    <Table.Cell textAlign="center">{(i+1)}</Table.Cell>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{moment(item.start_date).format('DD/YYYY/MM')}</Table.Cell>
                    <Table.Cell>{moment(item.expried_date).format('DD/YYYY/MM')}</Table.Cell>
                    <Table.Cell>{item.price}</Table.Cell>
                    <Table.Cell textAlign="center">
                        <a onClick={()=>this.clickDelete(item._id,item.name)}><Icon name='trash' /></a>
                    </Table.Cell>
                </Table.Row>
            )
        })

        return (
            <div style={{paddingTop:'30px',paddingBottom:'30px'}}>
                <Container>
                    <Header as='h1' dividing>
                        All Movies
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
                            <Table.HeaderCell>Price</Table.HeaderCell>
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