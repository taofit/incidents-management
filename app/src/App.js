import React from "react";
import { Text } from "@cinemataztic/cine-ui";
import { useState, useEffect } from "react";

const App = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/incidents`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setLoading(false);
      setData(data)
    })
  }, [])

  return (
    <div className="bg-primary h-screen overflow-y-auto min-h-full px-4">
      <Text color="primary" className="py-8">
        Hello, World!
      </Text>
      <div className="text-white bg-secondary rounded-xl h-auto p-5">
        <Text color="default">Let's get started.</Text>
      </div>
      {loading && <p>loading...</p>}
      {error && (<div>{`There is a problem fetching the post data- ${error}`}</div>)}
      <table>
      <thead>
        <tr><td>ID</td><td>PROBLEM</td><td>CINEMA</td><td>ASSIGNEE</td><td>LAST ACTIVITY</td><td>CREATED</td><td>STATUS</td></tr>
      </thead> 
      <tbody>
        {data && 
        Object.keys(data).map((key) => (
          <tr key={data[key]._id}>
            <td>{data[key]._id}</td> 
            <td>{data[key].warning.errorDescription}</td> 
            <td>{data[key].cinema.name}-{data[key].cinema.id}</td> 
            <td>{data[key].assignee?.name}</td>
            <td>{data[key].updatedAt}</td>
            <td>{data[key].createdAt}</td>
            <td>{data[key].warning.status}</td>
          </tr>
        ))} 

      </tbody>
      </table>
    </div>
  );
};

export default App;
