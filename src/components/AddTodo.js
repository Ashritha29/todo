import { useState } from 'react'
import { set, useForm } from 'react-hook-form'
import { FaCheck,FaMinus,FaPen } from "react-icons/fa";

function AddTodo() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const [todos, setTodos] = useState([])
    const [completedtasks, setCompleted] = useState([])
    let [count, setCount] = useState(0)

    const onFormSubmit = (todoObj) => {
        setTodos([...todos, todoObj.todo])
    }

    const removetodo = (i) => {
        let temp = [...todos]
        temp.splice(i, 1)
        setTodos(temp)
    }

    const taskCompleted = (ind) => {
        removetodo(ind)
        setCompleted([...completedtasks, todos[ind]])
        setCount(++count)
    }

    const removeCompleted = (i) => {
        let temp = [...completedtasks]
        temp.splice(i, 1)
        setCompleted(temp)
        setCount(--count)
    }
    return (
        <div>
            <p className='display-4 text-danger text-center'>TO DO LIST</p>
            <div className='w-50 m-5 mx-auto'>
                <form onSubmit={handleSubmit(onFormSubmit)} className='w-50 mx-auto'>
                    <div>
                        <label htmlFor="todo">Enter a Task:</label>
                        <input type="text" id="todo" className='form-control' {...register("todo", { required: true })} />
                        {errors.todo?.type === 'required' && <p className='text-danger'>*Required</p>}
                    </div>
                    <div className='mx-auto'>
                        <button className='btn btn-success w-100 mt-3' type="submit" ><div className='me-2 d-inline'><FaCheck/></div>Add Task</button>
                    </div>
                </form>
            </div>
            <div className='mt-5 row p-2 m-5'>
                <div className="card col-5 border border-solid border-dark">
                    <p className='text-danger h3 m-2'><b>Pending Tasks</b></p>
                    <ul className="list-group list-group-flush ">
                        {
                            todos.map((todo, index) => 
                                <li className="list-group-item text-light" key={index}>
                                    <div className='row border border-danger border-solid p-2 bg-dark'>
                                        <div className='col-6 h4'>{todo} </div>
                                        <div className='text-end col-6'>
                                            <button className='btn btn-light border me-3 p-0' onClick={() => taskCompleted(index)}><FaPen/></button>
                                            <button className='btn btn-light border p-0' onClick={() => removetodo(index)}><FaMinus/></button>
                                        </div>
                                    </div>
                                </li>
                            )
                        }
                    </ul>
                </div>
                <div className='col-2'></div>
                <div className="card col-5 border border-solid border-dark">
                    <p className='text-danger h3 m-2'><b>Completed Tasks</b> ({count})</p>
                    <ul className="list-group list-group-flush">
                        {
                            completedtasks.map((task, index) =>
                                <li className="list-group-item text-light" key={index}>
                                    <div className='row border border-danger border-solid p-2 bg-dark'>
                                        <div className='col-6 h4'>
                                            {task}
                                        </div>
                                        <div className='col-6 text-end'>
                                            <button className='btn btn-light border p-0' onClick={() => removeCompleted(index)}><FaMinus/></button>
                                        </div>
                                    </div>

                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default AddTodo