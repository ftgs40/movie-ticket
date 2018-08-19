import React, { Component } from 'react';
import { Container, Divider, Grid, Header, Icon } from 'semantic-ui-react'

class MovieList extends Component {

    constructor(props){
        super(props);
        console.log(props);
    }
    
    render() {
        return (
            <div>
                <h1>{this.props.sort}</h1>
                <Grid columns={3} divided>
                    <Grid.Row>
                        <Grid.Column>
                        <p />
                        </Grid.Column>
                        <Grid.Column>
                        <p />
                        </Grid.Column>
                        <Grid.Column>
                        <p />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                        <p />
                        </Grid.Column>
                        <Grid.Column>
                        <p />
                        </Grid.Column>
                        <Grid.Column>
                        <p />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
        </div>
        );
    }
}
export default MovieList;