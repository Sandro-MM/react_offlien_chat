import * as React from "react";
import { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

interface UserLoginProps {
  handleLogin: (name: string, avatar: any) => void;
}

export const UserLogin = ({ handleLogin }: UserLoginProps) => {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState<any>(null);
  const [nameError, setNameError] = useState<string | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = (e.target as HTMLInputElement).files;

    if (files && files.length > 0) {
      const selectedFile = files[0];
      if (selectedFile.type.startsWith('image/')) {
        const img = new Image();
        img.src = URL.createObjectURL(selectedFile);
        img.onload = () => {
          if (img.width >= 400 && img.height >= 400) {
            setAvatar(selectedFile);
          }
        };
      }
    }
  };

  const validateName = (inputName: string) => {
    const trimmedName = inputName.trim();
    const validNameRegex = /^[^\s]+$/u;

    if (trimmedName.length < 8 || trimmedName.length > 12 || !validNameRegex.test(trimmedName)) {
      setNameError("Name must be between 8 and 12 characters and can only contain letters from any alphabet, numbers, underscores");
      return false;
    }

    setNameError(null);
    return true;
  };

  const handleSubmit = () => {
    if (validateName(name)) {
      handleLogin(name, avatar);
    }
  };

  return (
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h4" textAlign="center" gutterBottom>
            Login in
          </Typography>
          <TextField
              label="username"
              placeholder="enter username"
              size="small"
              style={{ margin: "10px" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
          />
          <br />
          <input
              type="file"
              accept="image/*"
              style={{ margin: "10px" }}
              onChange={handleFileChange}
          />
          <br />
          {nameError && <div style={{ color: 'red' }}>{nameError}</div>}
          <Button
              variant="contained"
              style={{ margin: "10px" }}
              onClick={handleSubmit}
          >
            Join chat
          </Button>
        </CardContent>
      </Card>
  );}
