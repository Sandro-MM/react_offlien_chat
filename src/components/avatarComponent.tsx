import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

interface AvatarComponentProps {
    avatar: string | null;
    name: string;
}

const AvatarComponent: React.FC<AvatarComponentProps> = ({ avatar, name }) => {
    if (avatar) {
        return <Avatar src={avatar} alt={name} />;
    } else {
        const initials = name.slice(0, 2).toUpperCase();
        return (
            <Avatar sx={{ bgcolor: "red" }}>
                <Typography variant="body1" sx={{ color: "white" }}>
                    {initials}
                </Typography>
            </Avatar>
        );
    }
};

export default AvatarComponent;
