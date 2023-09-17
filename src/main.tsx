import React from 'react'
import ReactDOM from 'react-dom/client'
import { Theme } from '@radix-ui/themes'
import { TodosProvider } from './providers/TodosProvider/TodosProvider.tsx'
import { App } from './App.tsx'
import '@radix-ui/themes/styles.css'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme>
      <TodosProvider>
        <App />
      </TodosProvider>
    </Theme>
  </React.StrictMode>
)
