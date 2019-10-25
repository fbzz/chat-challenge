import socketIOClient from "socket.io-client";

export default class SocketService {

    public static socketConnection: any = socketIOClient('localhost:3001');

    emitNewMessage() {

    }

    static emitNewUser(userName: string) {
        console.log(userName);
        SocketService.socketConnection.emit("newUser", userName)
    }

    static emitNewMessage(message: object) {
        SocketService.socketConnection.emit("userMessage", message)
    }

}