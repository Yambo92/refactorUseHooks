import React, {useState, useContext, useEffect} from 'react'
import { StateContext } from '../contexts'
import { useResource } from 'react-request-hook'

export default function Login () {
    const { dispatch } = useContext(StateContext)
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ loginFailed, setLoginFailed ] = useState(false)

    const [ user, login ] = useResource((username, password) => ({
        url: `/login/${encodeURI(username)}/${encodeURI(password)}`,
        method: 'get'
    }))

    useEffect(() => {
        if(user && user.data) {
            if (user.data.length > 0) {
                setLoginFailed(false)
                dispatch({ type: 'LOGIN', username: user.data[0].username})
            } else {
                setLoginFailed(true)
            }
        }
        if(user && user.error) {
            setLoginFailed(true)
        }
    }, [user])

    function handleUsername (evt) {
        setUsername(evt.target.value)
    }
    function handlePassword (evt) {
        setPassword(evt.target.value)
    }
    return (
        <form
            onSubmit={e => { e.preventDefault(); 
                login(username, password)
            }}
        >
            <label htmlFor="login-username">UserName:</label>
            <input  type="text" name="login-username" 
                id="login-username" 
                value={username} onChange={handleUsername}    
            />
            <label htmlFor="login-password">Password:</label>
            <input type="password" 
                value={password}
                onChange={handlePassword}
                name="login-password" id="login-password" />
            <input  type="submit" value="Login" disabled={username.length === 0} />
            {loginFailed && <span style={{ color: 'red' }}>Invalid username or password</span>}
        </form>
    )
}