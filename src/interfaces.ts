export interface Message{
    id: string;
    message: string;
    userId: string;
    userName: string;
    myId: string;
    myName: string;
    time: string;
}

export interface MessagesData {
    messages: Message[];
}

export interface User {
    name: string;
    id: string;
    avatar:any;
    status?: 'offline' | 'online';
}
export interface Users {
    users: User[];
}
