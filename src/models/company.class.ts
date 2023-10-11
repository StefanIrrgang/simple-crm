export class Company {
    name: string;
    email: string;
    zipcode: number;
    city: string;
    street: string;
    id: string;

    constructor(obj?:any) {

        this.name = obj ? obj.name : '';
        this.email = obj ? obj.email : '';
        this.zipcode = obj ? obj.zipcode : '';
        this.city = obj ? obj.city : '';
        this.street = obj ? obj.street : '';
        this.id = obj ? obj.id : '';
    }

    public toJSON() {
        return {
            name: this.name,
            email: this.email,
            zipcode: this.zipcode,
            city: this.city,
            street: this.street,
        };
    }
}
