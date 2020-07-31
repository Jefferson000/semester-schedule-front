export class Schedule {
    private time: number = null;
    private day: number = null;

    constructor(time,day){
        this.time = time;
        this.day = day;
    }

    set timeF(time){
        this.time = time;
    }

    get timeF(){
        return this.time;
    }

    set dayF(day){
        this.day = day
    }

    get dayF(){
        return this.day;
    }
    
}