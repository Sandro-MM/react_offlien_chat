import {useEffect, useState} from "react";

import Header from "./components/Header";
import { UserLogin } from "./components/UserLogin";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import "./styles/App.css";
import { v4 as uid } from "uuid";
import {addUser, markUserOffline, updateUserAvatar} from "./store/usersSlice";
import {User} from "./interfaces";
import {UserList} from "./components/UserList";
import {BrowserRouter, Routes, Route, HashRouter} from 'react-router-dom';
import ChatCard from "./components/ChatCard";

export function App() {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state as { users: User[] });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User>({ name: "", id: "" , avatar:null});

  const handleLogin = (name: string, avatar: File | null) => {
    if (name.trim() !== "") {
      const existingUser = users.find((u) => u.name === name);
      let requestedUser: User;

      if (existingUser) {
        requestedUser = { ...existingUser, status: "online" };
      } else {
        requestedUser = { name, id: uid(), avatar: null, status: "online" };

        if (avatar) {
          const reader = new FileReader();
          reader.onloadend = () => {
            dispatch(updateUserAvatar({ userId: requestedUser.id, avatar: reader.result as string }));
          };
          reader.readAsDataURL(avatar);
        }

        dispatch(addUser(requestedUser));
      }

      setUser(requestedUser);
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      dispatch(markUserOffline(user.id));
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [dispatch, user.id]);

  return (
      <div className="App">
        <Header />
        <div className="container">
          {isLoggedIn ? (
              <HashRouter basename="/react_offline_chat">
                <Routes>
                  <Route path="/" element={<UserList currentUser={user} />} />
                  <Route
                      path="/chat/:userId"
                      element={<ChatCard />}
                  />
                </Routes>
              </HashRouter>
          ) : (
              <UserLogin handleLogin={handleLogin} />
          )}
        </div>
      </div>
  );
}

export default App;
