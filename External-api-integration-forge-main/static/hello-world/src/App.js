import React, { useEffect, useState } from 'react';
import { invoke } from '@forge/bridge';

function App() {
    const [data, setData] = useState(null);
    const [userid,setuserid] = useState('')
    const [password,setpassword] = useState('')
    const [content,setcontent] = useState('')
    const [status,setstatus] = useState(false)
    const [issue,setissue] = useState('')
    const [answer,setanswer] = useState(0)

    useEffect(() => {
        invoke('getText', { example: 'my-invoke-variable' }).then(setData);
    }, []);

    const newbuttonpressed = async (e) =>{
        e.preventDefault()
        console.log(issue)

        const response = await invoke('getissue',{issue,userid,password})
        setanswer(response)

    }

    const buttonpressed = async (e) =>{
        e.preventDefault()
        console.log(userid)
        console.log(password)
        const response = await invoke('authenticate',{userid,password})
        setcontent(response)

        if (response === 'Authentication Failed')
            setstatus(false)
        else
            setstatus(true)
    }

    return (
        <div>
            <h2>Enter User ID :</h2>
            <p></p>
            <input type='text' onChange={(event)=>{setuserid(event.target.value)}}/>
            <h2>Enter Password :</h2>
            <p></p>
            <input type='password' onChange={(event)=>{setpassword(event.target.value)}}/>
            <p></p>
            <button onClick={buttonpressed}>Submit</button>
            <p>{content}</p>
            {status && (
                <form>
                    <h3>Issue Key : </h3>
                    <label>
                        Enter Issue Key:
                        <input type="text" name="additionalInfo" onChange={(event) => { setissue(event.target.value) }} />
                    </label>
                    <p></p>
                    <button type="submit" onClick={newbuttonpressed}>Submit Form</button>
                </form>
            )}

            
            {answer && (
                <div>
                    <h3>Number of Comments : </h3>
                    <p>{answer}</p>
                    <p><b>If -1 then issue does not exist</b></p>
                </div>
            )}
        </div>
    );
}

export default App;
