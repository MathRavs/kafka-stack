import { Injectable, signal } from "@angular/core";
import { environment } from "../../../environments/environment";
import { io, Socket } from "socket.io-client";
import { from, Observable } from "rxjs";
import { SocketStatusData, SocketStatusEnum } from "./types/socket-status.type";

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    private socket: Socket;
    private readonly environment = environment;
    private readonly  _connectionStatus = signal<SocketStatusData>({
      isConnected: false,
      status: SocketStatusEnum.CONNECTING,
    });

    readonly connectionStatus = this._connectionStatus.asReadonly();

    
    constructor() {
      this.socket = io(this.environment.socketUrl, {
        transports: ['websocket'],
      });

      this.socket.on('connect', () => {
        this. _connectionStatus.set({
          isConnected: true,
          status: SocketStatusEnum.CONNECTED,
        });
      });

      this.socket.on('disconnect', () => {
        this. _connectionStatus.set({
          isConnected: false,
          status: SocketStatusEnum.DISCONNECTED,
        });
      });

      this.socket.on('connect_error', (error: Error) => {
        this. _connectionStatus.set({
          isConnected: false,
          status: SocketStatusEnum.ERROR,
          message: "An error occurred while connecting to the socket",
        });
      });

      this.socket.on('connect_timeout', (error: Error) => {
        this. _connectionStatus.set({
          isConnected: false,
          status: SocketStatusEnum.ERROR,
          message: "Connection timeout",
        });
      });
    }

    emit<T,K>(eventName: string, data?: T): Observable<K> {
      return from(this.socket.emitWithAck(eventName, data));
    }

    on<T>(eventName: string): Observable<T> {
      return new Observable((observer) => {
        this.socket.on(eventName, (data: T) => {
          observer.next(data);
        });

        return () => {
          this.socket.off(eventName);
        };
      });
    }

    connect(): void {
        this.socket.connect();
    }

    disconnect(): void {
      if (this.socket) {
        this.socket.disconnect();
      }
    }
}