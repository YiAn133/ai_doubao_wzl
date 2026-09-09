import{
  createContext,
  useContext,
  useState
}from 'react'
import Page from './components/Page'

import{ThemeContext} from './ThemeContext'


const App = () => {
  const [theme , setTheme] = useState('linght');
  return(
    // 覆盖了原来的light
    <ThemeContext.Provider value={theme}>
      <Page/>
      <br />
      <button onClick={() => setTheme('dark')}>切换主题</button>
    </ThemeContext.Provider>
  )
}

export default App;