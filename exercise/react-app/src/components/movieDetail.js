import React, { Component } from 'react';
import { Container, Divider, Grid, Button, Icon, Input } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import Herder from './herder';
import config from '../config';
import axios from 'axios';

class MovieDetailComponent extends Component {

    constructor(props){
        super(props);
        // console.log(props);
        // console.log(props.match.params.id);
        this.state = {
            price:          150,
            ticketTotal:    1,
            totalPrice:     150,
            movie_name:     '',
            movie_id:       props.match.params.id,
            description:    '',
            pic_path:       ''
        };
        
        this.handelMinusTotal   = this.handelMinusTotal.bind(this);
        this.handelPlusTotal    = this.handelPlusTotal.bind(this);
        this.clickBuy           = this.clickBuy.bind(this);
    }

    componentDidMount(){
        axios.get(`${config.siteUrlServer}/api/movie/detail/${this.state.movie_id}`)
          .then(res => {
            console.log(res.data)
            this.setState({
                price:      res.data[0].price,
                totalPrice: res.data[0].price,
                movie_name: res.data[0].name,
                description:res.data[0].description,
                pic_path:   res.data[0].pic_path
            })
            this.setStorageForReturn(res.data[0]._id);
        });
    }

    setStorageForReturn(_id){
        let stateDetail = localStorage.getItem('detailState');
            if(stateDetail !== null ){
                let data = JSON.parse(stateDetail);
                console.log("this ",data)
                if(data.movie_id == _id){
                    this.setState(JSON.parse(stateDetail));
                }
        }
    }

    handelMinusTotal(){
        if(this.state.ticketTotal == 1) return false;
        this.setState({
            ticketTotal: (this.state.ticketTotal-1),
            totalPrice: ((this.state.ticketTotal-1)*this.state.price)
        });
    }

    handelPlusTotal(){
        this.setState({
            ticketTotal: (this.state.ticketTotal+1),
            totalPrice: ((this.state.ticketTotal+1)*this.state.price)
        });
    }

    clickBuy(){
        localStorage.setItem('detailState',JSON.stringify(this.state));
    }

    render() {
        const totalPrice = (this.state.ticketTotal*this.state.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return (
            <Container>
                <style>{`
                html, body {
                    background-color: #252839 !important;
                }
                h1,h3{
                    color: white;
                }
                .yell{
                    color: #fbbd08;
                }
                .btnBottom{
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    margin-bottom: 20px;
                }
                .boxSale{
                    padding-bottom: 20px;
                    padding-top: 20px;
                }
                .boxDes{
                    border-radius: 4px;
                    color:#606060;
                    background-color:#fff;
                    padding-right: 15px;
                    font-size: 16px;
                }
                .boxSaleMain{
                    padding-top: 20px;
                    border-radius: 5px;
                    background-color:#1b1e2d;
                }
                `}</style>
                <Herder/>
                <h1 style={{fontSize:"35px"}}>{this.state.movie_name}</h1>
                <Grid columns='equal' style={{marginBottom:'20px'}}>
                    <Grid.Row columns='equal'>
                        <Grid.Column >
                        <img style={{width:"100%"}} src={`${config.siteUrlServer}/image/${this.state.pic_path}`} />
                        </Grid.Column>
                        <Grid.Column className="boxSaleMain">
                            <h1 className="yell">ซื้อตั๋วหนัง</h1>
                            <h3>ราคา {this.state.price} บาท/ใบ</h3>
                            
                            <Grid style={{textAlign:'center',marginTop:'20px'}} relaxed>
                                <Grid.Row>
                                    <Grid.Column width={4} textAlign="right">
                                    <Icon  name='minus' color="teal" size='huge' onClick={this.handelMinusTotal} />
                                    </Grid.Column>
                                    <Grid.Column width={8}>
                                        <Input placeholder='จำนวน' value={this.state.ticketTotal} size='massive'  fluid/>
                                    </Grid.Column>
                                    <Grid.Column width={4} textAlign="left">
                                        <Icon  name='plus' color="teal" size='huge' onClick={this.handelPlusTotal} />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <div style={{textAlign:'center',marginBottom:'40px',marginTop:'40px'}} >
                                <h1>รวม <span className="yell" >{totalPrice}</span> บาท</h1>
                            </div>
                            <Link to="/payment">
                                <Button className="btnBottom" size='massive' color='red' fluid onClick={this.clickBuy} > <Icon  name='shopping cart' /> ซื้อ</Button>
                            </Link>
                            

                        </Grid.Column>
                    </Grid.Row>
                    <Divider />
                    <Grid.Row ><h1>เรื่องย่อ</h1></Grid.Row>
                    <Grid.Row columns='equal' className="boxDes" style={{padding:'20px'}}>
                     {this.state.description}
                    </Grid.Row>
                    
                </Grid>
            </Container>
        );
    }
}
export default MovieDetailComponent;