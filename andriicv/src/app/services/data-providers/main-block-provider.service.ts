
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, from } from 'rxjs';
import { SkillModel } from '../../models/skills/skill-model';
import { environment } from '../../../environments/environment';
import { StaticConf } from '../../staticconf';
import { MainBlockModel } from '../../models/main-block/main-block-model';
import { S3Service } from '../s3/s3-service.service';
import { AppStateService } from '../state-servises/app-state-service.service';

@Injectable({
  providedIn: 'root'
})
export class MainBlockProviderService {

  private dataPath: string = StaticConf.localPath + StaticConf.dataPath;
  
  constructor(private s3Service: S3Service, private appStateService: AppStateService) { 
    this.config()
  }

  private config(): void {
    if (environment.production) {
      this.dataPath = StaticConf.s3backetPath + StaticConf.dataPath;
    }
  }
  

  getMainBlocksInfo(): Observable<Array<MainBlockModel>> {
    return this.getMainBlockJsonFromS3().pipe(
      map(data => this.mapMainBlock(data.MainBlocs))
    );
  }

  getMainBlockById(id: number): Observable<MainBlockModel> {
    return this.getMainBlockJsonFromS3().pipe(
      map((data: any) => data.MainBlocs.find((block: any) => block.id === id)),
      map((block: any) => this.convertToMainBlockModel(block))
    );
  }

  private getMainBlockJsonFromS3(): Observable<any> {
    return this.s3Service.readJsonFile(StaticConf.dataPath, this.appStateService.fileName);
  }

  private mapMainBlock(mainBlockObjects: any[]): MainBlockModel[] {
    return this.sortBlocksByViewOrder(mainBlockObjects.map(this.convertToMainBlockModel.bind(this)));
  }

  private convertToMainBlockModel(mainBlockObj:any): MainBlockModel {
    const mainBlockModel = new MainBlockModel();
    mainBlockModel.id = mainBlockObj.id;
    mainBlockModel.blockViewOrder = mainBlockObj.blockViewOrder;
    mainBlockModel.blockName = mainBlockObj.blockName;
    mainBlockModel.years = mainBlockObj.years;
    mainBlockModel.position = mainBlockObj.position;
    mainBlockModel.responsobility = Array.isArray(mainBlockObj.responsobility ) ? mainBlockObj.responsobility.join('') : mainBlockObj.responsobility;
    mainBlockModel.achievements = Array.isArray(mainBlockObj.achievements) ? mainBlockObj.achievements.join('') : mainBlockObj.achievements;
    mainBlockModel.shortDescription = Array.isArray(mainBlockObj.shortDescription) ? mainBlockObj.shortDescription.join('') : mainBlockObj.shortDescription;
    mainBlockModel.longDescription = Array.isArray(mainBlockObj.longDescription) ? mainBlockObj.longDescription.join('') : mainBlockObj.longDescription;
    mainBlockModel.location = mainBlockObj.location;
    mainBlockModel.skillsIds = mainBlockObj.skillsIds;
    mainBlockModel.icon = mainBlockObj.icon;
    mainBlockModel.links = mainBlockObj.links;

    mainBlockModel.nameHide = mainBlockObj.blockName.length > 0;
    mainBlockModel.yearsHide = mainBlockObj.years.length > 0;
    mainBlockModel.positionHide = mainBlockObj.position.length > 0;
    mainBlockModel.responsobilityHide = mainBlockObj.responsobility.length > 0;
    mainBlockModel.achievementsHide = mainBlockObj.achievements.length > 0;
    mainBlockModel.shortDeskriptHide = mainBlockObj.shortDescription.length > 0;
    mainBlockModel.longDescriptionHide = mainBlockObj.longDescription.length > 0;
    mainBlockModel.locationHide = mainBlockObj.location.length > 0;
    mainBlockModel.iconHide = mainBlockObj.icon.length > 0;
    mainBlockModel.linksHide = mainBlockObj.links.length > 0;

    return mainBlockModel;
  }

  private sortBlocksByViewOrder(mainBloc: Array<MainBlockModel>): MainBlockModel[] {
    return mainBloc.sort((a, b) => a.blockViewOrder - b.blockViewOrder);
  }
}
