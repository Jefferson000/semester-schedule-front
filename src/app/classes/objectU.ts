export abstract class ObjectU{

    protected id: number = null;
    protected name: string = null;

    constructor(id,name) {
        this.id = id;
        this.name = name;
    }

    get nameF(){
        return this.name;
    }

    get idF(){
        return this.id;
    }

    set nameF(name){
        this.name = name;
    }

    set idF(id){
        this.id = id;
    }
}
