# 🚀 Diamond Niam Token Sale App

A modern dApp for managing and participating in token presales. This project combines a React-based frontend with smart contracts developed using Truffle. Integrated with WalletConnect, MetaMask and Wagmi for a seamless Web3 experience.

## 🛠️ Tech Stack

**Frontend:**

- React 19 + TypeScript + Vite + Router

- Material UI (MUI)

- Wagmi (ethers.js, viem)

- WalletConnect

- Motion, Zustand

**Smart Contracts:**

- Solidity via Truffle framework

**Development Tools:**

- Vite for fast bundling

- ESBuild Node polyfills

- Jest + Chai for contracts testing

---

## 📦 Installation

```bash
git clone https://github.com/diamondniam/token.git
cd token
npm install
cd frontend
npm install
```

## 🚧 Development

To start the development server:

```bash
npx truffle compile
npx truffle migrate --network <development | holesky | ...>
// update utils/helpers/contracts to your new deployed contract adresses
cd frontend
npm run dev
```

This runs the Vite dev server. Open your browser at http://localhost:5173.

## 🔗 Smart Contracts

All contracts live in the /contracts directory and are managed with Truffle:

### Compile Contracts

```bash
cd Truffle
npx truffle compile
```

### Test Contracts

```bash
npx truffle test
```

### Deploy to Local

```bash
npx truffle migrate --network development
```

### Deploy to Testnet

```bash
npx truffle migrate --network holesky
```

(Configure networks in Truffle/truffle-config.js)

## 📁 Root Directory Structure

├── contracts/ # Solidity smart contracts.

├── build/contracts # Your compiled Solidity ABIs.

├── .env.default # Example Truffle env file.

├── frontend/ # Frontend app source code.

├──├── assets # Static folder for styles, images, data.

├──├── components # Directory for reusable components.

├──├── features # Components directory for particular features which uses only for the features.

├──├── layouts # App layouts.

├──├── pages # App pages.

├──├── providers # App providers.

├──├── stores # App stores.

├──├── types # Global types and declarations to customizing MUI, wagmi.

├──├── types # Global types and declarations to customizing MUI, wagmi.

├──├── utils # Helpful utilities: helpers, hooks and styles (inline styles declarator).

├──├── .env.default # Example frontend env file.

## 🏰 Archetecture

- Modularity: Components are grouped by feature, improving scalability.

- Reusability: No dup- copy- code.

- Re-exporting: Most folders have index.ts to simplify imports.

- TypeScript: .tsx and .ts extensions for strict typing and component clarity.

- Domain-first: e.g. if inside dialogs group component name should start with Dialog.

## 🔐 Features

- Security and strictness due to TypeScript.

- WalletConnect & Injected Wallets (MetaMask).

- Token purchase with countdown.

- Styled with MUI and Motion animations.

- FSD cleanly archetectured.
