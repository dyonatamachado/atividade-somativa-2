export class UserDTO {

    constructor(name: string, lastName: string, email: string, birthDate: Date) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.birthDate = birthDate;
    }

    name: string;
    lastName: string;
    email: string;
    birthDate: Date;
}