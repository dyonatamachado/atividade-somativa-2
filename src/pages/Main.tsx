import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDTO } from "../core/dtos/UserDTO";
import { UserService } from "../infrastructure/UserService";
import { toast } from "react-toastify";
import { format } from 'date-fns';;

export default function Main() {
    const userService = new UserService();
    const navigate = useNavigate();
    const [user, setUser] = useState<UserDTO>();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        if(!token || !userId)
        {
            navigate('/login');
            return;
        }

        userService.getUser(userId)
            .then(user => setUser(user))
            .catch(() => errorNotification("Houve algum problema ao carregar seus dados. Tente novamente mais tarde."));
    });

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

    const getBirthDateText = () => {
        if(user && user.birthDate)
        {
            const date = format(user?.birthDate,'dd/MM/yyyy');
            return date;
        }

        return "";
    }
    
    const logout = () => {
        localStorage.clear();
        navigate('/login');
        return;
    }

    return (
        <>
            { 
                user && 
                <div className="flex p-4">
                    <div className="bg-slate-700 p-4 w-full rounded-md">
                        <div className="flex gap-2">
                            <span className="font-bold">Nome:</span>
                            <span>{user?.name}</span>
                        </div>

                        <div className="flex gap-2">
                            <span className="font-bold">Sobrenome:</span>
                            <span>{user?.lastName}</span>
                        </div>

                        <div className="flex gap-2">
                            <span className="font-bold">E-mail:</span>
                            <span>{user?.email}</span>
                        </div>

                        <div className="flex gap-2">
                            <span className="font-bold">Data de nascimento:</span>
                            <span>{ getBirthDateText() }</span>
                        </div>

                        <div className="flex cursor-pointer mt-2" onClick={() => logout()}>
                            <div className="flex justify-center rounded-lg bg-pink-500 hover:bg-pink-600 h-10 w-1/6 duration-500">
                                <button type="button" >Sair</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}