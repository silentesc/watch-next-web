import { useState } from "react";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import { register } from "../../api/auth";
import { useMutation } from "@tanstack/react-query";
import Error from "../../components/ui/Error";
import Loading from "../../components/ui/Loading";
import Info from "../../components/ui/Info";
import InputPassword from "../../components/ui/InputPassword";

function RegisterPage() {
    const [username, setUsername] = useState("");
    const [usernameError, setUsernameError] = useState("");

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const mutation = useMutation({
        mutationFn: (data: { username: string, password: string }) => register(data.username, data.password),
    });

    // Register
    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Reset error messages
        setUsernameError("");
        setPasswordError("");
        setConfirmPasswordError("");

        // Check for username
        if (username.length < 4 || username.length > 30) {
            setUsernameError("Username length must be between 4 and 30");
            return;
        }
        const usernameRegex: RegExp = /^\w+$/;
        if (!usernameRegex.test(username)) {
            setUsernameError("Username must only contain alphanumeric characters");
            return;
        }

        // Check for password
        if (password.length < 8 || password.length > 80) {
            setPasswordError("Password length must be between 8 and 80");
            return;
        }
        if (password != confirmPassword) {
            setConfirmPasswordError("Passwords don't match");
            return;
        }

        mutation.mutate({ username, password });
    }

    return (
        <>
            {mutation.isPending && <Loading />}
            {mutation.isSuccess && <Info message="Registered successfully. You can log in now." />}
            {mutation.isError && <Error message={mutation.error.message} />}

            <form onSubmit={onSubmit} className="flex justify-center m-10">
                <div className="w-120 p-7 bg-background-primary shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)]">
                    <div className="mb-5">
                        <p className="text-lg">Username</p>
                        <Input onChange={e => setUsername(e.target.value)} type="text" placeholder="Username" autoFocus />
                        <p className="text-error">{usernameError}</p>
                    </div>
                    <div className="mb-5">
                        <p className="text-lg">Password</p>
                        <InputPassword onChange={e => setPassword(e.target.value)} placeholder="Password" />
                        <p className="text-error">{passwordError}</p>
                    </div>
                    <div className="mb-5">
                        <p className="text-lg">Confirm Password</p>
                        <Input onChange={e => setConfirmPassword(e.target.value)} type="password" placeholder="Password" />
                        <p className="text-error">{confirmPasswordError}</p>
                    </div>
                    <div>
                        <Button value="Register" type="submit" />
                    </div>
                </div>
            </form>
        </>
    )
}

export default RegisterPage;
