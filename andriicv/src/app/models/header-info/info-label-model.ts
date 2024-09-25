export class InfoLabelModel {
    public textValue: string = "";
    public iconSrc: string = "";
    public isBlurred: boolean = false;
    public lockIcon: string = "";
    public constructor() {
    }
    public toggleBlur(): void {
        this.isBlurred = !this.isBlurred;
    }
}