
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
export class SkillProviderService {

  private dataPath: string = StaticConf.localPath + StaticConf.dataPath

  constructor(private s3Service: S3Service, private appStateService: AppStateService) { 
    this.config()
  }

  private config(): void {
    if (environment.production) {
      this.dataPath = StaticConf.s3backetPath + StaticConf.dataPath;
    }
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
    return this.getSkillsJsonFromS3().pipe(
      map(data => this.mapSkills(this.filterSkillsById(data.skillsObjects, ids)))
    );
  }
  
  private filterSkillsById(skills: Array<any>, ids: Array<number>): Array<any> {
    return skills.filter(skill => ids.includes(skill.id));
  }

  private sortSkillsByViewOrder(skills: Array<SkillModel>): Array<SkillModel> {
    return skills.sort((a, b) => a.skillViewOrder - b.skillViewOrder);
  }
}
