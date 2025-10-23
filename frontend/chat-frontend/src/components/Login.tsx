import type {User} from "../types/User.ts";
import {type FormEvent, useState} from "react";
import axios from "axios";

function Login({onLogin}:{onLogin: (user: User) => void}){
    const [username, setUsername] = useState("");

    const handleSubmit = async (e: FormEvent) =>{
        e.preventDefault();
        await createUser();
    }

    const createUser = async () => {
        try{
            const response = await axios.post<User>(
                'http://localhost:8080/api/user', {name: username})
            onLogin(response.data);
            console.log(response.data);
        }catch (error){
            console.error(error);
        }
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <input
                    placeholder="Enter you name!"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit">Go!</button>
            </form>
        </>
    )
}

export default Login;