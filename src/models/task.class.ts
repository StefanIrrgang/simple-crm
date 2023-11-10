export class Task {
    title: string;
    user: string;
    content: string;
    id: string;
    priority: string;


    constructor(obj?:any) {

        this.title = obj ? obj.title : '';
        this.user = obj ? obj.user : '';
        this.content = obj ? obj.content : '';
        this.id = obj ? obj.id : '';
        this.priority = obj ? obj.priority : '';
    }

    public toJSON() {
        return {
            title: this.title,
            user: this.user,
            content: this.content,
            priority: this.priority,
        };
    }
}
