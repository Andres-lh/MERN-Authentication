import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';

function Auth() {

    const [isSignUp, setIsSignUp] = useState(true);
    const history = useHistory();
    const [error, setError] = useState('');
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    useEffect(() => {
        if(localStorage.getItem("authToken")){
            history.push("/");
        }
    },[history])


    const switchAuth = () =>{
        setIsSignUp(prevIsSignUp => !prevIsSignUp)
        setUser({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
        setError('');
    }

    const onChangeInput = (e) => {
        const {name, value} = e.target;
        setUser({...user, [name] : value});
    }

    

    const handleSubmit = async(e) => {
        e.preventDefault();

        const header = {
            header: {
                "Content-Type": "application/json",
            }
        }

        try {
            if(isSignUp){
                const { data } = await axios.post(
                    "/api/users/login", 
                    user,
                    header
                );
                localStorage.setItem("authToken", data.token);
                history.push("/")
            } else {
                const { data } = await axios.post(
                    "/api/users/register", 
                    user,
                    header
                );

                localStorage.setItem("authToken", data.token);
    
                history.push("/")
            }
            
        } catch (error) {
            setError(error.response.data.error);
        }
    }

    return (
        <div className = "Auth-container">
            <div className = "Auth">
                <h2>{isSignUp ?  "Login" : "Register" }</h2>
                <form onSubmit={handleSubmit} >
                    { isSignUp ? (
                        <>
                            <div>
                                <label>Email</label>
                                <input type="text" name="email" id="email" value={user.email} required onChange={onChangeInput}/>
                            </div>
                            <div>
                                <label>Password</label>
                                <input type="password" name="password" id="password" value={user.password} required onChange={onChangeInput}/>
                            </div>
                        </>

                    ) : (
                        <>
                            <div>
                                <label>Username</label>
                                <input type="text" name="username" id="username" value={user.username} required onChange={onChangeInput}/>
                            </div>
                            <div>
                                <label>Email</label>
                                <input type="text" name="email" id="email" value={user.email} required onChange={onChangeInput}/>
                            </div>
                            <div>
                                <label>Password</label>
                                <input type="password" name="password" id="password" value={user.password} required onChange={onChangeInput}/>
                            </div>
                            <div>
                                <label>Confirm Password</label>
                                <input type="password" name="confirmPassword" id="confirmPassword" value={user.confirmPassword} required onChange={onChangeInput}/>
                            </div>
                        </>
                    )}
                    { isSignUp ? (
                        <>
                            <p>No account yet? <span onClick={switchAuth}>create one!</span></p>
                            <Link to="/forgotPassword">Forgot Password?</Link>
                        </>
                        
                    ) : (
                        <>
                            <p>Already have an account? <span onClick={switchAuth}>Log in</span></p>
                        </>
                    )
                    }
                    <span>{error}</span>
                    <div>
                        <button>{isSignUp ? "Login" : "Register"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Auth
