import { Authorities } from "./authorities";

export class HostAccount {

    constructor (networkstatus: number) {
        this.networkstatus = networkstatus;
    } 

    id: string = "";
    firstname: string = "";
    lastname: string = "";
    gender: string = "";
    email: string = "";
    phone: string = "";
    emergencycontact1: string = "";
    emergencycontact2: string = "";
    username: string = "";
    avatar: string = "";
    
    meansofidname: string = "";
    meansofid: string = "";
    meansofidnumber: string = "";
    meansofidverified: boolean = true;
    meansofiddate: string = "";
    refid: string = "";
    occupation: string = "";
    about: string = "";
    permanentaddress: string = "";
    enabled: boolean = true;
    authorities: Authorities[] = []; 
    networkstatus: number = -1;
    
}
