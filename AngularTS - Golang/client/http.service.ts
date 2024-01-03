import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

    constructor(private http: HttpClient) { 
	//empty	
	}

	shuffle() {
        return this.http.post('http://localhost:3333/Shuffle', null);
    }

	myclick(payload: string) {
	  return this.http.post('http://localhost:3333/MyClick', payload);
	}

	isend(payload: string) {
	  return this.http.post('http://localhost:3333/MyClick', payload);
	}
	
	
}

