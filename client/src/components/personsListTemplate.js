import React from 'react';
import PersonAddFormComponent from './personAddFormComponent';
import PersonEditFormComponent from './personEditFormComponent';

const PersonListTemplate = ({state, deleteButtonListener, updatePerson, editButtonListener })=> {
   return ( <div>
     <span><h2>Our Employees</h2></span>
     <PersonAddFormComponent updatePerson = { (evt) => { updatePerson(evt) }} editingPerson = { state.editingPerson } />
      <div>&nbsp;</div>
      {state.persons.map((person) => (

        <div className="card" key={person._id}>
          <div className="card-body">
            <h5 className="card-title">{person.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">U: {person.username}</h6>
            <h6 className="card-subtitle mb-2 text-muted">E: {person.email}</h6>
            <h6 className="card-subtitle mb-2 text-muted">M: {person.phone}</h6>
            <h6 className="card-subtitle mb-2 text-muted">A: {person.location}</h6>
            <p className="card-text">{person.age}</p>
            <button className='btn btn-danger' onClick={ () => {deleteButtonListener(person._id)} }>
            Delete
            </button>
            <span className = "btn-span">&nbsp;</span>

             <PersonEditFormComponent editingPersonId = { person._id } updatePerson = { (evt) => { updatePerson(evt)}}  />

          </div>
        </div>
      )
      )
      }
    </div>
)
};


export  default PersonListTemplate;