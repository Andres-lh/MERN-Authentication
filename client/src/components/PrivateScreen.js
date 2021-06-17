import React from 'react'

function PrivateScreen() {
    return (
        <div>
            <p>This is a private route</p>
            <button onClick={() => {
                localStorage.clear();
                window.location.reload();
                } 
                }>Log out</button>    
        </div>
    )
}

export default PrivateScreen
