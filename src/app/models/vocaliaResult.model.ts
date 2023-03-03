export class VocalResult {
  constructor(_id = "", team1 = "", team2 = "", CardsRed1 = 0, CardsRed2 = 0, CardsYellow1 = 0, CardsYellow2 = 0, goals1 = 0,  goals2 = 0, changes1 = 0, changes2 = 0, observation1='', observation2='' ) {
      this._id = _id;
      this.team1 = team1;
      this.team2 = team2;
      this.CardsRed1 = CardsRed1;
      this.CardsRed2 = CardsRed2;
      this.CardsYellow1 = CardsYellow1;
      this.CardsYellow2 = CardsYellow2;
      this.goals1 = goals1;
      this.goals2 = goals2;
      this.changes1 = changes1;
      this.changes2 = changes2;
      this.observation1 = observation1;
      this.observation2 = observation2;

  }

  _id:string;
  team1:string;
  team2:string;
  CardsRed1:number;
  CardsRed2:number;
  CardsYellow1:number;
  CardsYellow2:number;
  goals1:number;
  goals2: number;
  changes1: number;
  changes2: number;
  observation1: string;
  observation2: string;

}
