
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './App'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { BrowserRouter } from 'react-router-dom'



createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename="/React-store">
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
