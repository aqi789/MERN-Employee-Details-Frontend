import React, { useState } from "react";
import "./styles.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleDepartment = (e) => {
    setDepartment(e.target.value);
  };

  const handleDesignation = (e) => {
    setDesignation(e.target.value);
  };

  const handleSalary = (e) => {
    setSalary(e.target.value);
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !department || !designation || !salary || !image) {
      console.error("Please fill in all fields");
      return;
    }
    const formData = new FormData();
    formData.append("employeeImage", image);
    formData.append("name", name);
    formData.append("department", department);
    formData.append("designation", designation);
    formData.append("salary", salary);

    axios
      .post(`http://localhost:8000/post`, formData)
      .then((res) => {
        console.log(res.data);
        navigate("/view");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="form">
      <div>
        <h1>Employee Details</h1>
      </div>
      <div>
        <form encType="multipart/form-data">
          <input
            type="text"
            placeholder="Employee Name"
            value={name}
            onChange={handleName}
          />
          <br />
          <input
            type="text"
            placeholder="Employee Department"
            value={department}
            onChange={handleDepartment}
          />
          <br />
          <input
            type="text"
            placeholder="Employee Designation"
            value={designation}
            onChange={handleDesignation}
          />
          <br />
          <input
            type="text"
            placeholder="Salary"
            value={salary}
            onChange={handleSalary}
          />
          <br />
          <input type="file" accept="image/*" onChange={handleImage} />
          <br />
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
