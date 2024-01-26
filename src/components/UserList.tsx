import React, {useEffect} from "react";
import { useAppSelector } from "../store/hooks";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import { ListItemText } from "@mui/material";
import { User } from "../interfaces";
import AvatarComponent from "./avatarComponent";
import { useNavigate } from "react-router-dom";
import "../styles/userList.css";

interface UserListProps {
    currentUser: User;
}

export const UserList: React.FC<UserListProps> = ({ currentUser }) => {
    const { users } = useAppSelector((state) => state as { users: User[] });
    const navigate = useNavigate();

    const handleUserClick = (clickedUser: User) => {
        navigate(`/chat/${clickedUser.id}`, { state: { currentUser, clickedUser } });
    };

    return (
        <List sx={{ width: 400, bgcolor: "#DCDCDC" }}>
            {users.map((user) => (
                <ListItem
                    key={user.id}
                    divider
                    className="user-list-item"
                    onClick={() => handleUserClick(user)}
                >
                    <ListItemAvatar>
                        <AvatarComponent avatar={user.avatar} name={user.name} />
                        <div className={`status-dot ${user.status} status`}>{user.status}</div>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Typography variant="body1">
                                {user.name}
                            </Typography>
                        }
                    />
                    <div className="user-id-tooltip">{user.id}</div>
                </ListItem>
            ))}
        </List>
    );
};
