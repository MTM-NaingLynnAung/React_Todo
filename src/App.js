import './App.css';
import { useState } from 'react';
const App = () => {
  
  const [ titleName, setValue ] = useState('');
  const [ todos, setTodos ] = useState([]);
  const addTodo = () => {
    let val = titleName.trim();
    if(val){
      setTodos([...todos, { id: todos.length + 1, title: titleName }]);
      setValue('');
    }
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
                <li className='d-flex align-items-center position-relative mb-4' key={todo.id}>
                  <input type="checkbox" className='me-5 larger' />
                  <span className='text-size'>{ todo.title }</span>
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
