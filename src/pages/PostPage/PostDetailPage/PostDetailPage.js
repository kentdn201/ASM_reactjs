import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { useParams } from "react-router-dom";

const PostDetailPage = () => {
  const id = useParams().id;
  const [datas, setDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let didCancel = false;
    axios({
      method: "GET",
      url: `https://jsonplaceholder.typicode.com/posts/${id}`,
    })
      .then((response) => {
        if (!didCancel) {
          setDatas(response.data);
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
  }, []);

  if (isLoading) return <div>Loading....</div>;

  if (error) return <div style={{ color: "red" }}>{error}</div>;
  
  return (
    <div>
      <div>
        <Card>
          <Card.Body style={{ width: "100%", margin: "120px" }}>
            <Card.Title>ID: {id}</Card.Title>
            <Card.Title>{datas.title}</Card.Title>
            <Card.Text>{datas.body}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default PostDetailPage;
