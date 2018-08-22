import React, { Component } from 'react';
import { Container, Divider, Grid, Button, Icon, Input } from 'semantic-ui-react'

import Herder from './herder';

class MoviePayComponent extends Component {

    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            totalPrice: 1050,
            priceInput:   0,
            ticketTotal:  1,
        };
        // this.handelMinusTotal   = this.handelMinusTotal.bind(this);
    }

    handelAddPriceInput(money){
        this.setState({
            priceInput: (this.state.priceInput+money)
        });
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
                <div className="center"><h1>..กรุณาชำระเงิน จำนวน {totalPrice} บาท</h1></div>
                <div className="center inputPrice" >เงินที่รับมา <span style={styInputPrice()}>{priceInput}</span> บาท</div>
   
                <Button size='massive' color='green' fluid > <Icon  name='money bill alternate outline' /> ชำระเงิน</Button>
                <Button size='massive' color='red' fluid >ยกเลิก</Button>
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