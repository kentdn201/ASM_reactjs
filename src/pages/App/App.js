import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import LoginPage from "../LoginPage/LoginPage";
import PostPage from "../PostPage/PostPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import PostDetailPage from "../PostPage/PostDetailPage/PostDetailPage";
import NavbarPage from "./Nav/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        {/* Header của các trang */}
        <NavbarPage />

        {/* Routes đến các trang */}
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/post" element={<PostPage />} />
          <Route exact path="/post/:id" element={<PostDetailPage />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route
            exact
            path="/profile"
            element={
              (!localStorage.getItem("token") && (
                <LoginPage title="You need login to watch this content" />
              )) || <ProfilePage />
            }
          />
          <Route
            path="/profile1"
            exact
            render={() => {
              if (localStorage.getItem("token")===null)
                return (
                  <LoginPage
                    title="You need to login to continue"
                  />
                );
              return <ProfilePage/>;
            }}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
