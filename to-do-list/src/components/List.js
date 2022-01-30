import deletelogo from '../assets/logos/delete.png';


function List(props){
    return (
      <>
      {
        props.items.data && props.items.data.length>0 && props.items.data.map(l => ( 
          <div className="flex-horizontal todo-item" key={l.id}>
            <label className="container">
              <input type="checkbox" checked ={l.isCompleted} onChange={() => props.changeStatus(l)} />
              <span className="checkmark"></span>
            </label>
            <p className='padding-horizontal-sm width-60 text-main'>{l.name}</p>
            <p className='username'>By: {l.user}</p>
            <a onClick={() => props.removeItem(l)}>
              <img className="delete-logo" alt="delete logo" src={deletelogo}/>
            </a>
          </div>
        ))
      }
      </>
    )
}

export default List;