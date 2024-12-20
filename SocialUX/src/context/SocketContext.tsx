import {
  createContext,
  useState,
  useEffect,
  useContext,
  FC,
  ReactNode
} from "react";
// import { useAuthContext } from './AuthContext'
import SocketService from "../socket";
import { ISocketCtx } from "../types/index";
import { Socket } from "socket.io-client";
// import useUserStore from '../store/userStore'
// import useAuthStore from '../store/AuthStore'
// import { jwtDecode } from 'jwt-decode'
import { useAuthContext } from "./AuthContext";

const SocketContext = createContext<ISocketCtx>({} as ISocketCtx);
// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider: FC<{ children: ReactNode }> = ({
  children
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const authCtx = useAuthContext();
  // const { token } = useAuthStore()

  useEffect(() => {
    // const decoded = jwtDecode<UserIdJwtPayload>(token)
    console.log("authCtx", authCtx);
    if (authCtx?.authUser) {
      SocketService.connect("http://localhost:3000", authCtx?.authUser._id);
      console.log("authCtx?.authUser._id", authCtx?.authUser._id);
      setSocket(SocketService.socket);
      socket?.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      return () => {
        socket?.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }

    // socket.on() is used to listen to the events. can be used both on client and server side
  }, [authCtx?.authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers } as ISocketCtx}>
      {children}
    </SocketContext.Provider>
  );
};
