import Navbar from './Navbar'
import { IoMdAddCircle } from 'react-icons/io'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import Task from './Task'

const TodoList = ({setInput, addTask, input, tasks, deleteTask, isAddingTask, deletingTaskId }) => <div className='w-[70%] bg-[#354ea3] py-4 px-9 rounded-[30px] overflow-y-scroll'>
  <Navbar />
  <h2 className='text-4xl bolder text-white pb-8'>
    What&apos;s up, Arsen!
  </h2>
  <div className='py-3 text-[#7d99e9]'>TODAY&apos;S TASKS</div>
  <form className='flex items-center justify-center'>
    <input
      className='rounded-[10px] w-full p-[10px] border-none outline-none bg-[#031956] text-white mb-[10px]'
      placeholder={isAddingTask ? 'Adding task to blockchain...' : 'Add a task for today...'}
      // take input from the form here
      value={input}
      onChange={(e) => setInput(e.target.value)}
      disabled={isAddingTask}
    />
    {isAddingTask ? (
      <AiOutlineLoading3Quarters className='text-[#ea0aff] text-[50px] ml-[20px] mb-[10px] animate-spin' />
    ) : (
      <IoMdAddCircle
        // Add an onClick method
        onClick={addTask}
        className='text-[#ea0aff] text-[50px] cursor-pointer ml-[20px] mb-[10px] hover:text-[#ff0aaa] transition-colors'
      />
    )}
  </form>

  <ul>
    {/* Loop through all tasks here using the Task component */}
    {tasks.map((task) => (
      <Task
        key={task.id}
        taskText={task.taskText}
        onClick={deleteTask(task.id)}
        isDeleting={deletingTaskId === task.id}
      />
    ))}
  </ul>
</div>

export default TodoList