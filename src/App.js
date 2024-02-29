import { Provider } from 'react-redux'
import { store } from './store/store'
import { GoodsList } from './pages/main.jsx'


function App() {
  return(
    <Provider store={store}>
      <GoodsList/>
  </Provider>
  )
}

export default App;
