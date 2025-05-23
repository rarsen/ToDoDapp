import { BsFillTrashFill } from 'react-icons/bs'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Task = ({taskText, onClick, isDeleting}) => {
  return (
    <div className='flex items-center text-white'>
      <div className={`bg-[#031956] text-[#b6c7db] flex w-[70%] rounded-[15px] mb-[10px] flex-1 ${isDeleting ? 'opacity-50' : ''}`}>
        <div className='flex items-center justify-between w-full p-[20px] text-xl'>
          {taskText}
          {isDeleting && (
            <div className='flex items-center gap-2 text-sm'>
              <AiOutlineLoading3Quarters className='animate-spin' />
              <span>Deleting...</span>
            </div>
          )}
        </div>
      </div>
      {isDeleting ? (
        <AiOutlineLoading3Quarters className='text-2xl ml-10 animate-spin text-red-500' />
      ) : (
        <BsFillTrashFill
          onClick={onClick}
          className='text-2xl cursor-pointer ml-10 hover:text-red-500 transition-colors'
        />
      )}
    </div>
  )
}

export default Task
