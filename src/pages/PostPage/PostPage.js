import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

const PostPage = () => {

  // useState
  const [datas, setDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");
  const [sortByTitle, setSortByTitle] = useState("None");

  // useEffect
  useEffect(() => {
    let didCancel = false;
    axios({
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/posts",
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

  // search
  const datasFiltered = datas.filter((data) =>
    data.title.toLowerCase().includes(searchText.toLowerCase())
  );

  // filler
  const getDatasSorted = () => {
    if(sortByTitle === 'None') return datasFiltered;

    if(sortByTitle === 'ASC') return datasFiltered.sort((data1, data2) => {
      if(data1.title.toLowerCase() < data2.title.toLowerCase()) return -1;
      if(data1.title.toLowerCase() > data2.title.toLowerCase()) return 1;
      return 0
    })

    if(sortByTitle === 'DES') return datasFiltered.sort((data1, data2) => {
      if(data1.title.toLowerCase() < data2.title.toLowerCase()) return 1;
      if(data1.title.toLowerCase() > data2.title.toLowerCase()) return -1;
      return 0
    })
  }

  const datasSorted = getDatasSorted();

  // remove
  const handleRemove = (id) => {
    // console.log(id);
    const newList = datas.filter((data) => data.id !== id);
    setDatas(newList);
  };

  const handleSortTitle = () => {
    if (sortByTitle === "None") {
      setSortByTitle("ASC");
      return;
    }
    if (sortByTitle === "ASC") {
      setSortByTitle("DES");
      return;
    }
    if (sortByTitle === "DES") {
      setSortByTitle("None");
    }
  };

  if (isLoading) return <div>Loading....</div>;

  if (error) return <div style={{ color: "red" }}>{error}</div>;

  // return
  return (
    <div>
      <InputGroup className="mb-3">
        <FormControl
          style={{ marginLeft: 40, marginRight: 40 }}
          placeholder="Search"
          aria-label="Username"
          aria-describedby="basic-addon1"
          value={searchText}
          onChange={(evt) => setSearchText(evt.target.value)}
        />
      </InputGroup>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th onClick={handleSortTitle}>title: {sortByTitle}</th>
            <th>body</th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>
          {datasSorted.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.title}</td>
              <td>{data.body}</td>
              <td>
                <Link to={`${data.id}`}>View detail</Link>
                <Button onClick={() => handleRemove(data.id)}>Remove</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PostPage;
