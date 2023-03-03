export class Team{
    constructor(_id = "", nameOfTeam = "", phone = "", representativeName = "", identificationCard = ""){
        this._id = _id;
        this.nameOfTeam = nameOfTeam;
        this.phone = phone;
        this.representativeName = representativeName;
        this.identificationCard = identificationCard; 
    }

    _id: string;
    nameOfTeam: string;
    phone: string;
    representativeName: string;
    identificationCard: string;
}