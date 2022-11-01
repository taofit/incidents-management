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
      <div className="text-white rounded-xl h-auto p-5">
        <Text className="title">All incidents</Text>
      </div>
      {loading && <p>loading...</p>}
      {error && (<div>{`There is a problem fetching the post data- ${error}`}</div>)}
      <table>
      <caption color="default">All incidents</caption>
      <thead>
        <tr><td>ID</td><td>PROBLEM</td><td>CINEMA</td><td>ASSIGNEE</td><td>LAST ACTIVITY</td><td>CREATED</td><td>STATUS</td></tr>
      </thead> 
      <tbody>
        {data && 
        Object.keys(data).map((key) => {
          const status = data[key].warning.status === 'open' ? 'status-open' : 'status-closed';
         return <tr key={data[key]._id}>
            <td className="id">{data[key]._id}</td> 
            <td>{data[key].warning.errorDescription}</td> 
            <td>{data[key].cinema.name}-{data[key].cinema.id}</td> 
            <td>{data[key].assignee?.name}</td>
            <td>{data[key].updatedAt}</td>
            <td>{data[key].createdAt}</td>
            <td className={status}><span>{data[key].warning.status}</span></td>
          </tr>
        })} 

      </tbody>
      </table>
    </div>
  );
};

export default App;
