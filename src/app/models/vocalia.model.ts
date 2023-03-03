export class Vocalia {
    constructor(_id = "", card = "NINGUNO", team = "", nameOfPlayer = "", numberOfTShirt = 0, changes = "NO", goals = 0, numberOfChanges = "NINGUNO") {
        this._id = _id;
        this.card = card;
        this.team = team;
        this.nameOfPlayer = nameOfPlayer;
        this.numberOfTShirt = numberOfTShirt;
        this.changes = changes;
        this.goals = goals;
        this.numberOfChanges = numberOfChanges;
    }

    _id:string;
    card:string;
    team: string;
    nameOfPlayer:string;
    numberOfTShirt:number;
    changes:string;
    goals: number;
    numberOfChanges: string;
}