import React,  { useState } from 'react'
import '../stylesheets/Login.scss'

export default ({ loginPageChange }) => {

    const [hasAccount, setHasAccount] = useState(true)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    


    const handleSubmit = (event) => {
        event.preventDefault()

        const AUTH_URL = hasAccount ? 'http://localhost:5000/login' : 'http://localhost:5000/users'

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
        .then(res => res.json())
        .then(loginData => {
            localStorage.setItem('token', loginData.token);
        })
        .then(() => {
            setUsername('')
            setPassword('')
        })
        .then(loginPageChange())
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
        </div>
    )

}