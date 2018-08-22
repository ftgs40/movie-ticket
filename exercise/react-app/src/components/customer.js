import React, { Component } from 'react';
import { Container, Divider, Grid, Header, Icon } from 'semantic-ui-react'

import Herder from './herder';
import Body from './body';

const home = () => <h1>home</h1>
const about = () => <h1>about</h1>

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