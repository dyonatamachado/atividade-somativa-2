import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserService } from "../infrastructure/UserService";
import { toast } from "react-toastify";

export default function Login() {
    const userService = new UserService();
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [error, setError] = useState<string>();

    const login = () => {
        if(!email || !password)
        {
            setError("Os campos são obrigatórios.");
            return;
        }

        const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        if(!email.match(emailRegex))
        {
            setError("E-mail com formato inválido");
            return;
        }

        setError(undefined);
        localStorage.clear();

        userService.login({email, password}).then((user) => {
            localStorage.setItem('token', user.token);
            localStorage.setItem('userId', user.userId);
            navigate('/');
        })
        .catch((error) => {
            if(error.message?.includes("INVALID_LOGIN_CREDENTIALS"))
            {
                errorNotification("Os dados informados não conferem. Verifique e tente novamente.");
                return;
            }

            errorNotification("Houve algum problema ao efetuar login. Tente novamente mais tarde.")
        });
    }

    const errorNotification = (message: string) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-slate-700 w-1/3 p-4 rounded-md">
                <form>
                    <span className="bg-inherit font-black mb-2 text-lg">Faça seu login</span>

                    <div className="my-4 py-2 flex flex-col gap-2">
                        {
                            !!error && (
                                <span className="bg-inherit mb-2 text-sm text-pink-500">
                                    {error}
                                </span>
                            )
                        }

                        <div className="flex flex-col">
                            <label htmlFor="email">E-mail*</label>
                            <input 
                                className="bg-white rounded h-8 text-gray-800 ps-2" 
                                id="email" 
                                type="email" 
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="password">Senha*</label>
                            <input 
                                className="bg-white rounded h-8 text-gray-800 ps-2" 
                                id="password" 
                                type="password" 
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex justify-center cursor-pointer" onClick={() => login()}>
                        <div className="flex justify-center rounded-lg bg-emerald-500 hover:bg-emerald-600 h-10 w-1/5 duration-500">
                            <button type="button">Acessar</button>
                        </div>
                    </div>

                    <div className="flex justify-center cursor-pointer mt-4 text-sm text-sky-200 hover:text-sky-500">
                        <Link to="/register" className="uppercase">Cadastrar</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}