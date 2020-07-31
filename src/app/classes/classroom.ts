export class Classroom{

    private id: number = null;
    private number = null;
    private capacity: number = null;
    private classroomType: number = null;

    constructor (id,number,capacity,classroomType){
        this.id = id;
        this.number = number;
        this.capacity = capacity;
        this.classroomType = classroomType;
    }
    
    set numberF(number){
        this.number = number;
    }

    get numberF(){
        return this.number;
    }

    set idF(id){
        this.id = id;
    }

    get idF(){
        return this.id;
    }

    set capacityF(capacity){
        this.capacity = capacity;
    }

    get capacityF(){
        return this.capacity;
    }



    set classroomTypeF(classroomType){
        this.classroomType = classroomType;
    }

    get classroomTypeF(){
        return this.classroomType;
    }

}