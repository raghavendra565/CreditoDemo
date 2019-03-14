import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PostService {
    constructor(public http:Http){

    }


    postSerivices(url:any, body: any){
        var headers =new Headers();
        headers.append("content-type", "application/json");
        var options = new RequestOptions({headers: headers});
        this.http.post(url, body, options).subscribe(data=>{
            console.log(data);
        },
        error =>{
            console.log(error);
        }
        )
    }
}