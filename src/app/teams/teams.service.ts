import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiUrlsService } from '../core/apiUrls.service';
import { AuthHttp } from '../auth/authHttp.service';
import { HandleHttpService } from '../core/handleHttp.service';
import { MeService } from '../core/me.service';

import { PublicTeam, PrivateTeam } from './teams.models';

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/mergeMap';


@Injectable()
export class TeamsService {
  constructor(private _http:Http,
              private _authHttp: AuthHttp,
              private _meService: MeService,
              private _handleHttp: HandleHttpService,
              private _apiUrlsService: ApiUrlsService) { }

  getPublicTeams():Observable<PublicTeam[]> {
    return this._http.get(this._apiUrlsService.teamsPublicListUrl)
                     .map(res => res.json())
                     .catch(err => this._handleHttp.handleError(err))
  }

  getPrivateTeams():Observable<PrivateTeam[]> {
    return this._authHttp.get(this._apiUrlsService.teamsUrl)
                         .map(res => res.json())
                         .catch(err => this._handleHttp.handleError(err))
  }

  getTeamDetails(teamId:number):Observable<PrivateTeam> {
    var teamDetailsUrl = this._apiUrlsService.teamsUrl + teamId + "/";

    return this._authHttp.get(teamDetailsUrl)
                         .map(res => res.json())
                         .catch(err => this._handleHttp.handleError(err))
  }

  createTeam(teamData:any): Observable<any> {
    return this._authHttp.post(this._apiUrlsService.teamsUrl, teamData)
                         .map(res => res.json());
  }

  leaveTeam(): Observable<any> {
    // TODO: Add validation if member is in team.
    return this._meService.getSeasonMeInfo().flatMap(
      meData => {
        console.log(meData)
        var teamLeaveUrl = this._apiUrlsService.teamMembershipUrl + meData['team_membership_id'] + "/";
        return this._authHttp.delete(teamLeaveUrl);
      });
  }
}
