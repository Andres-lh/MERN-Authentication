import axios from 'axios';
import React, { useState } from 'react';

function ResetPassword({match}) {
    const [password, setPassword] = useState("");
    const [state, setState] = useState({
        success: undefined,
        message: "",
        error: ""
    });

    const handleSubmit = async (e) => {

        e.preventDefault();

        const config = {
            header: {
              "Content-Type": "application/json",
            },
          };

        try {
            const { data } = await axios.put(`/api/users/resetpassword/${match.params.resetToken}`, { password }, config)
            setState({
                success: true,
                message: data.data,
                error: ""
            });
        } catch (error) {
            console.log(error.response)
            setState({
                success: true,
                message: "",
                error: error.response.data.error
            });
        }
    }
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Insert your new password</label>
                <input type="password" name="password" id="password" required onChange={(e) => setPassword(e.target.value) }  />
                <button type="submit">Enter</button>
                {state.success ? <p>{state.message}</p> : <p>{state.error}</p>}
            </form>
        </div>
    )
}

export default ResetPassword
