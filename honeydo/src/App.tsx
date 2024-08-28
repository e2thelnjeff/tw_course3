import { useState, useEffect } from 'react';
import './App.css';
import { delItem } from './components/functions'
import { statusUpdate } from './components/functions'
import { addNewItem } from './components/functions'
import { editItem } from './components/functions'

const SERVER_URL = "http://localhost:3000";

function App() {
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [showFilter, setShowFilter] = useState('ALL');

  var doneItems = [];
  var notDoneItems = [];

  if (list) {
    list.map(item=>{
      console.log(item.completed);
      item.completed ? doneItems.push(item):notDoneItems.push(item);  
    })

  }
  
  doneItems.map(doneItem=>{
    console.log(doneItem.id)
  })
  

  var whichList = [];

  if (showFilter==='DONE') {
    whichList = doneItems;
  } else if (showFilter==='NOT DONE') {
    whichList = notDoneItems;
  } else {
    whichList = [...doneItems, ...notDoneItems]
  }

  useEffect(()=> {
    fetch(SERVER_URL+'/todos').then((res) => res.json()).then((data) => {
      setList(data);
      setLoading(false);
    });
  }, []);

const deleteHandler = async (e) => {
  const targetID = parseInt(e.target.id);
  const newData = delItem(targetID);
  setList(await newData)
}

const statusHandler = async (e) => {
  const targetID = parseInt(e.target.id);
  const newData = statusUpdate(targetID);
  setList(await newData)
}

const newItemHandler = async (e) => {
  var addThis = document.getElementById("addThis").value;
  setList(await newData)
}

const toggleHandler = () => {
  setEditing(!editing)
}

const editHandler = async (e) => {
  const itemID = parseInt(e.target.id);
  const edit_what = 'edit'+itemID;
  var edits = document.getElementById(edit_what).value;
  const newData = editItem(itemID, edits);
  setList(await newData);
  toggleHandler()
}

  return (
      <div className="App">
        { loading ? 'Loading, please wait.':
        <table>
            <tr>
              <td>Show...</td>
              <td><button onClick={()=>setShowFilter('ALL')}>ALL</button></td>
              <td><button onClick={()=>setShowFilter('DONE')}>DONE</button></td>
              <td><button onClick={()=>setShowFilter('NOT DONE')}>NOT DONE</button></td>
            </tr>
            <tr>
              <td>Delete</td>
              <td>Item #</td>
              <td>Description</td>
              <td>Edit</td>
              <td>Status</td>
              <td>Change Status</td>
            </tr>
          {whichList.map(item=>
            /*typescript might help the issues with list and item*/
            <tr>
              <td><button id={item.id} onClick={deleteHandler}>del item</button></td>
              <td>{item.id}</td>

              {editing ? 
                  <td><input id={'edit'+item.id} /></td>:
                  <td>{item.text}</td>
              }

              {editing ?
                  <td><button id={item.id} onClick={editHandler}>Submit</button></td>:
                  <td><button onClick={toggleHandler}>Edit</button></td>
              }
    
              <td>{item.completed ? 'Done':'Not Done'}</td>
              {item.completed ? 
                <td><button id={item.id} onClick={statusHandler}>Undone</button></td>: 
                <td><button id={item.id} onClick={statusHandler}>Done</button></td>}              
            </tr>
          )}
            <tr>
              <td>Add a To Do: </td>
              <td><input id='addThis' /></td>
              <td><button onClick={newItemHandler}>Procrastinate</button></td>
            </tr>
        </table>
        }
      </div>
  )
}

export default App;
