import { useState } from "react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../api/auth";
import Loading from "../../components/ui/Loading";
import Info from "../../components/ui/Info";
import Error from "../../components/ui/Error";
import { useNavigate } from "react-router";
import { InputPassword } from "../../components/ui/InputPassword";

export function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (data: { username: string, password: string }) => login(data.username, data.password),
        onSuccess: () => navigate("/"),
    });

    // Login
    const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        mutation.mutate({ username, password });
    }

    return (
        <>
            {mutation.isPending && <Loading />}
            {mutation.isSuccess && <Info message="Logged in successfully" />}
            {mutation.isError && <Error message={mutation.error.message} />}

            <form onSubmit={onSubmit} className="flex justify-center m-10">
                <div className="w-120 p-7 bg-background-primary shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)]">
                    <div className="mb-5">
                        <p className="text-lg">Username</p>
                        <Input value={username} onChange={e => setUsername(e.target.value)} type="text" placeholder="Username" autoFocus />
                    </div>
                    <div className="mb-5">
                        <p className="text-lg">Password</p>
                        <InputPassword value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                    </div>
                    <div>
                        <Button value="Login" type="submit" />
                    </div>
                </div>
            </form>
        </>
    )
}
