import React, { Component } from 'react';
import { Container, Divider, Grid, Header, Icon } from 'semantic-ui-react'

import Herder from './herder';
import Body from './body';

class LandingComponent extends Component {
    render() {
        return (
            <Container>
                <style>{`
                html, body {
                    background-color: #252839 !important;

                }

                }
                `}</style>
                <Herder/>
                <Body/>
            </Container>
        );
    }
}
export default LandingComponent;