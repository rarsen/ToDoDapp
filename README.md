# 🚀 Decentralized Todo List

A full-stack decentralized application (DApp) built with **Solidity**, **Next.js**, and **Tailwind CSS**. This project demonstrates blockchain integration with a modern web interface, allowing users to manage their todo tasks on the Ethereum blockchain.

![Todo List Demo](https://img.shields.io/badge/Status-Live-brightgreen) ![License](https://img.shields.io/badge/License-MIT-blue) ![Solidity](https://img.shields.io/badge/Solidity-0.8.13-purple) ![Next.js](https://img.shields.io/badge/Next.js-12.2.2-black)

## ✨ Features

- 🔐 **MetaMask Integration** - Connect your wallet seamlessly
- ⛓️ **Blockchain Storage** - Tasks stored permanently on Ethereum
- 🌐 **Sepolia Testnet** - Safe testing environment
- 💅 **Modern UI** - Beautiful design with Tailwind CSS
- ⚡ **Real-time Feedback** - Loading states for blockchain operations
- 🎯 **User-Owned Data** - Only you can manage your tasks
- 📱 **Responsive Design** - Works on all devices

## 🛠️ Technology Stack

### Frontend
- **Next.js** - React framework for production
- **Tailwind CSS** - Utility-first CSS framework
- **Ethers.js v6** - Ethereum library for blockchain interaction

### Backend
- **Solidity** - Smart contract programming language
- **Truffle** - Development framework for Ethereum
- **HDWallet Provider** - Wallet provider for deployment

### Blockchain
- **Ethereum** - Decentralized platform
- **Sepolia Testnet** - Test network for development
- **MetaMask** - Web3 wallet integration

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MetaMask** browser extension
- **Sepolia ETH** (get from [Sepolia Faucet](https://sepoliafaucet.com/))

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/solidity-todo-list.git
cd solidity-todo-list
```

### 2. Install Backend Dependencies
```bash
npm install
# or
yarn install
```

### 3. Install Frontend Dependencies
```bash
cd client
npm install
# or
yarn install
```

### 4. Set Up Environment Variables
Create a `.env` file in the backend directory:
```env
MNEMONIC=your_wallet_mnemonic_phrase_here
ALCHEMY_URL=your_alchemy_sepolia_url_here
```

### 5. Deploy Smart Contract (Optional)
If you want to deploy your own contract:
```bash
# In the backend directory
npx truffle migrate --network sepolia
```

### 6. Start the Application
```bash
# In the client directory
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` to see your app! 🎉

## 🎮 How to Use

1. **Connect Wallet**: Click "Connect Wallet" and approve MetaMask connection
2. **Switch Network**: Ensure you're connected to Sepolia Testnet
3. **Add Tasks**: Type your task and click the add button
4. **Delete Tasks**: Click the trash icon to remove tasks
5. **Watch Magic**: See real-time loading states during blockchain operations!

## 📁 Project Structure

```
solidity-todo-list/
├── backend/                 # Smart contract backend
│   ├── contracts/          # Solidity contracts
│   │   └── taskContract.sol
│   ├── migrations/         # Deployment scripts
│   ├── test/              # Contract tests
│   └── truffle-config.js  # Truffle configuration
├── client/                 # Next.js frontend
│   ├── components/        # React components
│   │   ├── ConnectWalletButton.js
│   │   ├── TodoList.js
│   │   ├── Task.js
│   │   ├── Navbar.js
│   │   └── WrongNetworkMessage.js
│   ├── pages/            # Next.js pages
│   │   └── index.js      # Main application
│   ├── styles/           # CSS styles
│   └── config.js         # Contract configuration
└── README.md
```

## 🔧 Smart Contract Details

### TaskContract Functions

| Function | Description | Parameters |
|----------|-------------|------------|
| `addTask` | Creates a new task | `taskText` (string), `isDeleted` (bool) |
| `getMyTasks` | Retrieves user's active tasks | None |
| `deleteTask` | Marks a task as deleted | `taskId` (uint), `isDeleted` (bool) |

### Contract Address
- **Sepolia Testnet**: `0x3A65a4D54ca944c07CFD2A5329c3711319736Ee4`

## 🚀 Deployment

### Deploy Smart Contract
```bash
cd backend
npx truffle migrate --network sepolia
```

### Deploy Frontend
```bash
cd client
npm run build
npm start
```

### Example of the usage
https://github.com/user-attachments/assets/6082f7ee-4548-415c-b49e-a7de57f32754

