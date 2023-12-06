// ** Socket io client
import io, { Socket } from 'socket.io-client';

// ** Types
import { ServerToClientEvents, ClientToServerEvents } from './types';
import { BASE_URL } from '@/config';

// ** Class
class WebSocketService {
  // public socket: Socket<ServerToClientEvents, ClientToServerEvents>;
  constructor() {
    // this.socket = io(BASE_URL, {
    //   transports: ['websocket'],
    //   query: {
    //     device: 'Iphone 14 Pro Max',
    //   },
    // });

    this.listen('connect', () => {
      console.log('Connected');
    });

    this.listen('disconnect', (reason: string) => {
      console.log('Disconnect: ', reason);
      if (reason === 'io server disconnect') {
        // the disconnection was initiated by the server, you need to reconnect manually
        // this.socket.connect();
      }
    });

    this.listen('connect_error', (data: any) => {
      console.log('connect error: ', data);
    });
  }
  initializeSocket = async () => {
    // try {
    //   this.socket = io(BASE_URL, {
    //     transports: ['websocket'],
    //     query: {
    //       device: 'mac',
    //     },
    //   });
    //   this.listen('connect', () => {
    //     console.log('Connected');
    //   });

    //   this.listen('disconnect', (reason: string) => {
    //     console.log('Disconnect: ', reason);
    //     if (reason === 'io server disconnect') {
    //       // the disconnection was initiated by the server, you need to reconnect manually
    //       // this.socket.connect();
    //     }
    //   });

    //   this.listen('connect_error', (data: any) => {
    //     console.log('connect error: ', data);
    //   });
    // } catch (error) {
    //   console.log('socket is not initialized: ', error);
    // }
  };
  emit<EventName extends keyof ClientToServerEvents>(
    event: EventName,
    ...args: Parameters<ClientToServerEvents[EventName]>
  ) {
    // this.socket.emit(event, ...args);
  }
  listen<EventName extends keyof ServerToClientEvents>(
    event: EventName,
    listener: (...args: Parameters<ServerToClientEvents[EventName]>) => void,
  ) {
    // this.socket.on(event, listener as any);
  }
  off<EventName extends keyof ServerToClientEvents>(
    event: EventName,
    listener: (...args: Parameters<ServerToClientEvents[EventName]>) => void,
  ) {
    // this.socket.off(event, listener as any);
  }
}
const socketServices = new WebSocketService();

export default socketServices;
