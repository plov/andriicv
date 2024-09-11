export class ViewerModel {
    public id: number;
    public name: string;
    public email: string;
    public pincode: string;
    public hash: string;
    public expirationDays: number;
    public createdDate: string;
    public lastVisited: string;
    public type: string;
    constructor(id: number, name: string, email: string, pincode: string, hash: string, created: string, expirationDays: number = 20, lastVisited: string = "") {
        this.id = id;
        this.name = name;
        this.email = email;
        this.pincode = pincode;
        this.hash = hash;
        this.expirationDays = expirationDays;
        if (created == "") {
            this.createdDate = new Date().toISOString();
        }
        else { 
            this.createdDate = created 
        }
        this.lastVisited = lastVisited;
        this.type = "viewer";
    }
}
