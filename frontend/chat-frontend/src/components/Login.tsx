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
        if (!username.trim()) return;

        try {
            // Step 1: Check if user exists
            const res = await axios.get<User>(
                `http://localhost:8080/api/user`,
                { params: { name: username.trim() } }
            );
            onLogin(res.data);
        } catch (err: any) {
            if (err.response?.status === 404) {
                // Step 2: Create new user
                const createRes = await axios.post<User>(
                    `http://localhost:8080/api/user`,
                    { name: username.trim() }
                );
                onLogin(createRes.data);
            } else {
                console.error("Unexpected error:", err);
            }
        }
    }

    return(
        <>
            <div className={"flex min-h-screen items-center justify-center bg-gray-200"}>
                <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                    <h1 className={"text-3xl"}>Login</h1>
                <form onSubmit={handleSubmit} className={"space-y-5"}>
                    <input
                        placeholder="Enter you name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={"mt-2 me-2 p-1 border border-gray-300 rounded-lg"}
                    />
                    <button type="submit" className={"w-11 p-1 rounded-lg bg-black text-gray-200 font-semibold shadow-md hover:grayscale-75"}>Go!</button>
                </form>
                </div>
            </div>
        </>
    )
}

export default Login;