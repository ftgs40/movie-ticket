import React, { Component } from 'react';
import { Container, Card, Grid, Button, Icon, Image } from 'semantic-ui-react'
import { Link } from "react-router-dom";
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
            movie_id:     ''
        };
        // console.log(this.calMoneyRefund(550,552));
        // this.handelMinusTotal   = this.handelMinusTotal.bind(this);
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
                movie_id:   data_storage.movie_id
            });
        }
    }

    componentWillUpdate(){

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
        if(this.state.priceInput < this.state.totalPrice) return false;
        let data = this.state;
        data.append("moneyRefund", this.name.value);
        console.log(data);
        // axios.post(`${myConfig.siteUrlServer}/api/movie/add`, data).then((response) => {
        //     console.log(response); 
        //     // this.props.history.push('/landing');
        //     this.setState({isReDirectLanding: true});
        // });
    }

    calMoneyRefund(totalPrice, Money){
        let reMoney = Money - totalPrice;
        let mon = [0,0,0,0,0,0,0,0,0];
        let typeMoney = [1000,500,100,50,20,10,5,2,1];
        for(let i=0; i< typeMoney.length; i++){
            if(reMoney/typeMoney[i] >= 1){
                mon[i] = Math.floor(reMoney/typeMoney[i])
                reMoney = reMoney-(mon[i]*typeMoney[i]);
            }
        }
        // if(reMoney/1000 >= 1){
        //     mon[0] = Math.floor(reMoney/1000)
        //     reMoney = reMoney-(mon[0]*1000);
        //     console.log('reMoney',reMoney)
        // }
        return mon;
    }


    render() {
        const priceInput = this.state.priceInput.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const totalPrice = this.state.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        const styInputPrice = () =>{
            if( this.state.priceInput < this.state.totalPrice){
                return {color:'#d64e37'};
            }else{
                return {color:'#54a03d'};
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
                {/* <Card> */}
    {/* <Image src='http://localhost:3001/image/1534866524183thor3.jpg' /> */}
    {/* <Card.Content>
      <Card.Header>Thor 3</Card.Header>
      <Card.Meta>
        <span className='date'>จำนวน 3 ใบ</span>
      </Card.Meta>
      <Card.Description>Matthew is a musician living in Nashville.</Card.Description>
    </Card.Content>
  </Card> */}
                <SuccessComponent dataSet={this.state} />
                <div className="center"><h1>..กรุณาชำระเงิน จำนวน {totalPrice} บาท</h1></div>
                <div className="center">
                    <h2 style={{color:"#c2c8d1"}}>( {this.state.movie_name} จำนวน {this.state.ticketTotal} ใบ )</h2>
                </div>
                <div className="center inputPrice" >เงินที่รับมา <span style={styInputPrice()}>{priceInput}</span> บาท</div>
   
                <Button size='massive' color='green' onClick={this.clickPay}  fluid> 
                    <Icon  name='money bill alternate outline' /> ชำระเงิน
                </Button>
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
            </Container>
        );
    }
}
export default MoviePayComponent;