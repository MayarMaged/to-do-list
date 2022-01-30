import '../App.css';
import React from 'react';
import _ from 'lodash';

const allUsers  = ["Mayar","Barnett Brown","Stella Francis", "Fernandez Pace", "Herminia Davenport", "Addie Lancaster",
"Nola Nicholson","Lola Bryant", "Amanda Lara", "Battle Ryan", "Noelle Hartman", "Dorothea Richards", "Emily Larsen",
"Augusta Delgado", "Sheri Rosales", "Mclean Walker" ]

function FilterBar(props){
    const filterByUser = (user) => {
        props.setUser(user);
    }
    const filterCompleted = (event) => {
        props.setShowCompleted(event.target.checked);
    }
    return(
      <>
        <span className='title-secondary'>Filter by user</span>
        <select className='dropdown' onChange={(event) => filterByUser(event.target.value)}>
          <option>All</option>
            {
              allUsers && allUsers.length > 0 && allUsers.map(user => (
                <option key={user}>{user}</option>
              ))
            }
        </select>
        <div className='flex-horizontal center'>
          <p className='padding-horizontal-sm'>All</p>
          <label className="switch">
            <input onChange={(event) => filterCompleted(event)} type="checkbox"></input>
            <span className="slider round"></span>
          </label>
          <p className='padding-horizontal-sm'>Completed</p>
        </div>
      </>
    )
}

export default FilterBar;