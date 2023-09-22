export class CreateUserDTO {
    constructor(name: string, lastName: string, email: string, password: string, birthDate: Date) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.birthDate = birthDate;
    }

    name: string;
    lastName: string;
    email: string;
    password: string;
    birthDate: Date;
}