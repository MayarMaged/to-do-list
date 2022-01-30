import '../App.css';
import React, { useReducer } from 'react';
import api from '../api/todos';
import { v4 as uuid } from 'uuid';

const formReducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value
    }
}

function NewForm(props){
    const [formData, setFormData] = useReducer(formReducer, {});
  
    const handleSubmit = event => {
      event.preventDefault();
      submitToDo(formData);
      document.getElementById('description').value = '';
    }
  
    const submitToDo = async (newItem) => {
      let today = new Date()
      let todayUTC = today.toISOString();

      const newTodo = {
        "id": uuid(),
        "user": "Mayar",
        "isCompleted": false,
        "gender": "female",
        "name": newItem.name,
        "description": "....",
        "registered": todayUTC
      }
      
      await api.post(`/todos`, newTodo);
      props.onSubmitData();
    }
  
    const handleChange = event => {
      setFormData({
        name: event.target.name,
        value: event.target.value,
      });
    }

    return (
      <>
      <form onSubmit={handleSubmit} className='flex-horizontal'>
        <fieldset className='flex-horizontal remove-border'>
          <label className='flex-horizontal'>
            <p className='title-secondary'>Details</p>
            <textarea rows={5} cols={100} id="description" name="name" value={formData.name} className='in'
            onChange={handleChange}></textarea>
          </label>
        </fieldset>
        <button className='btn' type="submit">Submit</button>
      </form>
      </>
    
    )
  }

  export default NewForm;