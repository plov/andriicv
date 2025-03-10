export class MainBlockModel {
    public id: number = 0;
    public blockViewOrder: number = 0;

    public nameHide: boolean = false;
    public blockName: string = "";

    public yearsHide: boolean = false;
    public years: string = "";

    public monthStart: number = 0;
    public monthEnd: number = 0;
    public yearStart: number = 0;
    public yearEnd: number = 0;

    public positionHide: boolean = false;
    public position = "";

    public shortDeskriptHide: boolean = false;
    public shortDescription: string = "";

    public responsobilityHide: boolean = false;
    public responsobility: string = "";

    public achievementsHide: boolean = false;
    public achievements: string = "";

    public longDescriptionHide: boolean = false;
    public longDescription: string = "";

    public skillsIds: Array<number> = [];

    public locationHide: boolean = false;
    public location: string = "";

    public iconHide: boolean = false;
    public icon: string = "";
    
    public linksHide: boolean = false;
    public links: Array<string> = [];
}
