import { useState } from "react";
import InputText from "../../components/ui/InputText";
import Button from "../../components/ui/Button";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log(`Login: Username ${username} | Password ${password}`);
    }

    return (
        <>
            <form onSubmit={onSubmit} className="flex justify-center m-10">
                <div className="w-120 p-7 bg-background-primary shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)]">
                    <div className="mb-5">
                        <p className="text-lg">Username</p>
                        <InputText onChange={e => setUsername(e.target.value)} type="text" placeholder="Username" />
                    </div>
                    <div className="mb-5">
                        <p className="text-lg">Password</p>
                        <InputText onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                    </div>
                    <div>
                        <Button value="Login" type="submit" />
                    </div>
                </div>
            </form>
        </>
    )
}

export default LoginPage;
