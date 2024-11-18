import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}
  private users: Record<string, any> = {};
  afterInit(server: Socket) {}
  handleConnection(client: Socket, ...args: any[]) {
    const token = client.handshake.headers.authorization?.split(' ')[1];
    if (!token) {
      client.disconnect();
      throw new WsException('Token not provided');
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      this.users[client.id] = payload;
      console.log('Số người kết nối:', this.users);
    } catch (error) {
      // Nếu token không hợp lệ hoặc hết hạn, ngắt kết nối client
      console.error('Lỗi xác thực:', error.message);
      client.disconnect();
    }
  }
  handleDisconnect(client: Socket) {
    delete this.users[client.id];
  }
}
