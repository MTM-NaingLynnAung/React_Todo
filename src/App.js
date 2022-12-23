import './App.css';
import{ useState, useRef, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, json } from "react-router-dom";
const App = () => {

  const location = useLocation();
  const unique_id = uuid();
  const inputRef = useRef()
  const [ titleName, setValue ] = useState('');
  const [ filter, setfilter ] = useState(JSON.parse(localStorage.getItem('todosItem')) ||[]);
  const [ todos, setTodos ] = useState(JSON.parse(localStorage.getItem('todosItem')) ||[]);
  let [ editTitle, setEditValue ] = useState('');

  useEffect(() => {
    localStorage.setItem('todosItem', JSON.stringify(todos))
  }, [todos])

  const addTodo = () => {
    let val = titleName.trim();
    if(val){
      setTodos([...todos, { id: unique_id, title: titleName, completed: false, edit: false }]);
      setfilter([...todos, { id: unique_id, title: titleName, completed: false, edit: false }]);
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
    setfilter(
      todos.map(item => {
        if(item.id === todo.id){
          return { ...item, completed: !item.completed }
        }
        return item
      })
    )
   }

   const handleEdit = (todo, e) => {
    setEditValue(todo.title)
    setTodos(
      todos.map(item => {
        if(item.id === todo.id){
          if(e.type === 'keydown' || e.type === 'blur'){
            console.log('remove')
            return { ...item, title: editTitle, edit: false }
          }
          return { ...item, title: editTitle, edit: !item.edit }
        }
        return item
      })
    )
    setfilter(
      todos.map(item => {
        if(item.id === todo.id){
          if(e.type === 'keydown' || e.type === 'blur'){
            console.log('remove')
            return { ...item, title: editTitle, edit: false }
          }
          return { ...item, title: editTitle, edit: !item.edit }
        }
        return item
      })
    )
   }

   const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    setfilter(todos.filter(todo => todo.id !== id));
   }
   const clearCompleted = () => {
    setTodos(todos.filter(todo => todo.completed !== true));
    setfilter(todos.filter(todo => todo.completed !== true));
   }

    
   const filterTodo = () => {
   
      setfilter(
        todos.filter(todo => {
          if(location.pathname === '/active'){
            console.log('active')
            return todo.completed === false
          }else if(location.pathname === '/completed'){
            console.log('completed')
            return todo.completed === true
          }else{
            console.log('all')
            return todo
          }
        })
      )
   
   }
  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className='col-4 m-auto'>
        <div>
          <input type="text" className='form-control' onKeyPress={ event => event.charCode === 13 && addTodo() } onChange={ (event) => { setValue(event.target.value) } } value={titleName} />
        </div>
        <ul className='mt-3 pt-3'>
          { filter.map((todo) => {
              return (
                <li className='d-flex align-items-center position-relative mb-4 li-width' key={todo.id}>
                  <input type="checkbox" className='me-5 larger' onClick={() => handleComplete(todo)} />
                  <div className="w-100 h-100 d-flex align-items-center" onDoubleClick={ (e) => handleEdit(todo, e) } onKeyDown={ e => e.which === 13 && handleEdit(todo, e) }>
                    <label className={ `text-size w-100 ${ todo.completed === true ? 'complete' : '' } `} >{ todo.title }</label>
                    <span className="position-absolute size" onClick={() => handleDelete(todo.id)} >&times;</span>
                    <input ref={(inputRef) => inputRef?.focus?.()} type={todo.edit ? 'text' : 'hidden'} id="edit" className="edit-form text-size col-10" onChange={ (event) => { setEditValue(event.target.value) } } value={editTitle} onBlur={ (e) => e.type === 'blur' && handleEdit(todo,e)} />
                  </div>
                  
                </li>
              )
            })
          }
        </ul>
        <div className="d-flex justify-content-between align-items-center">
        <span className="">{  } item left</span>
        <ul className="d-flex justify-content-between m-0 col-5 p-0" style={{fontSize: 1 +'rem'}}>
          
              <Link to='/' onClick={filterTodo}>All</Link>
              <Link to='/active' onClick={filterTodo}>Active</Link>
              <Link to='/completed' onClick={filterTodo}>Completed</Link>
           
        
        </ul>
        <span className="col-3"><Link to='/' onClick={() => clearCompleted()}>Clear Completed</Link></span>
      </div>
      </div>
    
      
    </div>
  );
  
}

export default App;
