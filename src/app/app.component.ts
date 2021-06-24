import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from './services/websocket.service.ts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public saleData: any;
  constructor(
    private http: HttpClient,
    public _webSocketService: WebsocketService
  ) { }


  ngOnInit(): void {
    this.getData();
    this.escucharSocket();
  }

  getData() {
    this.http.get('http://localhost:3000/grafica')
      .subscribe(
        (resp: any) => {
          this.saleData = resp
        }
      );
  }

  escucharSocket() {
    try {
      this._webSocketService.listen('cambio-grafica')
        .subscribe(
          (data: any) => {
            this.saleData = data;
          }
        )
    } catch (error) {
      console.log(error);
      
    }
  }




}
