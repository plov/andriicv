
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StaticConf } from '../../staticconf';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  fileName: string = StaticConf.mainBlocksInfo;
  private dataSource = new BehaviorSubject<any>(null);
  componenState = this.dataSource.asObservable();

  private tabId: string = "";
  private blockId: number = 0;
  private isLogin: boolean = false;
  private isAnmin: boolean = false;

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
}
