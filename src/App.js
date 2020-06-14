import React, { useEffect, useReducer, useState } from 'react'
import appReducer from './reducers'
import HeaderBar from './pages/HeaderBar'
import HomePage from './pages/HomePage'
import { ThemeContext, StateContext } from './contexts'



export default function App () {
  const [ theme, setTheme ] = useState({
    primaryColor: 'deepskyblue',
    secondaryColor: 'coral'
  })
  const [ state, dispatch ] = useReducer(appReducer, { user: '', posts: [], error: '' })
  const { user, error } = state;

 

  useEffect(() => {
    if(user) {
      document.title = `${user} = React Hooks Blog`
    } else {
      document.title = 'React Hooks Blog'
    }
  }, [user])

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <ThemeContext.Provider value={theme}>
        <div style={{ padding: 8 }}>
         <HeaderBar setTheme={ setTheme } />
          <hr />
          <HomePage />
        </div>
      </ThemeContext.Provider>
    </StateContext.Provider>
    
    
  ) 
}
