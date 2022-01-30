import './App.css';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import api from './api/todos';

// Importing Components
import NewForm from './components/NewForm';
import FilterBar from './components/FilterBar';
import List from './components/List';
import Pagination from './components/Pagination';

function App() {
  const [items, setData] = useState([]);
  const [pagesTotal, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCompleted, setShowCompleted] = useState(false);
  const [selectedUser, setUser] = useState("All");


  //1. Get
  const GetAllItems = async (page, isCompleted, selectedUser) => {
    const params = {
      _page: page,
      _limit: 20,
    }
    if(isCompleted == true) {
      params['_page'] = 1;
      params['isCompleted'] = isCompleted;
    } else{
      delete params.isCompleted;
    }
    if(selectedUser != "All"){
      params['_page'] = 1;
      params['user'] = selectedUser;
    } else {
      delete params.user;
    }
    debugger;
    const response = await api.get("/todos", {params: params});
    return response;
  }

  // 2. Update
  const changeStatus = async (l) => {
    const newTodo = l;
    newTodo.isCompleted = !l.isCompleted;
    await api.put(`/todos/${l.id}`, newTodo);
    Paginate(currentPage, showCompleted, selectedUser);
  }

  // 3. Delete
  const removeItem = async (l) => {
    await api.delete(`/todos/${l.id}`, l);
    Paginate(currentPage, showCompleted, selectedUser);
  }

  const Paginate = async (currentPage, showCompleted, selectedUser) => {
    const allTodos = await GetAllItems(currentPage, showCompleted, selectedUser);

    let totalCount = Number(allTodos.headers["x-total-count"]);
    let pageNumber =  Math.ceil(totalCount/20)
    setPage(pageNumber);
    setCurrentPage(currentPage);
    if(allTodos) {
      setData(allTodos);
    }
  };

  useEffect(() => {
    Paginate(1, showCompleted, selectedUser);
    return () => console.log("Component is about to rerender!");
  }, [])

  useEffect(() => {
    Paginate(currentPage, showCompleted, selectedUser)
    return () => console.log("Component is about to rerender!");
  },[showCompleted, selectedUser])


  const showInputForm = () => {
    ReactDOM.render(
      <NewForm onSubmitData={Paginate} />,
      document.getElementById('form')
    );
    document.getElementById('addBtn').remove();
  }

  return (
    <div className="App">
      <h1 className='underline'>To-Do List: </h1>
      <button className="btn App-btn" id="addBtn" onClick={() => showInputForm()}> + Add a To-Do </button>
      <div id="form"></div>

      <div id="filterBar" className='flex-horizontal center'>
        <FilterBar setUser={setUser} setShowCompleted={setShowCompleted} />
      </div>

      <List items={items} changeStatus={changeStatus} removeItem={removeItem} />

      <div>
        <Pagination Paginate={Paginate} pagesTotal={pagesTotal} currentPage={currentPage}
        showCompleted={showCompleted} selectedUser={selectedUser} />
      </div>
      
      
    </div>
  );
}

export default App;

