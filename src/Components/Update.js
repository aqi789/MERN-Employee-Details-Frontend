import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Update = () => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");
  const [image, setImage]=useState("");

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

  const handleImageChange = (e) => {
    const file=e.target.files[0];
    setImage(file);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8000/getuserbyid/${id}`)
      .then((result) => {
        console.log(result);
        setName(result.data.name);
        setDepartment(result.data.department);
        setDesignation(result.data.designation);
        setSalary(result.data.salary);
        setImage(result.data.image);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  // const handleUpdate = () => {
  //   axios
  //     .put(`http://localhost:8000/updateuser/${id}`, {
  //       name,
  //       department,
  //       designation,
  //       salary,
  //       image: image ? image.name : null,
  //     })
  //     .then((res) => {
  //       // Assuming the response contains the updated user with the correct image path
  //       setImage(res.data.image); // Update the image state
  //       navigate("/view");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  
  const handleUpdate = () => {
    console.log("Updating...");
    axios
      .put(`http://localhost:8000/updateuser/${id}`, {
        name,
        department,
        designation,
        salary,
        image: image ? image.name : null,
      })
      .then((res) => {
        console.log("Update successful:", res.data);
        setImage(res.data.image);
        navigate("/view");
      })
      .catch((err) => {
        console.error("Update failed:", err);
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
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <br/>
        <button onClick={handleUpdate}>
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;
