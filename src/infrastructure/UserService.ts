import firebase from './FirebaseConfig';
import 'firebase/firestore';
import 'firebase/auth';

import { CreateUserDTO } from '../core/dtos/CreateUserDTO';
import { LoginDTO } from '../core/dtos/LoginDTO';
import { UserDTO } from '../core/dtos/UserDTO';

export class UserService {

    login(dto: LoginDTO) : Promise<any> {
        return firebase.auth().signInWithEmailAndPassword(dto.email, dto.password)
            .then((userCredential) => {
                return {
                    userId: userCredential.user?.uid,
                    token: userCredential.user?.getIdToken()
                }
            });
    }

    createUser(dto: CreateUserDTO) : Promise<any> {
        return firebase.auth().createUserWithEmailAndPassword(dto.email, dto.password)
            .then((userCredential) => {
                const uid = userCredential.user?.uid;
                firebase.firestore().collection("users").doc(uid).set({
                    name: dto.name,
                    lastName: dto.lastName,
                    email: dto.email,
                    birthDate: dto.birthDate
                })
                .then(() => { return { id: uid, name: dto.name, lastName: dto.lastName, email: dto.email } })
            });
    }

    getUser(id: string) : Promise<any> {
        return firebase.firestore()
            .collection('users')
            .doc(id)
            .get()
            .then((doc) => {
                if(doc.exists) {
                    const data = doc.data();
                    const user = new UserDTO(data?.name, data?.lastName, data?.email, data?.birthDate.toDate());
                    return user;
                }
            });
    }
}