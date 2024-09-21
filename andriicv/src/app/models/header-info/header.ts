import { Link } from "./link";

export class Header {
    public position: string="";
    public status: string="";
    public USstatus: string="";
    public name: string="";
    public lastName: string="";
    public phone: string="";
    public email: string="";
    public address: string="";
    public location: string="";
    public links: Array<Link>=[];
    public summaryText: string ="";
}

