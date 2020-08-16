import React, { Component } from 'react';
import './App.css';

import HeaderComponent from './components/headerComponent';
import PersonListComponent from './components/personListComponent';


class App extends Component {

  render(){
        return(

        <div>
        <HeaderComponent />
        <div className="content">
        <div className="wrapper mt-5">
            <PersonListComponent/>
        </div>
        </div>
        </div>
        );
   }

}

export default App;
