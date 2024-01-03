import { Observable } from 'rxjs';

export class WebSocketService {
    ws: WebSocket | null = null;

    createObservableSocket(url: string): Observable<string> {
        this.ws = new WebSocket(url)
        return new Observable<string>(
            observer => {
                this.ws!.onmessage = (event) => {
                    observer.next(event.data);
                }
                this.ws!.onerror = (event) => observer.error(event);
                this.ws!.onclose = (event) => observer.complete();
            }
        );
    }
    sendMessage(data: object) {
        const message = JSON.stringify(data);

        if (this.ws !== null) {
            this.ws.send(message);
        }
    }
}