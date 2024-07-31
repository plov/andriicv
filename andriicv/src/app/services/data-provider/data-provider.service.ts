import { HttpClient } from '@angular/common/http';
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
export class DataProviderService {

  private dataPath: string = StaticConf.localPath + StaticConf.dataPath;
  //private fileName: string = StaticConf.mainBlocksInfo;
  
  constructor(private httpClient: HttpClient, private s3Service: S3Service, private appStateService: AppStateService) { 
    this.config()
  }

  private config(): void {
    if (environment.production) {
      this.dataPath = StaticConf.s3backetPath + StaticConf.dataPath;
    }
  }

  private getSkillsJson(): Observable<any> {
    return this.httpClient.get(this.dataPath + StaticConf.skillsInfo);
  }

  private getSkillsJsonFromS3(): Observable<any> {
    return this.s3Service.readJsonFile(StaticConf.dataPath, StaticConf.skillsInfo);
  }

  // Method to convert a single skill object to SkillModel
  private convertToSkillModel(skillObj: any): SkillModel {
    const skillModel = new SkillModel();
    skillModel.id = skillObj.id;
    skillModel.skillViewOrder = skillObj.skillViewOrder;
    skillModel.skillName = skillObj.skillName;
    skillModel.skillYears = skillObj.skillYears;
    skillModel.skillUsages = skillObj.skillUsages;
    skillModel.image = skillObj.image;
    return skillModel;
  }

  // Method to map an array of skill objects to an array of SkillModel objects
  private mapSkills(skillsObjects: any[]): SkillModel[] {
    return this.sortSkillsByViewOrder(skillsObjects.map(this.convertToSkillModel.bind(this)));
  }

  // Adjusted getSkills method
  getSkills(): Observable<Array<SkillModel>> {
    return this.getSkillsJsonFromS3().pipe(
      map(data => this.mapSkills(data.skillsObjects))
    );
  }

  getSkillsByIds(ids: Array<number>): Observable<Array<SkillModel>> {
    return this.getSkillsJson().pipe(
      map(data => this.mapSkills(this.filterSkillsById(data.skillsObjects, ids)))
    );
  }
  
  private filterSkillsById(skills: Array<any>, ids: Array<number>): Array<any> {
    return skills.filter(skill => ids.includes(skill.id));
  }

  private sortSkillsByViewOrder(skills: Array<SkillModel>): Array<SkillModel> {
    return skills.sort((a, b) => a.skillViewOrder - b.skillViewOrder);
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

  private getMainBlockJson(): Observable<any> {
    return this.httpClient.get(this.dataPath + this.appStateService.fileName);
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
    mainBlockModel.blockType = mainBlockObj.blockType;
    mainBlockModel.years = mainBlockObj.years;
    mainBlockModel.position = mainBlockObj.position;
    mainBlockModel.shortDescription = Array.isArray(mainBlockObj.shortDescription) ? mainBlockObj.shortDescription.join('') : mainBlockObj.shortDescription;
    mainBlockModel.longDescription = Array.isArray(mainBlockObj.longDescription) ? mainBlockObj.longDescription.join('') : mainBlockObj.longDescription;
    mainBlockModel.location = mainBlockObj.location;
    mainBlockModel.skillsIds = mainBlockObj.skillsIds;
    mainBlockModel.icon = mainBlockObj.icon;
    mainBlockModel.links = mainBlockObj.links;
    return mainBlockModel;
  }

  private sortBlocksByViewOrder(mainBloc: Array<MainBlockModel>): MainBlockModel[] {
    return mainBloc.sort((a, b) => a.blockViewOrder - b.blockViewOrder);
  }
}
