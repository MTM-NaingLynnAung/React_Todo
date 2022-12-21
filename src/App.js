import './App.css';
import { useState, useRef } from 'react';
const App = () => {
  const inputRef = useRef(null)
  const [ titleName, setValue ] = useState('');
  const [ todos, setTodos ] = useState([]);
  let [ editTitle, setEditValue ] = useState('');

  const addTodo = () => {
    let val = titleName.trim();
    if(val){
      setTodos([...todos, { id: todos.length + 1, title: titleName, completed: false, edit: false }]);
      setValue('');
    }
   }

   const handleComplete = (todo) => {
    setTodos(
      todos.map(item => {
        if(item.id === todo.id){
          return { ...item, completed: !item.completed }
        }
        return item
      })
    )
   }

   const handleEdit = (todo) => {
        console.log('outside')
    setEditValue(todo.title)
    setTodos(
      todos.map(item => {
        if(item.id === todo.id){
          return { ...item, title: editTitle, edit: !item.edit }
        }
        return item
      })
    )
   }

   const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
   }
  
  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className='col-3 m-auto'>
        <div>
          <input type="text" className='form-control' onKeyPress={ event => event.charCode === 13 && addTodo() } onChange={ (event) => { setValue(event.target.value) } } value={titleName} />
        </div>
        <ul className='mt-3 pt-3'>
          { todos.map((todo) => {
              return (
                <li className='d-flex align-items-center position-relative mb-4 li-width' key={todo.id}>
                  <input type="checkbox" className='me-5 larger' onClick={() => handleComplete(todo)} />
                  <div className="w-100 h-100 d-flex align-items-center" onDoubleClick={ () => handleEdit(todo) } onKeyPress={ (e) => e.charCode === 13 && handleEdit(todo) }  >
                    <label className={ `text-size w-100 ${ todo.completed === true ? 'complete' : '' } `} >{ todo.title }</label>
                    <span className="position-absolute size" onClick={() => handleDelete(todo.id)} >&times;</span>
                    <input ref={inputRef} type={todo.edit ? 'text' : 'hidden'} id="edit" className="edit-form text-size" onChange={ (event) => { setEditValue(event.target.value) } } value={editTitle} onBlur={ () => handleEdit(todo)} />
                  </div>
                  
                </li>
              )
            })
          }
        </ul>
      </div>
    
      
    </div>
  );
  
}

export default App;
