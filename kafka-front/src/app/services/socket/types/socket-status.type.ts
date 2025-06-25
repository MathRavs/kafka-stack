export const SocketStatusEnum = {
    CONNECTING: 'connecting',
    CONNECTED: 'connected',
    DISCONNECTED: 'disconnected',
    ERROR: 'error',
} as const;

export type SocketStatus = typeof SocketStatusEnum[keyof typeof SocketStatusEnum];


export interface SocketStatusData {
    isConnected: boolean;
    status: SocketStatus;
    message?: string;
}