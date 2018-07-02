import { HttpService } from "./_HttpService";

export class FeedbackService{
    constructor(){
        this.httpInstance = HttpService.instance();
    }

    async addFeedback(content){
        try{
            let resp = await this.httpInstance.post('/feedback', {
                content: content
            });

            return resp.feedback;
        }catch(e){
            console.log("failed and err was: ", e);
        }
    }

    async getAllFeedback(){
        try{
            let allFeedback = await this.httpInstance.get('/feedback');
            return allFeedback.feedback;
        }catch(e){
            console.log("failed and err was: ", e);
        }
    }
}