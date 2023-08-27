import { Server } from 'socket.io';
import { JwtService } from '../../../lib/api/shared/services/jwtService/jwt.service';

//* services
const jwtService = new JwtService();

//* socket connection
export const initSocketConnection = (io: Server) =>
  io.on('connection', (socket) => {
    console.log('a user connected', socket);
    socket.on('disconnect', () => {
      console.log('user disconnected', socket);
    });
  });

//* socket access permission
export const socketAccessPermission = (io: Server) =>
  io.use((socket, next) => {
    const token = socket.handshake.query.token as string;
    if (jwtService.authenticateToken(token)) {
      return next();
    }
    return next(new Error('Authentication error'));
  });
