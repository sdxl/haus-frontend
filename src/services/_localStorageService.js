export class _LocalStorageService{
    static service;

    static instance(){
        if(!this.service){
            this.service = new _LocalStorageService();
        }
        
        return this.service;
    }

    set(key, content){
        localStorage.setItem(key, JSON.stringify(content));
        return;
    }

    get(key){
        return JSON.parse(localStorage.getItem(key));
    }

    remove(key){
        localStorage.removeItem(key);
    }
}