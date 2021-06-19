import React, {useState} from 'react'
import axios from 'axios';

function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [state, setState] = useState({
        success: undefined,
        message: "",
        error: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const header = {
            header: {
                "Content-Type": "application/json",
            }
        }

        try {
            const { data } = await axios.post('/api/users/forgotPassword', {email}, header);

            setState({
                success: true,
                message: data.data,
                error: ""
            });

        } catch (error) {
            console.log(error.response)
            setState({
                success: false,
                message: "",
                error: error.response.data.error
            })
        }
        
    }

    

    return (
        <div>
            <h1>Forgot password</h1>
            <form onSubmit={handleSubmit} >
                <div>
                    <label>Enter email</label>
                    <input type="email" name="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <button type="submit">Send</button>
                { state.success ? <p>{state.message}</p> : <p>{state.error}</p>}
            </form>
            
        </div>
    )
}

export default ForgotPassword
