import React, { Component } from 'react';
import { Header, Dropdown } from 'semantic-ui-react'

import MovieList from './movieList';

class Body extends Component {

    constructor(props){
        super(props);
        this.state = {movieSort: 'time'};

        this.options =  [ 
                            {  value: 'time', text: 'Time' },
                            {  value: 'date', text: 'Date' }, 
                            {  value: 'price', text: 'Price' }, 
                        ];
                        
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event, data) {
        // console.log(data.value);
        this.setState({movieSort: data.value});
    }
    
    render() {
        return (
            <div>
                <style>{`
                .ui.grid.divided:not([class*="vertically divided"]) > .row > .column {
                    box-shadow: -1px 0 0 0 #d4d4d4;
                }
                .ui[class*="vertically divided"].grid > .row:before {
                    box-shadow: 0 -1px 0 0 rgba(212, 212, 212, 1.0);
                }
                `}</style>
                <Header as='h2' inverted textAlign='left'>
                Movie List
                </Header>
                <Dropdown placeholder='Sort' onChange={this.handleChange} selection options={this.options} />
                <br/>
                <MovieList sort={this.state.movieSort}/>
        </div>
        );
    }
}
export default Body;