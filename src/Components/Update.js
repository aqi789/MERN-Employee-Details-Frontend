import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
  };

  const handleDesignationChange = (e) => {
    setDesignation(e.target.value);
  };

  const handleSalaryChange = (e) => {
    setSalary(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/getuserbyid/${id}`)
      .then((result) => {
        console.log(result);
        setName(result.data.name);
        setDepartment(result.data.department);
        setDesignation(result.data.designation);
        setSalary(result.data.salary);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleUpdate = () => {
    axios
      .put(`http://localhost:8000/updateuser/${id}`, {
        name,
        department,
        designation,
        salary
      })
      .then((res) => {
        console.log(res);
        navigate("/view");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Update Employee Details</h2>
      <form>
        <input
          type="text"
          placeholder="Employee Name"
          value={name}
          onChange={handleNameChange}
        />
        <br />
        <input
          type="text"
          placeholder="Employee Department"
          value={department}
          onChange={handleDepartmentChange}
        />
        <br />
        <input
          type="text"
          placeholder="Employee Designation"
          value={designation}
          onChange={handleDesignationChange}
        />
        <br />
        <input
          type="text"
          placeholder="Salary"
          value={salary}
          onChange={handleSalaryChange}
        />
        <br />
        <button onClick={handleUpdate}>
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;
