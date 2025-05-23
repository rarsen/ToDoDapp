import WrongNetworkMessage from '../components/WrongNetworkMessage'
import ConnectWalletButton from '../components/ConnectWalletButton'
import TodoList from '../components/TodoList'
import TaskAbi from '../../backend/build/contracts/taskContract.json'
import { TaskContractAddress } from '../config.js'
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'

export default function Home() {
  const [correctNetwork, setCorrectNetwork] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('');
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [deletingTaskId, setDeletingTaskId] = useState(null);


  useEffect(() => {
    connectWallet();
    getAllTasks();
  }, []);


  // Check if connected to correct network
  const checkNetwork = async () => {
    try {
      const { ethereum } = window;
      let chainId = await ethereum.request({ method: 'eth_chainId' });
      console.log('Connected to chain:', chainId);

      // Sepolia testnet chainId is 0xaa36a7
      const targetNetwork = '0xaa36a7'; 

      if (chainId !== targetNetwork) {
        alert('You are not connected to the correct network! Please connect to Sepolia Testnet.');
        setCorrectNetwork(false);
        return false;
      } else {
        setCorrectNetwork(true);
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log('Metamask not detected');
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Connected account:', accounts[0]);
      setIsLoggedIn(true);
      setCurrentAccount(accounts[0]);

      // Check network after connecting
      const isCorrect = await checkNetwork();
      if (isCorrect) {
        getAllTasks();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Get all tasks from the contract
  const getAllTasks = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        // Check which version of ethers is being used
        let provider;
        let signer;

        // For ethers v6
        if (ethers.BrowserProvider) {
          provider = new ethers.BrowserProvider(ethereum);
          signer = await provider.getSigner();
        }
        // For ethers v5
        else if (ethers.providers && ethers.providers.Web3Provider) {
          provider = new ethers.providers.Web3Provider(ethereum);
          signer = provider.getSigner();
        } else {
          console.error("Uns upported ethers version");
          return;
        }

        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        );

        const allTasks = await TaskContract.getMyTasks();
        setTasks(allTasks);
      } else {
        console.log('Ethereum object not found');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Add tasks from front-end onto the blockchain
  const addTask = async (e) => {
    e.preventDefault();

    if (!input) return;

    setIsAddingTask(true);

    try {
      const { ethereum } = window;
      if (ethereum) {
        // Check which version of ethers is being used
        let provider;
        let signer;

        // For ethers v6
        if (ethers.BrowserProvider) {
          provider = new ethers.BrowserProvider(ethereum);
          signer = await provider.getSigner();
        }
        // For ethers v5
        else if (ethers.providers && ethers.providers.Web3Provider) {
          provider = new ethers.providers.Web3Provider(ethereum);
          signer = provider.getSigner();
        } else {
          console.error("Unsupported ethers version");
          return;
        }

        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        );

        // Call the addTask function from your smart contract
        const txn = await TaskContract.addTask(input, false);
        console.log('Adding task...', txn.hash);
        await txn.wait();
        console.log('Task added!', txn.hash);

        // Clear the input
        setInput('');

        // Refresh the task list
        getAllTasks();
      } else {
        console.log('Ethereum object not found');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsAddingTask(false);
    }
    setInput('');
  };


  // Remove tasks from front-end by filtering it out on our blockchain smart contract
  const deleteTask = (id) => async () => {
    setDeletingTaskId(id);
    
    try{
      const { ethereum } = window;
      if (ethereum) {
        // Check which version of ethers is being used
        let provider;
        let signer;

        // For ethers v6
        if (ethers.BrowserProvider) {
          provider = new ethers.BrowserProvider(ethereum);
          signer = await provider.getSigner();
        }
        // For ethers v5
        else if (ethers.providers && ethers.providers.Web3Provider) {
          provider = new ethers.providers.Web3Provider(ethereum);
          signer = provider.getSigner();
        } else {
          console.error("Unsupported ethers version");
          return;
        }

        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        );
        const txn = await TaskContract.deleteTask(id, true);

        console.log('Deleting task...', txn.hash);
        await txn.wait();
        console.log('Task deleted!', txn.hash);
        let allTasks = await TaskContract.getMyTasks();
        setTasks(allTasks);
      }else{
        console.log('Ethereum object not found');
      }
    }
    catch (error) {
      console.log(error);
    } finally {
      setDeletingTaskId(null);
    }
  };

  return (
    <div className='bg-[#97b5fe] h-screen w-screen flex justify-center py-6'>
      {!isLoggedIn ? (
        <ConnectWalletButton connectWallet={connectWallet} />
      ) : correctNetwork ? (
        <TodoList 
          setInput={setInput} 
          input={input} 
          addTask={addTask} 
          tasks={tasks} 
          deleteTask={deleteTask}
          isAddingTask={isAddingTask}
          deletingTaskId={deletingTaskId}
        />
      ) : (
        <WrongNetworkMessage />
      )}
    </div>
  );
}
