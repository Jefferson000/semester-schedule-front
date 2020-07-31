import { ObjectU } from './objectU';
export class Subject extends ObjectU{

    private schedule: string = null;
    private subjectName: string = null; 
    private subjectType: number = null;
    private semester: number = null;
    private credits: number = null;

    constructor (id,name,schedule,subjectType,semester,credits){
        super(id,name);
        this.schedule = schedule;
        this.subjectType = subjectType;
        this.semester = semester;
        this.credits = credits;
    }
    

    set subjectTypeF(subjectType){
        this.subjectType = subjectType;
    }

    get subjectTypeF(){
        return this.subjectType;
    }

    set semesterF(semester){
        this.semester = semester;
    }

    get semesterF(){
        return this.semester;
    }

    set scheduleF(schedule){
        this.schedule = schedule;
    }

    get scheduleF(){
        return this.schedule;
    }

    
    set creditsF(credits){
        this.credits = credits;
    }

    get creditsF(){
        return this.credits;
    }
}