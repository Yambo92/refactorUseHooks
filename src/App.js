import React, { useEffect, useReducer, useState } from 'react'
import appReducer from './reducers'
import UserBar from './user/UserBar'
import CreatePost from './post/CreatePost'
import PostList from './post/PostList'
import Header from './Header'
import ChangeTheme from './ChangeTheme'
import { ThemeContext, StateContext } from './contexts'
import { useResource } from 'react-request-hook'


export default function App () {
  const [ theme, setTheme ] = useState({
    primaryColor: 'deepskyblue',
    secondaryColor: 'coral'
  })
  const [ state, dispatch ] = useReducer(appReducer, { user: '', posts: [], error: '' })
  const { user, error } = state;

  const [ posts, getPosts ] = useResource(() => ({
    url: '/posts',
    method: 'get'
  }))

  useEffect(getPosts, [])

  useEffect(() => {
    if(posts && posts.error) {
      dispatch({ type: 'POSTS_ERROR' })
    }
    if(posts && posts.data) {
      dispatch({ type: 'FETCH_POSTS', posts: posts.data.reverse() })
    }
  }, [posts])

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
          {error && <b>{error}</b>}
          <PostList/>
        </div>
      </ThemeContext.Provider>
    </StateContext.Provider>
    
    
  ) 
}
