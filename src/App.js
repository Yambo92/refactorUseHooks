import React, { useEffect, useReducer, useState } from 'react'
import appReducer from './reducers'
import UserBar from './user/UserBar'
import CreatePost from './post/CreatePost'
import PostList from './post/PostList'
import Header from './Header'
import ChangeTheme from './ChangeTheme'
import { ThemeContext, StateContext } from './contexts'

const defaultPosts = [
  { title: 'React Hooks', content: 'The greatest thing since sliced bread!', author: 'Daniel Bugl' },
  { title: 'Using React Fragments', content: 'Keeping the DOM tree clean!', author: 'Daniel Bugl' }
 ]

export default function App () {
  const [ theme, setTheme ] = useState({
    primaryColor: 'deepskyblue',
    secondaryColor: 'coral'
  })
  const [ state, dispatch ] = useReducer(appReducer, { user: '', posts: defaultPosts })
  const { user, posts } = state;

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
          <Header text="React Hooks Blog" />
          <ChangeTheme theme={theme} setTheme={setTheme} />
          <br/>
          <UserBar />
          <br />
          { user && <CreatePost />}
          <br />
          <hr />
          <PostList/>
        </div>
      </ThemeContext.Provider>
    </StateContext.Provider>
    
    
  ) 
}
