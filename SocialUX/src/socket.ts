import { io, Socket } from "socket.io-client";
// import { DefaultEventsMap } from "socket.io-client/build/typed-events";

class SocketService {
    public socket: Socket | null = null;
    public disconnect() {
        this.socket?.disconnect();
    }

    public connect(
        url: string,
        userId: string
    ): Promise<Socket> {
        return new Promise((rs, rj) => {
            this.socket = io(url, {
                withCredentials: true, query: {
                    user_id: userId
                }
            });

            if (!this.socket) return rj();

            this.socket.on("connect", () => {
                rs(this.socket as Socket);
            });

            this.socket.on("connect_error", (err) => {
                console.log("Connection error: ", err);
                rj(err);
            });
        });
    }
}

export default new SocketService();