import React, { Component } from 'react';
import { Container, Card, Grid, Button, Icon, Image } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import Herder from './herder';
import myConfig from '../config';
import axios from 'axios';

class SuccessComponent extends Component {

    constructor(props){
        super(props);
        console.log(props);

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
        console.log(nextProps);
        this.setState(nextProps.dataSet)

        let refund = this.calMoneyRefund(nextProps.dataSet.totalPrice, nextProps.dataSet.priceInput)
        this.setState({refund:refund})
    }

    render() {
        const showRefund = this.state.refund.map((item,i)=>{
            if(item != 0){
                let type_mon;
                if(this.state.typeMoney[i] >= 50){
                    type_mon = "แบงค์"
                }else{
                    type_mon = "เหรียญ"
                }
                return(
                    <div key={i}>
                        {type_mon} {this.state.typeMoney[i]} บาท จำนวน {item} บาท
                    </div>
                )
            }
        });
        
        return (
            <div>
                {showRefund}
            </div>
        );
    }
}
export default SuccessComponent;