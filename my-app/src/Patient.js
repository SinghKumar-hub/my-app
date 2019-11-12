import React, { Component } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import "./App.css";
let URl = "./Patient?Patient=";

export class Patient extends Component {
  displayName = Patient.name;

  constructor(props) {
    super(props);
    this.state = {
      Patient: [],
      patientID: "",
      firstName: "",
      LastName: "",
      gender: "",
      dob: "",
      Date: "",
      city: "",
      state: "",
      Reason: "",
    };
    this.fillPatient = this.fillPatient.bind(this);
  }

  componentWillMount() {
    this.fillPatient();
  }

  fillPatient() {
    axios.get("https://localhost:44321/api/Patient").then(resp => {
      const detail = resp.data;
      this.setState({ Patient: detail });
      console.log(detail);
    });
  }

  getPatientbyid(trr) {
    debugger;
    document.getElementById("head").innerHTML = "Update Patient";
    document.getElementById("bttn").style.display = "none";
    document.getElementById("bttn2").style.display = "inline";
    axios.get('https://localhost:44321/api/Patient/'+ trr).then(response => {
     console.log(response);
      let details = response.data;
      
      this.setState({
        patientID: details[0].patientID,
        firstname: details[0].firstName,
        LastName: details[0].lastName,
        DOB:details[0].dob,
        Date:details[0].date,
        gender:details[0].gender,
        city:details[0].city,
        state:details[0].state,
        Reason:details[0].reason ,
      });
    });
  }
  render() {

    console.log(this.state.DOB)
    let mm = this.state.Doctor;
    return (
 <div>
        <br />
        <div>
          <br />
          <br />
          <br />
          <button
            type="button"
            class="btn btn-info btn-lg"
            id="tb_id"
            data-toggle="modal"
            data-target="#myModal"
            onClick={this.Register}
          >
            Add Patient
          </button>
          <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">
                    &times;
                  </button>
                  <center>
                    <h4 class="modal-title" id="head">
                      Add Patient
                    </h4>
                  </center>
                </div>
                <div class="modal-body">
                  <div>
                    <table>
                      <tr>
                        <td width="120px" align="center">
                          {" "}
                          First Name:
                        </td>
                        <td>
                          <input
                            type="text"
                            id="FName"
                            value={this.state.firstname}
                            onChange={e =>
                              this.setState({ firstname: e.target.value })
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td width="120px" align="center">
                          Last Name:
                        </td>
                        <td>
                          <input
                            type="text"
                            id="LName"
                            value={this.state.LastName}
                            onChange={e =>
                              this.setState({ LastName: e.target.value })
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td width="120px" align="center">
                          DOB:
                        </td>
                        <td>
                          <input
                            type="Date"
                            id="DOB"
                            value={this.state.DOB}
                            onChange={e =>
                              this.setState({ DOB: e.target.value })
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td width="120px" align="center">
                          Date:
                        </td>
                        <td>
                          <input
                            type="Date"
                            id="Date"
                            value={this.state.Date}
                            onChange={e =>
                              this.setState({ Date: e.target.value })
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td width="120px" align="center">
                          Gender:
                        </td>
                        <td>
                          <select
                            class="form-control"
                            id="Gender"
                            name="txtGender"
                            value={this.state.gender}
                            onChange={event =>
                              this.setState({ gender: event.target.value })
                            }
                          >
                            <option value="">------Select--------</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">other</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td width="120px" align="center">
                          City:
                        </td>
                        <td>
                          <input
                            type="text"
                            id="city"
                            value={this.state.city}
                            onChange={e =>
                              this.setState({ city: e.target.value })
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td width="120px" align="center">
                          State:
                        </td>
                        <td>
                          <input
                            type="text"
                            id="State"
                            value={this.state.state}
                            onChange={e =>
                              this.setState({ state: e.target.value })
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td width="120px" align="center">
                          Reason:
                        </td>
                        <td>
                          <input
                            type="text"
                            id="Reason"
                            value={this.state.Reason}
                            onChange={e =>
                              this.setState({ Reason: e.target.value })
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <td></td>
                        </td>
                        <td>
                          <button
                            id="bttn"
                            onClick={this.Registerfn}
                            href="/Patient"
                          >
                            save
                          </button>
                          <button
                            id="bttn2"
                            className="updat"
                            onClick={e => this.UpdatePatient(this.state.patientID, e)}
                            href="/Patient"
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-default"
                    data-dismiss="modal"
                    onClick={this.Register}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <center>
          <table id="patienttbl" border="1">
            <tr class="tblheader">
              <th>Patient ID</th>
              <th> Name</th>
              <th>Age</th>
              <th>city</th>

              <th>State</th>

              <th>Gender</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            {this.state.Patient.map(td => {
              return (
                <tr>
                  <td id="grideview">{td.patientID}</td>
                  <td id="grideview">{td.firstName}</td>
                  <td id="grideview">{td.dob}</td>
                  <td id="grideview">{td.city}</td>
                  <td id="grideview">{td.state}</td>
                  <td id="grideview">{td.gender}</td>
                  <td>
                    <a
                      href={URl + td}
                      onClick={() => this.getPatientbyid(td.patientID)}
                      class="btn"
                      data-toggle="modal"
                      data-target="#myModal"
                    >
                      Edit
                    </a>
                  </td>

                  <td>
                    <a
                      onClick={this.delfn.bind(null, td.patientID)}
                      href="/Patient"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              );
            })}
          </table>
        </center>
      </div>
    );
  }
  Register=()=> {
    document.getElementById("head").innerHTML = "Add Patient ";
    document.getElementById("bttn").style.display = "inline";
    document.getElementById("bttn2").style.display = "none"; 
    this.setState({ 
      firstname: '',
      LastName:'',
      DOB:'',
      Date:'',
      gender:'',
      city:'',
      state:'',
      Reason: '' })
  };

  Registerfn() {
    debugger;

    document.getElementById("bttn2").style.display = "none";
    document.getElementById("bttn").style.display = "inline";

    var doctorbabu = {
      firstname: document.getElementById("FName").value,
      LastName: document.getElementById("LName").value,
      DOB: document.getElementById("DOB").value,
      Date: document.getElementById("Date").value,
      Gender: document.getElementById("Gender").value,
      city: document.getElementById("city").value,
      State: document.getElementById("State").value,
      Reason: document.getElementById("Reason").value
    };

    if (doctorbabu.firstname === "") {
      alert("Enter Name");
      document.getElementById("FName").focus();
      return false;
    }
    if (doctorbabu.LastName === "") {
      alert("Enter Specilization");
      document.getElementById("LName").focus();
      return false;
    }
    if (doctorbabu.DOB === "") {
      alert("Enter Specilization");
      document.getElementById("DOB").focus();
      return false;
    }

    if (doctorbabu.Date === "") {
      alert("Enter Specilization");
      document.getElementById("Date").focus();
      return false;
    }

    if (doctorbabu.Gender === "") {
      alert("Enter Specilization");
      document.getElementById("Gender").focus();
      return false;
    }

    if (doctorbabu.city === "") {
      alert("Enter Specilization");
      document.getElementById("city").focus();
      return false;
    }

    if (doctorbabu.State === "") {
      alert("Enter Specilization");
      document.getElementById("State").focus();
      return false;
    }

    if (doctorbabu.Reason === "") {
      alert("Enter Specilization");
      document.getElementById("Reason").focus();
      return false;
    }

    axios({
      method: "POST",
      url: "https://localhost:44321/api/Patient",
      data: doctorbabu
    })
      .then(function(response) {
        alert("Patient Registered successfuly");
        console.log(response);
        window.location.assign("/Patient");
      })
      .catch(function(response) {
        console.log(response);
        console.log(response);
      });
    console.log(doctorbabu);
  }
  delfn(id) {
    if(window.confirm("Do you want to delete this Patient details.")==true)
    {
    axios({
      method: "Delete",
      url: 'https://localhost:44321/api/Patient/' + id
    })
      .then(function(response) {
        alert("Deleted successfuly");
        console.log(response);
        window.location.assign("/Patient");
      })
      .catch(function(response) {
        alert("this");
        console.log(response);
      });
  }
  }
  UpdatePatient = (id, e) => {
    debugger;

    //  document.getElementById("bttn").style.display='none';
    var doctorbabu = {
      firstname: document.getElementById("FName").value,
      LastName: document.getElementById("LName").value,
      DOB: document.getElementById("DOB").value,
      Date: document.getElementById("Date").value,
      Gender: document.getElementById("Gender").value,
      city: document.getElementById("city").value,
      State: document.getElementById("State").value,
      Reason: document.getElementById("Reason").value
    };
    axios({
      method: "PUT",
      url: 'https://localhost:44321/api/Patient/'+ id,
      data: doctorbabu
    })
      .then(function(response) {
        alert("Details Updated successfuly");
        console.log(response);
        window.location.assign("/Patient");
      })
      .catch(function(response) {
        console.log(response);
        alert("h1");
      });
  };
}
export default Patient;
