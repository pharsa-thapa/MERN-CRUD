import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import  PersonListTemplate  from './personsListTemplate';
import { PERSON_URL, HEADERS } from '../config/apiconfig';

class PersonListComponent extends Component {

       constructor(props){
            super(props);
            this.props = props;
            this.state = { persons: []}
            this.addNewPerson.bind(this);
       }

       componentDidMount() {
               ReactDOM.findDOMNode(this).addEventListener('nv-event', this._handleNVEvent);
               this.loadPersonData();

       }

       loadPersonData(){

           fetch(PERSON_URL,{
                     method : 'GET',
                     headers : HEADERS
                 }
            )
           .then(res => res.json())
           .then((data) => {
             this.setState({ persons: data })
           })
           .catch(err => {
                   console.log(err);
           });

       }

       _handleNVEvent = event => {
               console.log(event);
           };

       onDeleteButtonClick = (personId) =>{
              if (window.confirm('Are you sure you wish to delete this item?')){

               fetch( PERSON_URL + personId,
                      {
                          method:"DELETE",
                          headers: HEADERS
                      }
               )
               .then(res => res.json())
               .then((data) => {
                  this.setState({
                            persons: this.state.persons.filter(item => item._id !== personId)
                          })
               })
               .catch(err => {
                       console.log(err);
               });

              }

       }



       componentWillUnmount() {
           ReactDOM.findDOMNode(this).removeEventListener('nv-event', this._handleNVEvent);
       }

       addNewPerson(newRecord){
            var existingPersonList = this.state.persons
            console.log(existingPersonList)
            let index = existingPersonList.findIndex(obj => obj._id === newRecord._id);

            if(index !== -1){
                existingPersonList[index] = newRecord
                this.setState({
                                 persons: existingPersonList
                               })

            }else {
               this.setState({
                 persons: [...this.state.persons, newRecord]
               })
           }
       }




       render() {
               return (
                 <PersonListTemplate
                 state={this.state}
                 deleteButtonListener={ this.onDeleteButtonClick }
                 updatePerson = {(evt) => this.addNewPerson(evt)}
                 />
               )
       }
 }

 export default PersonListComponent;