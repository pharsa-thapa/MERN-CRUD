import React, { Component } from 'react';

import PersonAddFormTemplate from './personAddFormTemplate';
import { PERSON_URL, HEADERS } from '../config/apiconfig';

class PersonEditFormComponent extends Component{

    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
                 isOpen: false ,
                 formErrors : {},
                 editMode: true,
                 person: {
                    _id : this.props.editingPersonId,
                    name : null,
                    username: null,
                    email: null,
                    location: null,
                    phone: null
                 },
                 personName : ""

        }
      }

   resetPerson(){
            let tempPerson = {
                             _id : null,
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

      loadPerson(){
         fetch(PERSON_URL + this.props.editingPersonId,{
                  method : 'GET',
                  headers : HEADERS
              }
         )
        .then(res => res.json())
        .then((data) => {
          this.setState({ person : data , personName:data.name})
        })
        .catch(err => {
                console.log(err);
        });
      }

      savePersonDetails(evt){
         this.setState({ formErrors: {} });
         fetch(PERSON_URL+this.state.person._id,{
               method:"PUT",
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
           <span className="inline">

                  <button className="btn btn-success" onClick={() => {this.loadPerson(); this.toggleModal()} }>
                   Edit
                  </button>
                  <PersonAddFormTemplate
                    show = {this.state.isOpen}
                    onHide={() =>{this.toggleModal(); this.resetPerson()}}
                    savePerson = { (evt) => {this.savePersonDetails(evt)}}
                    updateForm = { (evt) => {this.updateFormValues(evt)}}
                    formErrors = {this.state.formErrors}
                    editMode = { this.state.editMode }
                    person = { this.state.person}
                    personName = {this.state.personName}
                  />
                </span>
              );
    }
}

export default PersonEditFormComponent;