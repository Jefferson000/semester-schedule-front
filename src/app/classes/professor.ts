import { ObjectU } from './objectU';
export class Professor extends ObjectU{

    private schedule: string = null;
    private subjectName: string = null; 

    constructor (id,name,schedule,subjectName){
        super(id,name);
        this.schedule = schedule;
        this.subjectName = subjectName;
    }

    set scheduleF(schedule){
        this.schedule =schedule;
    }

    get scheduleF(){
        return this.schedule;
    }

    set subjectNameF(subjectName){
        this.subjectName =subjectName;
    }

    get subjectNameF(){
        return this.subjectName;
    }

}