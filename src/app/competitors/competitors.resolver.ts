import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot} from '@angular/router';

import { CompetitorInfoForList } from '../core/core.models';
import { CompetitorsService } from './competitors.service';


/* TODO: Move this to the `core` module */
@Injectable()
export class CompetitorsResolver implements Resolve<any> {
    constructor(private _competitorsService:CompetitorsService) {}

    resolve(route: ActivatedRouteSnapshot) {
        return this._competitorsService.getAllCompetitorsInfo();
    }
}