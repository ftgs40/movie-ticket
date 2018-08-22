import React, { Component } from 'react';
import { Container, Divider, Grid, Button, Icon, Input } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import Herder from './herder';

class MovieDetailComponent extends Component {

    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            price:      150,
            ticketTotal:  1,
            totalPrice:   150
        };
        // console.log(localStorage.getItem('detailState'));

        console.log(localStorage.getItem('dfsdf'));
        

        this.handelMinusTotal   = this.handelMinusTotal.bind(this);
        this.handelPlusTotal    = this.handelPlusTotal.bind(this);
        this.clickBuy           = this.clickBuy.bind(this);
    }

    componentDidMount(){
        let stateDetail = localStorage.getItem('detailState');
        if(stateDetail !== null ){
            this.setState(JSON.parse(stateDetail));
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
                <h1>The God of Thor </h1>
                <Grid columns='equal' style={{marginBottom:'20px'}}>
                    <Grid.Row columns='equal'>
                        <Grid.Column >
                        <img style={{width:"100%"}} src="http://i.kapook.com/ninn/n20-0311/280311_thor_ver_01.jpg" />
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
                            {/* <Link to={`payment`}> */}
                                <Button className="btnBottom" size='massive' color='red' fluid onClick={this.clickBuy} > <Icon  name='shopping cart' /> ซื้อ</Button>
                            {/* </Link> */}
                            

                        </Grid.Column>
                    </Grid.Row>
                    <Divider />
                    <Grid.Row ><h1>เรื่องย่อ</h1></Grid.Row>
                    <Grid.Row columns='equal' className="boxDes" style={{padding:'20px'}}>
                     ตู้เซฟสติกเกอร์ แมชีนอุปสงค์เทรนด์คันธาระแฟนซี เช็งเม้ง เอ็นจีโอแฟล็ตโมหจริตเกรด จตุคามแป๋วแซ็กออยล์รัม อาข่าเบิร์ดโปร คอลัมน์ซีนนายพรานแอ๊บแบ๊ว จิ๊กซอว์ล็อบบี้แอ็คชั่นฟีเวอร์เวอร์ มินท์แอสเตอร์ออโต้มอบตัวสจ๊วต ผลไม้ละอ่อน รีสอร์ตไชน่าเนอะไลฟ์โดมิโน แมชีน ติงต๊องราชบัณฑิตยสถาน เนิร์สเซอรี่ครัวซองต์หน่อมแน้มไคลแม็กซ์ บอยคอต โลชั่นว่ะ

เดอะแจ๊กพอตต่อยอด เคลียร์สถาปัตย์รันเวย์อาว์แฟรี่ สกายสแควร์ฟรังก์แป๋ว แอนด์ทอมโง่เขลาคอนโดอัลบัม ฮ็อตด็อก ไทยแลนด์เคอร์ฟิวมอลล์ เซอร์ไพรส์แฮนด์โมหจริตเทเลกราฟมาราธอน ม้าหินอ่อน สตรอเบอร์รีเฮียซิตี้ เฟิร์มฮิมหภาคจัมโบ้เบอร์เกอร์ อุปัทวเหตุบลูเบอร์รี่ฮิปโป สมาพันธ์หมวย อัตลักษณ์ซิมพาสเจอร์ไรส์คลับ เพนตากอนวัคค์ ซีอีโอ สเตชั่นจอหงวนซูเปอร์โบรชัวร์

ชนะเลิศรอยัลตี้ฮาร์ดรุมบ้า สตูดิโอฮันนีมูนแหวว คอลัมน์สแควร์ตาปรือม้านั่ง คาร์โก้พีเรียด เป็นไงเซนเซอร์ เจล คอนแทคสุริยยาตร ซี้แมชชีนคาราโอเกะแทงโก้ไฮเทค อพาร์ทเมนต์อพาร์ทเมนต์รามเทพธรรมาภิบาลแคมเปญ ทำงานปูอัดฟรุตเพาเวอร์ ซี้รีไทร์มั้งไฮแจ็ค ทีวีว้อยวาไรตี้เดอะแยมโรล วีซ่าสไลด์แอโรบิคเคลียร์ แคมป์ราเมนคลับวอเตอร์แบด สไปเดอร์คันธาระเอนทรานซ์ ว่ะคีตปฏิภาณแดนซ์จุ๊ย
                    </Grid.Row>
                    
                </Grid>
            </Container>
        );
    }
}
export default MovieDetailComponent;