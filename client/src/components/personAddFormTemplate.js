import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const PersonAddFormTemplate = ( {show, formErrors, savePerson, updateForm, onHide, editMode, person, personName  })=> {
   const { register, handleSubmit, errors, setError } = useForm();

   if(Object.keys(formErrors).length ){
    for (const [key, value] of Object.entries(formErrors)) {
        setError(key, value.error, value.message)
    }
   }

  return (


    <Modal
      show = {show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
           { editMode ? `Update ${personName}'s  Details `: "Add New Employee's Details"  }
        </Modal.Title>
      </Modal.Header>
      <form name="person-form" className="needs-validation" noValidate onSubmit = {handleSubmit(savePerson)}>
      <Modal.Body>

            <div className="form-row">
            <div className="col-md-1">&nbsp;</div>
            <div className="col-md-10">
            <div className="row">
                <div className="col-md-12 mb-8">
                    <label htmlFor="materialRegisterFormFullName" icon='user'>Full name</label>
                        <input type="text" className="form-control" id="validationCustom01" placeholder="Full Name"
                            name="name"
                            onChange = { (evt)=>{updateForm(evt)}}
                            value = { editMode && (person.name || "")}
                            ref={register({
                              required: 'Name is Required',

                              })
                            }

                         />

                        {errors.name &&
                       <div className=" alert alert-danger" role="alert"> { errors.name.message }
                        </div>
                        }

                 </div>
             </div>
             <div className="row">
             <div className="col-md-6 mb-4">
                 <label htmlFor="materialRegisterFormEmail">E-mail</label>
                    <input type="email" id="materialRegisterFormEmail" className="form-control" placeholder="Email"
                      name="email"
                      value = { editMode && (person.email || "")}
                      onChange = {(evt)=>{updateForm(evt)}}
                      disabled = {editMode}
                      readOnly = {editMode}
                      ref={register({
                            required: 'Email is Required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                              message: "Invalid email address"
                            }
                          })}

                      />
                      {errors.email &&
                      <div className=" alert alert-danger" role="alert"> { errors.email.message }
                       </div>
                       }
             </div>

             <div className="col-md-6 mb-4">
                   <label htmlFor="materialRegisterFormUsername">Username</label>
                      <input type="text" id="materialRegisterFormUsername" className="form-control" placeholder="Username"
                        name="username"
                        onChange = {(evt)=>{updateForm(evt)}}
                        value = { editMode && (person.username || "")}
                        disabled = {editMode}
                        readOnly = {editMode}
                        ref={register({
                            required: 'Username is Required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]/i,
                              message: "Invalid username"
                            }

                          })}
                      />
                       {errors.username &&
                        <div className=" alert alert-danger" role="alert"> { errors.username.message }
                       </div>
                       }

              </div>
            </div>

            <div className="row">
            <div className="col-md-6 mb-4">
                <label htmlFor="materialRegisterFormLocation">Location</label>
                    <input type="text" id="materialRegisterFormLocation" className="form-control" placeholder="Location"
                        name="location"
                        onChange = {(evt)=>{updateForm(evt)}}
                        value = { editMode && (person.location || "")}
                        ref={register({
                              required: 'Location is Required'
                              }
                            )}
                     />
                          {errors.location &&
                           <div className=" alert alert-danger" role="alert"> { errors.location.message }
                          </div>
                          }

            </div>


               <div className="col-md-6 mb-4">
                    <label htmlFor="materialRegisterFormPhone">Phone number</label>
                          <input type="text" id="materialRegisterFormPhone" className="form-control" aria-describedby="materialRegisterFormPhoneHelpBlock"
                              placeholder="Phone Number"
                              name="phone"
                              onChange = {(evt)=>{updateForm(evt)}}
                              value = { editMode && (person.phone || "")}
                              ref={register({
                                    required: 'Phone Number cannot be empty!',
                                    pattern: {
                                          value: /^(?:\+?(61))? ?(?:\((?=.*\)))?(0?[2-57-8])\)? ?(\d\d(?:[- ](?=\d{3})|(?!\d\d[- ]?\d[- ]))\d\d[- ]?\d[- ]?\d{3})$/i,
                                          message: "Invalid Phone Number"
                                        },
                                    }
                                  )}/>

                                {errors.phone &&
                                 <div className=" alert alert-danger" role="alert"> { errors.phone.message }
                                </div>
                                }

                </div>
             </div>

          </div>
          <div className="col-md-1">&nbsp;</div>
      </div>


      </Modal.Body>
      <Modal.Footer>
                <Button className="btn btn-danger" onClick={onHide}>Close</Button>
                <Button type='submit' className="btn btn-success">Save</Button>

      </Modal.Footer>
      </form>
    </Modal>
  );
}

export default PersonAddFormTemplate;