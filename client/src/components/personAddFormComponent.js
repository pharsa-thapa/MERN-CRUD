import React, { Component } from 'react';
import {ButtonToolbar} from 'react-bootstrap';

import PersonAddFormTemplate from './personAddFormTemplate';
import { PERSON_URL, HEADERS } from '../config/apiconfig';

class PersonAddFormComponent extends Component{

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
                 isOpen: false ,
                 formErrors : {},
                 editMode: false,
                 person: {
                    id : null,
                    name : null,
                    username: null,
                    email: null,
                    location: null,
                    phone: null
                 },
                 personName : ''

        }
      }

   resetPerson(){
            let tempPerson = {
                             id : null,
                             name : null,
                             username: null,
                             email: null,
                             location: null,
                             phone: null
                             }

           this.setState({
                        person : tempPerson
                      })
    }


    toggleModal = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

      savePersonDetails(evt){
         this.setState({ formErrors: {} });
         fetch(PERSON_URL,{
               method:"POST",
               headers : HEADERS,
               body:JSON.stringify(this.state.person)
               }
         )
         .then(res => res.json())
         .then((data) => {
           if(data.errors !== undefined){
                let errors = {};
                for (const [key, value] of Object.entries(data.errors)) {
                  errors[key] ={ field : key, error : value.name , message: value.message.charAt(0).toUpperCase() + value.message.slice(1)}
                }
                this.setState({ formErrors: errors });
           }else{
               this.props.updatePerson(data)
//               this.setState({ person: null });
               this.resetPerson()
               this.toggleModal();
           }
         })
         .catch(err => {
                 console.log(err);
         });

      }

      updateFormValues(event){
           var savedPerson = Object.assign({}, this.state.person);

           if(event.target.name ===  "name" ){
                  event.target.value = event.target.value.trimLeft();
           }else{
                event.target.value = event.target.value.trim();
           }

           savedPerson[event.target.name] =  event.target.value
           this.setState({person : savedPerson});
      }

    render(){
        return (
           <ButtonToolbar>

                  <button className="btn btn-primary float-md-right force-pull-right" onClick={() => {this.toggleModal()} }>
                    Add New +
                  </button>
                  <PersonAddFormTemplate
                    show = {this.state.isOpen}
                    onHide={() =>{this.toggleModal(); this.resetPerson()}}
                    editingPerson = {this.state.person}
                    savePerson = { (evt) => {this.savePersonDetails(evt)}}
                    updateForm = { (evt) => {this.updateFormValues(evt)}}
                    formErrors = {this.state.formErrors}
                  />
                </ButtonToolbar>
              );
    }
}

export default PersonAddFormComponent;