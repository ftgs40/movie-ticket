import React, { Component } from 'react';
import { Container, Divider, Grid, Header, Icon } from 'semantic-ui-react'
import { Link } from "react-router-dom";

class Herder extends Component {
    
    render() {
        const cinemaName = 'MY CENIMA';
        return (
            <Container>

    {/* <style>{`
      p {
        align-content: center;
        background-color: #495285;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 6em;
      }
      p > span {
        opacity: 0.4;
        text-align: center;
      }
    }
    `}</style> */}
    <Link to="/">
    <Header as='h2' icon inverted textAlign='center' style={{marginTop:'20px'}}>
      <Icon name='grid layout' />
      {cinemaName}
      {/* <Header.Subheader>
        This page contains some helpful examples that can be usefull for advanced layouts.
      </Header.Subheader> */}
    </Header>
    </Link>
    <Divider />

  </Container>
        );
    }
}
export default Herder;