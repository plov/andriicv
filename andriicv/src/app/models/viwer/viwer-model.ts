export class ViwerModel {
    public name: string;
    public email: string;
    public pincode: string;
    public expirationDate: string;
    public createdDate: string;
    public lastVisited: string;
    constructor(name: string, email: string, pincode: string, expirationDate: string, lastVisited: string) {
        this.name = name;
        this.email = email;
        this.pincode = pincode;
        this.expirationDate = expirationDate;
        this.createdDate = new Date().toISOString();
        this.lastVisited = lastVisited;
    }
}
