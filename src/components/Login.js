import React,  { useState } from 'react'
import '../stylesheets/Login.scss'

export default ({ changePage, loginUsername, changeToken }) => {

    const [hasAccount, setHasAccount] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    
    const signInSuccess = async (response) => {
        const loginData = await response.json()

        localStorage.setItem('token', loginData.token);
        loginUsername(loginData.username)
        setUsername('')
        setPassword('')
        changePage('main')
        changeToken()
    }

    const signInFailure = async (response) => {
        const { message } = await response.json()

        setErrorMessage(message)
    } 


    const handleSubmit = (event) => {
        event.preventDefault()

        const AUTH_URL = hasAccount ? 'https://mathmaker.herokuapp.com/login' : 'https://mathmaker.herokuapp.com/users'

        fetch( AUTH_URL , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password
          }),
        })
        .then(res => {
            res.status === 200 || res.status === 201 ? signInSuccess(res) : signInFailure(res)
        })
    }

    return (
        <div className="login-card">
            <h1>{ hasAccount ? 'Log-in' : 'Sign-up' }</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="user" placeholder="Username" value={username} onChange={event => setUsername(event.target.value)}/>
                <input type="password" name="pass" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)}/>
                <input type="submit" name="login" className="login login-submit" value={ hasAccount ? 'Log-in' : 'Sign-up'} />
            </form>
            <h3>
                { hasAccount ? 'Dont have an acount?' : 'Have an Account?'} 
                <button onClick={() => setHasAccount(!hasAccount)}>
                { hasAccount ? 'Sign-up' : 'Log-in'}
                </button>
            </h3>
            {errorMessage ? <h2 className='error'>{errorMessage}</h2> : null}
        </div>
    )

}