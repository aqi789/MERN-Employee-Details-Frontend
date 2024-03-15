import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Table = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/getdata`)
      .then((result) => {
        console.log(result.data);
        setData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8000/delete/${id}`)
      .then((res) => {
        console.log("Deleted");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>Employee Image</td>
            <td>Employee Name</td>
            <td>Department</td>
            <td>Designation</td>
            <td>Salary</td>
            <td colSpan={2}>Action</td>
          </tr>
        </thead>
        <tbody>
          {data.map((values, index) => (
            <tr key={index}>
              <td>
              <img
  src={`http://localhost:8000/images/${values.image}`}
  alt={`Employee ${values.name}`}
  style={{ maxWidth: "50px", maxHeight: "50px" }}
/>

              </td>
              <td>{values.name}</td>
              <td>{values.department}</td>
              <td>{values.designation}</td>
              <td>{values.salary}</td>
              <td>
                <Link to={`/update/${values._id}`}>
                  <button>Edit</button>
                </Link>
              </td>
              <td>
                <button onClick={() => handleDelete(values._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
