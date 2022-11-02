import React from "react";
import { Text } from "@cinemataztic/cine-ui";
import { useState, useEffect } from "react";
import Select from "./selectFilter";

const DiffTime = (t) => {
    const dt = new Date(t)
    const now = new Date()
    let diffSecond =(now.getTime() - dt.getTime()) / 1000;
    diffSecond = Math.abs(Math.round(diffSecond));
    const secondsAHour = 60 * 60
    const secondsADay = 24 * secondsAHour

    if (diffSecond > secondsADay) {
      const days = Math.floor(diffSecond / secondsADay)
      
      return days >  1 ? days + " days ago" : days + " day ago"
    } 
  
    if (diffSecond > secondsAHour) {
      const hours = Math.floor(diffSecond / secondsAHour)
      return hours > 1 ? hours + " hours ago" : hours + " hour ago"
    }
  
    return Math.round(diffSecond / 60) + " min ago"
  }

  const App = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
      fetch(`http://localhost:4000/incidents`)
      .then(response => response.json())
      .then(data => {
        setLoading(false);
        setData(data)
      })
    }, [])
  
    const onSelectChange = (selectedCinema, selectedStatus) => {
        const cinema = selectedCinema?.value ?? '';
        const status = selectedStatus?.value ?? '';

        fetch(`http://localhost:4000/incidents?status=${status}&cinema=${cinema}`)
        .then(response => response.json())
        .then(data => {
            setLoading(false);
            setData(data)
        })
    }
  
    return (
      <div className="bg-primary h-screen overflow-y-auto min-h-full px-4">
        <div className="text-white rounded-xl h-auto p-5">
          <Text className="title">All incidents</Text>
        </div>
        {loading && <p>loading...</p>}
        {error && (<div>{`There is a problem fetching the post data- ${error}`}</div>)}
        <div className="tableWrapper">
        <div color="default" className="caption">
            Incidents
            <Select onSelectChange={onSelectChange} />
        </div>
        <table>
            <thead>
                <tr><td>ID</td><td>PROBLEM</td><td>CINEMA</td><td>ASSIGNEE</td><td>LAST ACTIVITY</td><td>CREATED</td><td>STATUS</td></tr>
            </thead> 
            <tbody>
            {data && 
            Object.keys(data).map((key) => {
                const status = data[key].warning.status === 'open' ? 'status-open' : 'status-closed';
                const lastActive = DiffTime(data[key].updatedAt)
                const createdAt = DiffTime(data[key].createdAt)
    
            return <tr key={data[key]._id}>
                <td className="id">{data[key]._id}</td> 
                <td>{data[key].warning.errorDescription}</td> 
                <td>{data[key].cinema.name}-{data[key].cinema.id}</td> 
                <td>{data[key].assignee?.name}</td>
                <td>{lastActive}</td>
                <td>{createdAt}</td>
                <td className={status}><span>{data[key].warning.status}</span></td>
                </tr>
            })} 
            </tbody>
        </table>
        </div>
      </div>
    );
  };
  
  export default App;