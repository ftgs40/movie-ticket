import React, { Component } from 'react';
import { Container, Card, Grid, Button, Icon, Image } from 'semantic-ui-react'
import { Link,Redirect } from "react-router-dom";
import Herder from './herder';
import myConfig from '../config';
import axios from 'axios';

import SuccessComponent from './success';

class MoviePayComponent extends Component {

    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            totalPrice:   0,
            priceInput:   0,
            ticketTotal:  1,
            movie_name:   '',
            movie_id:     '',
            showRefund:   false,
            redirectHome:  false
        };

        this.clickCancel    = this.clickCancel.bind(this);
        this.clickPay       = this.clickPay.bind(this);
    }

    componentDidMount(){
        let stateDetail = localStorage.getItem('detailState');
        if(stateDetail !== null ){
            console.log(JSON.parse(stateDetail));
            let data_storage = JSON.parse(stateDetail);
            this.setState({
                totalPrice: data_storage.totalPrice,
                ticketTotal:data_storage.ticketTotal,
                movie_name: data_storage.movie_name,
                movie_id:   data_storage.movie_id,
                pic_path:   data_storage.pic_path
            });
        }else{
            this.setState({redirectHome:true});
        }
    }

    handelAddPriceInput(money){
        this.setState({
            priceInput: (this.state.priceInput+money)
        });
    }

    clickCancel(){
        localStorage.removeItem('detailState');
    }

    clickPay(){
        if(this.state.priceInput < this.state.totalPrice){
            alert("คุณจ่ายเงินไม่ครบ")
            return false;
        } 
        
        this.sentData(this.state)
        localStorage.removeItem('detailState');
    }

    sentData(data){
        console.log(data);
        const headers = {headers: {
            'authorization': myConfig.publicKey,
        }}
        axios.post(`${myConfig.siteUrlServer}/api/movie/transections`, data, headers ).then((response) => {
            console.log('axios : ',response); 
            if(response.data.success){
                this.setState({showRefund: true})
            }else{
                console.log('error',response.data)
            }
            
        }).catch((e)=>console.log('error :',e));
    }

    render() {
        if(this.state.redirectHome) return (<Redirect to="/"/>)

        const priceInput = this.state.priceInput.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const totalPrice = this.state.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const styInputPrice = () =>{
            if( this.state.priceInput < this.state.totalPrice){
                return {color:'#d64e37'};
            }else{
                return {color:'#54a03d'};
            }
        }

        const mainShow = () =>{
            if(this.state.showRefund){
                return(<div></div>)
            }else{
                return(
                    <div>
                        <div className="center"><h1>..กรุณาชำระเงิน จำนวน {totalPrice} บาท</h1></div>
                        <div className="center">
                            <h2 style={{color:"#c2c8d1"}}>( {this.state.movie_name} จำนวน {this.state.ticketTotal} ใบ )</h2>
                        </div>
                        <div className="center inputPrice" >เงินที่รับมา <span style={styInputPrice()}>{priceInput}</span> บาท</div>
        
                        <Button size='massive' color='green' onClick={this.clickPay}  fluid> 
                            <Icon  name='money bill alternate outline' /> ชำระเงิน
                        </Button>
                        <Link to={`/detail/${this.state.movie_id}`}>
                            <Button size='massive' color='yellow' fluid ><Icon  name='edit' />แก้ไขจำนวนตั๋วหนัง</Button>
                        </Link>
                        <Link to="/">
                            <Button onClick={this.clickCancel} size='massive' color='red' fluid >ยกเลิก</Button>
                        </Link>
                        <div className="boxRecieveMoney" >
                        <h2>จำลองตู้รับเงิน</h2>
                        <Grid  style={{marginBottom:'20px'}}>
                        <Grid.Row columns={5}>
                            <Grid.Column>
                                <div className="moneyDiv" onClick={() => this.handelAddPriceInput(1)}>1 บาท</div>
                            </Grid.Column>
                            <Grid.Column>
                                <div className="moneyDiv" onClick={() => this.handelAddPriceInput(2)}>2 บาท</div>
                            </Grid.Column>
                            <Grid.Column>
                                <div className="moneyDiv" onClick={() => this.handelAddPriceInput(5)}>5 บาท</div>
                            </Grid.Column>
                            <Grid.Column>
                                <div className="moneyDiv" onClick={() => this.handelAddPriceInput(10)}>10 บาท</div>
                            </Grid.Column>
                            <Grid.Column>
                            
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row columns={5}>
                            <Grid.Column>
                                <div className="moneyDiv" onClick={() => this.handelAddPriceInput(20)}>20 บาท</div>
                            </Grid.Column>
                            <Grid.Column>
                                <div className="moneyDiv" onClick={() => this.handelAddPriceInput(50)}>50 บาท</div>
                            </Grid.Column>
                            <Grid.Column>
                                <div className="moneyDiv" onClick={() => this.handelAddPriceInput(100)}>100 บาท</div>
                            </Grid.Column>
                            <Grid.Column>
                                <div className="moneyDiv" onClick={() => this.handelAddPriceInput(500)}>500 บาท</div>
                            </Grid.Column>
                            <Grid.Column>
                                <div className="moneyDiv" onClick={() => this.handelAddPriceInput(1000)}>1,000 บาท</div>
                            </Grid.Column>
                        </Grid.Row>
                            
                        </Grid>
                        </div>
                    </div>
                )
            }
        }

        return (
            <Container>
                <style>{`
                html, body {
                    background-color: #252839 !important;
                }
                .moneyDiv {
                    align-content: center;
                    background-color: #495285;
                    color: #fff;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    min-height: 3em;
                    text-align:center;
                  }
                h1{
                    color:white;
                }
                .center{
                    text-align:center;
                }
                .inputPrice{
                    margin-top: 30px;
                    margin-bottom: 30px;
                    font-size:35px;
                    font-weight: bold;
                    color:white;
                }
                .boxRecieveMoney{
                    margin-top: 30px;
                    margin-bottom: 15px;
                    padding: 15px;
                    border-radius: 5px;
                    background-color:#fff;
                }
                `}</style>
                <Herder/>
                <h1><Icon  name='shopping cart' /> Payment</h1>
                <SuccessComponent dataSet={this.state}/>
                {mainShow()}
            </Container>
        );
    }
}
export default MoviePayComponent;