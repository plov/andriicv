import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { SkillModel } from '../models/skills/skill-model';
import { environment } from '../../environments/environment';
import { StaticConf } from '../staticconf';
import { MainBlockModel } from '../models/main-block/main-block-model';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  dataPath: string = StaticConf.localPath + StaticConf.dataPath;

  private dataSource = new BehaviorSubject<any>(null);
  componenState = this.dataSource.asObservable();

  private fileName: string = StaticConf.mainBlocksInfo;
  private tabId: string = "";
  private blockId: number = 0;

  updateState() {
    this.dataSource.next(this.componenState);
  }

  setBlockId(blockId: any) {
    this.blockId = blockId;
    this.saveBLockIdInCache()
  }

  getBlockId() {
    const blockId = this.getBLockIdFromCache();
    if (this.blockId === 0 && blockId !== undefined) {
      this.blockId = blockId;
    }
    return this.blockId;
  }

  setTabId(tabId: any) {
    this.tabId = tabId;
    switch (tabId) {
      case 1:
        this.fileName = StaticConf.mainBlocksInfo;
        break;
      case 2:
        this.fileName = StaticConf.projectsInfo;
        break;
      case 3:
        this.fileName = StaticConf.educationInfo;
        break;
      case 4:
        this.fileName = StaticConf.volonteeringInfo;
        break;
      default:
        this.fileName = StaticConf.mainBlocksInfo;
        break;
    }
    this.saveTabIdInCache()
  }

  getTabId() {
    const tabId = this.getTabIdFromCache();
    if (this.tabId === "" && tabId !== undefined) {
      this.tabId = tabId;
    }
    return this.tabId;
  }
  
  constructor(private httpClient: HttpClient) { 
    this.config()
  }

  private config(): void {
    if (environment.production) {
      this.dataPath = StaticConf.s3backetPath + StaticConf.dataPath;
      console.log("this.dataPath: " + this.dataPath)
    }
  }

  private getBLockIdFromCache() {
    const cachedData = sessionStorage.getItem('blockId');
    if (cachedData) {
      return JSON.parse(cachedData);
    }
  }

  private saveBLockIdInCache() {     
      sessionStorage.setItem('blockId', JSON.stringify(this.blockId));
      return this.blockId;
  }

  private getTabIdFromCache() {
    const cachedData = sessionStorage.getItem('tabId');
    if (cachedData) {
      return JSON.parse(cachedData);
    }
  }

  private saveTabIdInCache() {     
      sessionStorage.setItem('tabId', JSON.stringify(this.tabId));
      return this.tabId;
  }

  private getSkillsJson(): Observable<any> {
    return this.httpClient.get(this.dataPath + StaticConf.skillsInfo);
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
    return this.getSkillsJson().pipe(
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
    return this.getMainBlockJson().pipe(
      map(data => this.mapMainBlock(data.MainBlocs))
    );
  }

  getMainBlockById(id: number): Observable<MainBlockModel> {
    return this.getMainBlockJson().pipe(
      map((data: any) => data.MainBlocs.find((block: any) => block.id === id)),
      map((block: any) => this.convertToMainBlockModel(block))
    );
  }

  private getMainBlockJson(): Observable<any> {
    return this.httpClient.get(this.dataPath + this.fileName);
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
