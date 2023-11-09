export class Project {
    title: string;
    user: string;
    content: string;
    id: string;
    time: string;
    volume: number;
    priority: string;


    constructor(obj?:any) {

        this.title = obj ? obj.title : '';
        this.user = obj ? obj.user : '';
        this.content = obj ? obj.content : '';
        this.id = obj ? obj.id : '';
        this.time = obj ? obj.time : '';
        this.volume = obj ? obj.volume : '';
        this.priority = obj ? obj.priority : '';
    }

    public toJSON() {
        return {
            title: this.title,
            user: this.user,
            content: this.content,
            time: this.time,
            volume: this.volume,
            priority: this.priority,
        };
    }
}
