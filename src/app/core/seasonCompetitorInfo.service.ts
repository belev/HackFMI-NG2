import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthHttp } from '../auth/authHttp.service';
import { ApiUrlsService } from '../core/apiUrls.service';
import { HandleHttpService } from '../core/handleHttp.service';

import { SeasonService } from './season.service';
import { MeService } from './me.service';
import { SeasonCompetitorInfo } from './core.models';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';


@Injectable()
export class SeasonCompetitorInfoService {
  constructor(private _authHttp: AuthHttp,
              private _meService: MeService,
              private _seasonService: SeasonService,
              private _handleHttp: HandleHttpService,
              private _apiUrlsService: ApiUrlsService) { }

  postSeasonCompetitorInfo(seasonInfoData):Observable<SeasonCompetitorInfo> {
    return this._seasonService.getSeasonInfo().flatMap( 
      seasonInfo => {
        seasonInfoData['season'] = seasonInfo.id;
        return this._meService.getSeasonMeInfo()
    }).flatMap(
      meInfo => {
        seasonInfoData['competitor'] = meInfo.competitor_info.id;
        return this._authHttp.post(this._apiUrlsService.seasonCompetitorInfoUrl, seasonInfoData)
                             .catch(err => this._handleHttp.handleError(err));
      })
   }
 }