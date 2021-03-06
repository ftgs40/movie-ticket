import React,{ Component } from 'react';
import { Container,Button, Form, TextArea, Header, Segment, Label, Menu, Table } from 'semantic-ui-react'
import axios, {post} from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { Redirect  } from "react-router-dom";
import myConfig from '../../config';

class AddMoviewAdmin extends Component{

    constructor(props){
      super(props);
        this.state = {
            startDate: moment(),
            expireDate: moment().add(7, 'days'),
            picUpload: new FormData(),
            desTextarea: '',
            isReDirectLanding: false,
            adminPer: this.checkAdminPer()
        };
        this.handleChangeDateStart = this.handleChangeDateStart.bind(this);
        this.handleChangeDateExpire = this.handleChangeDateExpire.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
        this.handleInputTextarea = this.handleInputTextarea.bind(this);
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

    handleChangeDateStart(date) {
        this.setState({
            startDate: date
        });
    }
    handleChangeDateExpire(date) {
        this.setState({
            expireDate: date
        });
    }
    handleInputTextarea(e){
        this.setState({desTextarea : e.target.value})
    }

    handleSubmit(event) {
        event.preventDefault();

        let data = new FormData();
        data.append("name", this.name.value);
        data.append("des",  this.state.desTextarea);
        data.append("price",  this.price.value);
        data.append("productImage", this.state.picUpload);
        data.append("startDate",  moment(this.state.startDate).format('YYYY-MM-DD').toString());
        data.append("expireDate",  moment(this.state.expireDate).format('YYYY-MM-DD').toString());

        const headers = { headers: { 'Content-Type': 'multipart/form-data','authorization': myConfig.publicKey } };
        axios.post(`${myConfig.siteUrlServer}/api/movie/add`, data, headers).then((response) => {
            console.log(response); 
            // this.props.history.push('/landing');
            this.setState({isReDirectLanding: true});
        });
    }

    handleFileChange(event){
        const data = new FormData();
        // data.append('productImage', event.target.files[0]);
        this.setState({picUpload: event.target.files[0]});
        // console.warn(data);
    }

    render() {
        if(!this.state.adminPer) return (<Redirect to="/"/>)
        if(this.state.isReDirectLanding){
            return (<Redirect to="/admin/movie_landing"/>)
        }else{
            return (
            <div style={{paddingTop:'30px'}}>
                <Container>
                    <Header as='h1' dividing>
                        Add Movie
                    </Header>
                    <Form onSubmit={this.handleSubmit}>
    <Form.Field>
      <label>Movie Name *</label>
      <input 
        placeholder='Movie Name'
        ref={input=>this.name = input}   
         required
       />
    </Form.Field>

    <Form.Field>
        <label>Description *</label>
        <TextArea 
            placeholder='Movie Description' 
            onChange={this.handleInputTextarea}
            required
        />
    </Form.Field>

    <Form.Field>
      <label>Price * (จำนวนเต็ม)</label>
      <input placeholder='Price' pattern="[0-9]*" required ref={input=>this.price = input}  />
    </Form.Field>

    <Form.Field>
        <label>Upload Poster</label>
        <input name="file" type="file" required onChange={this.handleFileChange}/>
    </Form.Field>

    <Form.Field>
        <label>Start Date</label>
        <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChangeDateStart}
            dateFormat="DD/MM/YYYY"
            required
        />
    </Form.Field>

    <Form.Field>
        <label>Expire Date</label>
        <DatePicker
            selected={this.state.expireDate}
            onChange={this.handleChangeDateExpire}
            dateFormat="DD/MM/YYYY"
            required
        />
    </Form.Field>
    
    <Button type='submit'>Submit</Button>
    <Button type='reset'>Reset</Button>
    </Form>
                </Container>
            </div>
        );
        }
      }
}
export default AddMoviewAdmin;