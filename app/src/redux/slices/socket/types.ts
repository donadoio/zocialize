export type NotificationType = {
  message: string;
  visibility: boolean;
};

export type SocketStateType = {
  id: string;
  socket: any;
  notification: NotificationType;
};
