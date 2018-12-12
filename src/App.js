import React, { Component } from 'react';
//import { HashRouter, Route, Switch } from 'react-router-dom';
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom'
import './App.scss';
import { connect } from 'react-redux'

// Containers
import { DefaultLayout } from './containers';

import { getUser } from './store/Actions'


let layout = (<div></div>)
  

class App extends Component {

  componentWillMount() {
    this.props.getUser()
    if(this.props.user.loading === false && this.props.user.email === undefined) {
      this.props.history.replace('/login')
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.user.loading === false && nextProps.user.email === undefined) {      
      this.props.history.replace('/login')
    }
  }

  componentDidMount() {
    layout = <DefaultLayout/>
  }
  
  render() {
    return (
      <div>{layout}</div>
    );
  }
}

let app = connect((state, ownProps) =>({
  user: state.user
}), { getUser })(App)

export default app;
