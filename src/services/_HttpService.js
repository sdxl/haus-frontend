import * as axios from "axios"
import { AuthService } from "./AuthService";

export class HttpService{
    static service;

    constructor(){
        this.axiosRef = axios.create({
            baseURL: 'https://gentle-refuge-76689.herokuapp.com'
        });
    }

    static instance(){
        if(!this.service){
            this.service = new HttpService();
        }

        return this.service;
    }

    addHeaders(){
        const accessToken = AuthService.instance().getAccessToken();
        let headers = {};

        if(accessToken) headers["x-access-token"] = accessToken;

        return headers;
    }

    async makeHttpRequest(method, path, reqbody){
        const reqConfig = {
          method: method,
          url: path,
          data: reqbody ? reqbody : {},
          headers: this.addHeaders()
        }
        
        try{
            let resp = await this.axiosRef.request(reqConfig);
            return resp.data;
        }catch(e){
            console.log("e was: ", e);
        }
    }
    

    async get(path){
        return await this.makeHttpRequest("GET", path);
    };

    async post(path, reqbody){
        return await this.makeHttpRequest("POST", path, reqbody);
    }

    
}