import React,{ Component } from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import { Redirect  } from "react-router-dom";

class Admin extends Component{

    constructor(props){
      super(props);
      this.state = {username: '@dmin', password: '@dmin1234', isLogin: false};

      this.clickLogin   = this.clickLogin.bind(this);
      this.setUser  = this.setUser.bind(this);
      this.setPass  = this.setPass.bind(this);
    }

    clickLogin(){
      const user = '@dmin';
      const pass = '@dmin1234'
      // console.log(this.state);

      if(this.state.username == user && this.state.password == pass){
          console.log("login Success");
          this.props.history.push('/admin');
          this.setState({isLogin: true});
      }
    }
    setUser(event){
      this.setState({username: event.target.value});
    }
    setPass(event){
      this.setState({password: event.target.value});
    }
    render() {

      const  style = {
          container:{
              background: 'yellow',
              color:'#000'
          }
      }
      if(this.state.isLogin){
        return (<Redirect to="/admin/movie_landing"/>)
      }else{
        return (
          <div className='login-form'>
          <style>{`
            body > div,
            body > div > div,
            body > div > div > div.login-form {
              height: 100%;
            }
          `}</style>
          <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as='h2' color='blue' textAlign='center'>
              Log-in
              </Header>
              <Form size='large'>
                <Segment stacked>
                  <Form.Input 
                      fluid icon='user' 
                      iconPosition='left' 
                      placeholder='username' 
                      value={this.state.username}
                      onChange={this.setUser}
                  />
                  <Form.Input
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    value={this.state.password}
                    onChange={this.setPass}
                  />

                  <Button color='blue' fluid size='large' onClick={this.clickLogin}>
                    Login
                  </Button>
                </Segment>
              </Form>
            </Grid.Column>
          </Grid>
        </div>
        );
      }
    }
}
export default Admin;