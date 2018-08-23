import React, { Component } from 'react';
import { Container, Card, Grid, Button, Icon, Image } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import Herder from './herder';
import myConfig from '../config';
import axios from 'axios';

class SuccessComponent extends Component {

    constructor(props){
        super(props);
        // console.log(props);

        this.state = {refund:[0,0,0,0,0,0,0,0,0],
                      typeMoney:[1000,500,100,50,20,10,5,2,1]};

        // console.log(this.calMoneyRefund(550,552));
        // this.handelMinusTotal   = this.handelMinusTotal.bind(this);
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
        return mon;
    }

    componentWillReceiveProps(nextProps){
        // console.log(nextProps);
        this.setState(nextProps.dataSet)

        let refund = this.calMoneyRefund(nextProps.dataSet.totalPrice, nextProps.dataSet.priceInput)
        this.setState({refund:refund})
    }

    render() {
        let totalRefund = 0;
        const showRefund = this.state.refund.map((item,i)=>{
            totalRefund += (this.state.typeMoney[i]*item)
            if(item != 0){
                let type_mon;
                let ofType;
                if(this.state.typeMoney[i] >= 50){
                    type_mon = "แบงค์"
                    ofType   = "ใบ"
                }else{
                    type_mon = "เหรียญ"
                    ofType   = "เหรียญ"
                }
                return(
                    <div key={i}>
                        <h2>{type_mon} {this.state.typeMoney[i]} บาท จำนวน {item} {ofType}</h2>
                    </div>
                )
            }
        });
        const myStyle = {
            div:{
                textAlign:'center',
                color:'white',
                backgroundColor:'#1b1e2d',
                borderRadius: '8px',
                padding: '30px',
                marginBottom: '20px' 
            }
        }
        if(this.state.showRefund){
            return (
            <div style={myStyle.div}>

                <h1 style={{color:'#5fc141'}}>ชำระเงินสำเร็จ !</h1>
                <h2>เงินทอนจำนวน {totalRefund} บาท</h2> 
                {showRefund}

                <Grid style={{marginTop:'30px'}} centered>
                <Card style={{width:'200px',marginBottom:'20px'}}>
                    <Image  src={`${myConfig.siteUrlServer}/image/${this.state.pic_path}`} />
                    <Card.Content>
                    <Card.Header>{this.state.movie_name}</Card.Header>

                    <Card.Description>จำนวน {this.state.ticketTotal} ใบ</Card.Description>
                    </Card.Content>
                </Card>
                </Grid>
                <Link to="/">
                <Button style={{marginTop:'20px'}} size='massive' color='blue' fluid> 
                     กลับไปหน้าแรก
                </Button>
                </Link>
            </div>
            );
        }else{
            return (<div></div>)
        }
        
    }
}
export default SuccessComponent;