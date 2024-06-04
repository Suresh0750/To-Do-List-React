
import React,{useState,useEffect} from 'react'
// # react toastify for showing the invalid task
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
// # useing sweet alert for ask confirmation delete 
import Swal from 'sweetalert2'
// # for use the icon from awesome font.com
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash,faAngleUp,faAngleDown} from '@fortawesome/free-solid-svg-icons'
{/* <FontAwesomeIcon icon="fa-solid fa-angle-up" /> */}
// import { faDownToBracket} from '@fortawesome/free-regular-svg-icons'
function ToDoList(){

    //#  retrive the task from localStorage
    const valSetLocal = JSON.parse(localStorage.getItem('task')) || []
    let getVal = []
    if(valSetLocal.length!=0){
        valSetLocal.map((task)=>{
            getVal.push(task.value)
        })
    }



    // # for all buttons
    const style = {
        cursor : 'pointer'
    }

    const [task,setTask] = useState(getVal)
    const [newTask, setnewTask] = useState('')


    // # show the task to the user 

   
    // setTask(getVal)

    const handleInputchange = (e)=>{
        setnewTask(e.target.value)
    }

    // # addTask 
    const addTask = ()=>{
        if(newTask.trim('')!=''){
            setTask([...task,newTask])
            setnewTask('')
            const storTaskLocal = {
                value : newTask,
                isCompleted : false
            }
            
            let getStoreval = JSON.parse(localStorage.getItem('task')) || []
            getStoreval.push(storTaskLocal)
            localStorage.setItem('task',JSON.stringify(getStoreval))
        }else{
            toast.error('Please enter valid task')
        }
    }
    
    
    // # delete the task
    const deleteTask = (index)=>{
        Swal.fire({
            title: 'Are you sure?',
            text: 'Have you want to delete the task',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          }).then((result) => {

            if (result.value) {

                let updateTask = [...task]

                const getVal = updateTask[index]

                let retriveTask = JSON.parse(localStorage.getItem('task'))


                // # delete the task from localstorage
                retriveTask = retriveTask.filter((task)=> task.value!=getVal)

                localStorage.setItem('task',JSON.stringify(retriveTask))

                updateTask=updateTask.filter((t,i)=> i!=index)
                
                setTask(updateTask)
              Swal.fire(
                'Deleted!',
                'Your task has been deleted.',
                'success'
              )
            
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire(
                'Cancelled',
                'Your task is safe :)',
                'error'
              )
            }
          })
            
    }

    //# move the task upside
    const moveUp = (index)=>{

        if(index>0) {

            let updateTask = [...task]
            let tempTask = updateTask[index]
            updateTask[index] = updateTask[index-1] 
            updateTask[index-1] = tempTask 
            setTask(updateTask)
            
            // # localStorage
            updateTask = JSON.parse(localStorage.getItem('task'))
            tempTask = updateTask[index]
            updateTask[index] = updateTask[index-1] 
            updateTask[index-1] = tempTask 
            localStorage.setItem('task',JSON.stringify(updateTask))
        }
       

    }

    //# move the task downside

    const moveDown = (index)=>{

        if(index==task.length-1) return

            let updateTask = [...task]
            let tempTask = updateTask[index]
            updateTask[index] = updateTask[index+1] 
            updateTask[index+1] = tempTask 
            setTask(updateTask)

            //# in localStorage
            updateTask = JSON.parse(localStorage.getItem('task'))
            tempTask = updateTask[index]
            updateTask[index] = updateTask[index+1] 
            updateTask[index+1] = tempTask 
            localStorage.setItem('task',JSON.stringify(updateTask))

    }

    // # call add funtion while user click enter inside the inputbox
    
    const hadleEnterInput = (e)=>{
        
        if(e.keyCode==13){
            addTask()
        }
    }


    return(
        <div className='container'>
                <h1 className='titleTodo'>To Do List 🗒️</h1>
            <div className='boxAndBtn'>
                <input type="text" className='inputBox' onKeyUp={hadleEnterInput} value={newTask} onChange={handleInputchange}  placeholder="Enter the task" autoFocus/>
                <button className='Addbtn' onClick={addTask}>Add</button>
                <ToastContainer/>
            </div>
            <div className='showTask'>
                <ol>
                   {task.map((task,index)=>
                    <li key={index}>
                        <span>{task}</span>
                        <button className='deleteBtn' onClick={()=>deleteTask(index)}><FontAwesomeIcon icon={faTrash} /> </button>
                        <button style={style} className='' onClick={()=>moveUp(index)}><FontAwesomeIcon icon={faAngleUp} /></button>
                        <button style={style} className='' onClick={()=>moveDown(index)}><FontAwesomeIcon icon={faAngleDown} /></button>
                    </li>
                   )}
                </ol>
            </div>
        </div>
    )

}


export default ToDoList