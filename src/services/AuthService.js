import { HttpService } from "./_HttpService";
import { _LocalStorageService } from "./_localStorageService";

export class AuthService{
    static service;
    
    constructor(){
        this.httpInstance = HttpService.instance();
        this.storageRef = _LocalStorageService.instance();
    }

    static instance(){
        if(!this.service){
            this.service = new AuthService();
        }
        
        return this.service;
    }

    async signup(firstName, lastName, email, password){
        try{
            let resp = await this.httpInstance.post('/auth/register', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            })

            this.storageRef.set("haus", {isAuthenticated: true, accessToken: resp.session.token});
        }catch(e){
            console.log("failed and err was: ", e);
        }
    }

    async login(email, password){
        try{
            let resp = await this.httpInstance.post('/auth/login', {
                email: email,
                password: password
            })

            this.storageRef.set("haus", {isAuthenticated: true, accessToken: resp.session.token});
        }catch(e){
            console.log('failed and err was: ', e);
        }
    }

    logout(){
        try{
            this.storageRef.remove("haus");
        }catch(e){
            console.log("logout failed and e was: ", e);
        }
    }

    isAuthenticated(){
        const haus = this.storageRef.get("haus");
        if(haus == null){
            return false;
        }

        return haus.isAuthenticated;
    }

    getAccessToken(){
        const haus = this.storageRef.get("haus");
        if(haus == null){
            return false;
        }

        return haus.accessToken;
    }
}