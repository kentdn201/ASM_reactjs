import React, { useState, useEffect } from "react";
import { profileService } from "../../services/service";
import { Card } from "react-bootstrap";

const ProfilePage = () => {
  const userId = localStorage.getItem('userId');
  const [user, setUser] = useState({
    name: "",
    id: "",
    createdAt: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let didCancel = false;
    profileService(userId)
      .then((response) => {
        if (!didCancel) {
          setUser(response.data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!didCancel) {
          setIsLoading(false);
          setError("Error");
        }
      });
    return () => {
      didCancel = true;
    };
  }, [userId]);

  if (isLoading) return <div>Loading....</div>;

  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      <Card>
        <Card.Body style={{ width: "100%", margin: "120px" }}>
          <p>This is profile page</p>
          <Card.Title>ID: {userId}</Card.Title>
          <Card.Text>{user.name}</Card.Text>
          <Card.Text>{user.createdAt}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ProfilePage;
