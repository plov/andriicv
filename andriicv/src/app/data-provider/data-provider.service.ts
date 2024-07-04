import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SkillModel } from '../models/skills/skill-model';
import { environment } from '../../environments/environment';
import { StaticConf } from '../statcconf';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  dataPath: string = StaticConf.localPath + StaticConf.dataPath + StaticConf.skillsInfo;
  constructor(private httpClient: HttpClient) { 
    this.config()
  }

  private config(): void {
    if (environment.production) {
      this.dataPath = StaticConf.s3backetPath + StaticConf.dataPath + StaticConf.skillsInfo;
      console.log("this.dataPath: " + this.dataPath)
    }
  }

  getJson(): Observable<any> {
    return this.httpClient.get(this.dataPath);
  }

  // Method to convert a single skill object to SkillModel
  private convertToSkillModel(skillObj: any): SkillModel {
    const skillModel = new SkillModel();
    skillModel.id = skillObj.id;
    skillModel.skillViewOrder = skillObj.skillViewOrder;
    skillModel.skillName = skillObj.skillName;
    skillModel.skillYears = skillObj.skillYears;
    skillModel.skillUsages = skillObj.skillUsages;
    return skillModel;
  }

  // Method to map an array of skill objects to an array of SkillModel objects
  private mapSkills(skillsObjects: any[]): SkillModel[] {
    return this.sortSkillsByViewOrder(skillsObjects.map(this.convertToSkillModel.bind(this)));
  }

  // Adjusted getSkills method
  getSkills(): Observable<Array<SkillModel>> {
    return this.getJson().pipe(
      map(data => this.mapSkills(data.skillsObjects))
    );
  }

  sortSkillsByViewOrder(skills: Array<SkillModel>): Array<SkillModel> {
    return skills.sort((a, b) => a.skillViewOrder - b.skillViewOrder);
  }

}
