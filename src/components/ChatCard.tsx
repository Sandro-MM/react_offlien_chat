import React from "react";
import {useLocation, useParams} from "react-router-dom";
import { Card, CardActions, CardContent, CardHeader, Button, TextField } from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import PersonIcon from "@mui/icons-material/Person";
import SendIcon from "@mui/icons-material/Send";
import { useAppDispatch } from "../store/hooks";
import { addMessage } from "../store/messagesSlice";
import { styles } from "../consts";
import { useState } from "react";
import { v4 as uid } from "uuid";
import Avatar from "@mui/material/Avatar";
import { Messages } from "./Messages";
import {User} from "../interfaces";
import AvatarComponent from "./avatarComponent";
const ChatCard: React.FC = () => {
    const dispatch = useAppDispatch();
    const [message, setMessage] = useState("");
    const { userId } = useParams();
    const location = useLocation();
    const currentUser = location.state?.currentUser;
    const clickedUser = location.state?.clickedUser;

    const postMessage = () => {
        if (message.trim() !== "") {
            const date = new Date();
            const newMessage = {
                id: uid(),
                message: message.trim(),
                userId: userId,
                myId:currentUser.id,
                userName: clickedUser.name,
                myUserName:currentUser.name,
                time: `${date.getHours()}:${date.getMinutes()}`,
            };
            dispatch(addMessage(newMessage));
        }
        setMessage("");
    };

    return (
        <Card sx={{ width: "25rem" }} style={styles.cardStyle}>
            <CardHeader
                avatar={
                    <AvatarComponent avatar={clickedUser.avatar} name={clickedUser.name} />
                }
                title={`Chat with User ${clickedUser ? clickedUser.name : "Unknown User"}`}
                style={styles.bgGradient}
            />
            <CardContent style={{ background: "#DCDCDC", height: '400px', overflowY: 'auto', marginRight: '-10px' }}>
                <Messages user={clickedUser} currentUser={currentUser} />
            </CardContent>
            <CardActions disableSpacing style={{ background: grey[50] }}>
                <TextField
                    hiddenLabel
                    id="filled-hidden-label-small"
                    variant="standard"
                    size="small"
                    multiline
                    sx={{ width: "20rem" }}
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button aria-label="send-message" onClick={postMessage}>
                    <SendIcon />
                </Button>
            </CardActions>
        </Card>
    );
};

export default ChatCard;
