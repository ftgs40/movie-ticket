import React, { Component } from 'react';
import { Header, Dropdown, Input, Icon, Grid } from 'semantic-ui-react'

import MovieList from './movieList';

class Body extends Component {

    constructor(props){
        super(props);
        this.state = {
            movieSort: 'time',
            opName:     'az',
            opPrice:    'ce',
            searchBox: '',
            search: false
        };

        this.options =  [ 
                            {  value: 'name', text: 'Name' },
                            {  value: 'price', text: 'Price' }, 
                        ];
        this.options_name = [ 
                                {  value: 'az', text: 'A-Z' },
                                {  value: 'za', text: 'Z-A' }, 
                            ];
        this.options_price = [ 
                                {  value: 'ec', text: 'Expensive - Cheap' },
                                {  value: 'ce', text: 'Cheap - Expensive' }, 
                            ];
                        
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.clickSearch = this.clickSearch.bind(this);
        this.handleChangeSearchBox = this.handleChangeSearchBox.bind(this);
    }

    handleChange(event, data) {
        // console.log(data.value);
        this.setState({movieSort: data.value});
    }
    handleChangeName(event, data) {
        this.setState({opName: data.value});
    }
    handleChangePrice(event, data) {
        this.setState({opPrice: data.value});
    }
    clickSearch(){
        this.setState({
            movieSort : "searchName"
        })
    }
    handleChangeSearchBox(e){
        let val = e.target.value;
        this.setState({searchBox:val,movieSort:''})
    }
    
    render() {
        let subSort;
        const dropdownSlave =()=>{
            if(this.state.movieSort == "name"){
                subSort = this.state.opName;
                return (<Dropdown 
                    placeholder='Name' 
                    onChange={this.handleChangeName} 
                    selection 
                    options={this.options_name} 
                    value={this.state.opName} 
                    />)
            }else if(this.state.movieSort == "price"){
                subSort = this.state.opPrice;
                return (<Dropdown 
                    placeholder='Price' 
                    onChange={this.handleChangePrice} 
                    selection 
                    options={this.options_price}
                    value={this.state.opPrice} 
                     />)
            }
        }
        if(this.state.movieSort == 'searchName'){
            subSort = this.state.searchBox
        }
        
        return (
            <div 
                style={
                    {
                        backgroundColor:'#1b1e2d',
                        borderRadius: '8px',
                        padding: '30px',
                        marginBottom: '20px' 
                    }
                }
            >
                <style>{`
                .ui.grid.divided:not([class*="vertically divided"]) > .row > .column {
                    box-shadow: -1px 0 0 0 #d4d4d4;
                }
                .ui[class*="vertically divided"].grid > .row:before {
                    box-shadow: 0 -1px 0 0 rgba(212, 212, 212, 1.0);
                }
                `}</style>
                <Grid >
                    <Grid.Row columns={2}>
                    <Grid.Column>
                    <Header as='h1' style={{fontSize:"35px"}} inverted textAlign='left'>
                                All Movies
                                </Header>
                    </Grid.Column>
                    <Grid.Column style={{textAlign:"right"}}>
                        <Input 
                            icon={<Icon name='search' onClick={this.clickSearch} inverted circular link />} 
                            placeholder='ค้นหา..(ชื่อ)' 
                            value={this.state.searchBox}
                            onChange={this.handleChangeSearchBox}
                        />
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={1}>
                    <Grid.Column>
                    <Dropdown placeholder='เรียงลำดับ' onChange={this.handleChange} selection options={this.options} />
                                &nbsp;&nbsp;{dropdownSlave()}
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
                <MovieList sort={this.state.movieSort} subSort={subSort}/>
        </div>
        );
    }
}
export default Body;