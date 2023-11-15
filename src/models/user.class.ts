export class User {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: number;
    street: string;
    zipCode: number;
    city: string;
    summe: number;
    id: string;

    constructor(obj?:any) {

        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.email = obj ? obj.email : '';
        this.birthDate = obj ? Number(obj.birthDate) : 0;
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? Number(obj.zipCode) : 0;
        this.city = obj ? obj.city : '';
        this.summe = obj ? Number(obj.summe) : 0;
        this.id = obj ? obj.id : '';
    }

    public toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            birthDate: this.birthDate,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city,
            summe: this.summe,
        };
    }
}

