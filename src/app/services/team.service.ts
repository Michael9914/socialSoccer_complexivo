import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Team } from '../models/team.models';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  selectedTeam: Team;
  teams: Team[];
  team: Team;
  readonly URL_API = "http://localhost:3500/api/teams";

  constructor(private http: HttpClient) {
    this.selectedTeam = new Team();
  }

  getTeams(){
    return this.http.get<Team[]>(this.URL_API);
  }

  postTeam(team: Team){
    return this.http.post(this.URL_API, team);
  }

  putTeam(team: Team){
    return this.http.put(this.URL_API + `/${team._id}`, this.team);
  }

  deleteTeam(_id: string){
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}
