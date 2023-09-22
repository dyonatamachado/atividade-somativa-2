import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserService } from "../infrastructure/UserService";
import { isExists } from "date-fns";
import { CreateUserDTO } from "../core/dtos/CreateUserDTO";
import { toast } from "react-toastify";

export default function Register() {
    const userService = new UserService();
    const navigate = useNavigate();

    const [name, setName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [birthDate, setBirthDate] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [error, setError] = useState<string>();

    const createUser = () => {
        if(!name || !lastName || !birthDate || !email || !password || !birthDate)
        {
            setError("Todos os campos são obrigatórios.");
            return;
        }

        const birthRegex = /\d{2}\/\d{2}\/\d{4}/;
        if(!birthDate.match(birthRegex))
        {
            setError("A data de nascimento deve estar no formato DD/MM/AAAA.");
            return;
        }

        const birthDateArray = birthDate.split("/").map(value => parseInt(value));
        const isValidDate = isExists(birthDateArray[2], birthDateArray[1] - 1, birthDateArray[0]);
        if(!isValidDate)
        {
            setError("A data de nascimento informada não existe.");
            return;
        }

        const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        if(!email.match(emailRegex))
        {
            setError("E-mail com formato inválido");
            return;
        }

        if(password.length < 8)
        {
            setError("Senha deve ter ao menos 8 caracteres");
            return;
        }

        setError(undefined);
        const birth = new Date(birthDateArray[2], birthDateArray[1] - 1, birthDateArray[0]);
        const dto = new CreateUserDTO(name, lastName, email, password, birth);
        userService.createUser(dto)
            .then(() => {
                localStorage.clear();
                successNotification();
                navigate('/login');
            })
            .catch(() => errorNotification());
    }

    const successNotification = () => {
        toast.success('Cadastrado com sucesso', {
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

    const errorNotification = () => {
        toast.error('Houve algum problema ao cadastrar. Tente novamente mais tarde.', {
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
                    <span className="bg-inherit font-black mb-2 text-lg">Faça seu cadastro</span>

                    <div className="my-4 py-2 flex flex-col gap-2">
                        {
                            !!error && (
                                <span className="bg-inherit mb-2 text-sm text-pink-500">
                                    {error}
                                </span>
                            )
                        }

                        <div className="flex flex-col">
                            <label htmlFor="name">Nome*</label>
                            <input 
                                className="bg-white rounded h-8 text-gray-800 ps-2" 
                                id="name" 
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="lastname">Sobrenome*</label>
                            <input 
                                className="bg-white rounded h-8 text-gray-800 ps-2" 
                                id="lastname" 
                                type="text" 
                                value={lastName}
                                onChange={(event) => setLastName(event.target.value)}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="birthdate">Data de nascimento*</label>
                            <input 
                                className="bg-white rounded h-8 text-gray-800 ps-2" 
                                id="birthdate" 
                                type="text" 
                                value={birthDate}
                                onChange={(event) => setBirthDate(event.target.value)}
                            />
                        </div>

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

                    <div className="flex justify-center cursor-pointer" onClick={() => createUser()}>
                        <div className="flex justify-center rounded-lg bg-emerald-500 hover:bg-emerald-600 h-10 w-1/5 duration-500">
                            <button type="button">Cadastrar</button>
                        </div>
                    </div>

                    <div className="flex justify-center cursor-pointer mt-4 text-sm text-sky-200 hover:text-sky-500">
                        <Link to="/login" className="uppercase">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}