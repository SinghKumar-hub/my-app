import React, { Component } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import logo1 from '../src/H.jpeg'
import "./App.css";
let URl = "./Patient?Patient=";


export class Patient extends Component {   

  constructor(props) {
    super(props);
    this.state = {
      PatientList: [],
      DoctorList: [],
      ListAppointment: [],
      patient_list: "",
      name: "",
      date: "",
      AppointmentId: "",
      AppointmentReason: "",
    };
    this.fillAppointment = this.fillAppointment.bind(this);
    this.fillPatientdrop = this.fillPatientdrop.bind(this);
    this.fillDoctordrop = this.fillDoctordrop.bind(this);
  }
  componentWillMount() {
    this.fillDoctordrop();
    this.fillPatientdrop();
    this.fillAppointment();
  }
  fillPatientdrop() {
    debugger;
    axios.get("https://localhost:44321/api/Test").then(resp => {
      const detail = resp.data;
      this.setState({ PatientList: detail });
      console.log(detail);
    });
  }
  fillAppointment() {
    debugger;
    axios.get("https://localhost:44321/api/Appointment").then(resp => {
      const detail = resp.data;
      this.setState({ ListAppointment: detail });
      console.log(detail);
    });
  }

  fillDoctordrop() {
    axios.get("https://localhost:44321/api/DoctorDrop").then(resp => {
      const List = resp.data;
      this.setState({ DoctorList: List });
      console.log(List);
    });
  }

  getPatientbyid(trr) {
    debugger;
    document.getElementById("head").innerHTML = "Update Appointment ";
    document.getElementById("bttn").style.display = "none";
    document.getElementById("bttn2").style.display = "inline";
    axios
      .get("https://localhost:44321/api/Appointment/" + trr)
      .then(response => {
        let details = response.data;
        console.log(details);

        this.setState({
          AppointmentReason: details[0].appointmentReason,
          date: details[0].date,
          name: details[0].doctor_name,
          patient_list: details[0].patient_name,
          ID: details[0].appointmentId
        });
      });
  }
  render() {
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
            Add Appointment
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
                      Add Appointment
                    </h4>
                  </center>
                </div>
                <div class="modal-body">
                  <div>
                    <table>
                      <tr>
                        <td width="120px" align="center">
                          {" "}
                          Patient Name:
                        </td>
                        <td>
                          <select
                            name="patientid"
                            id="p_name"
                            value={this.state.patient_Name}
                            onChange={e =>
                              this.setState({ patient_Name: e.target.value })
                            }
                          >
                            <option value="0">---Select--</option>
                            {this.state.PatientList.map(m => (
                              <option value={m.patientId}>
                                {m.patient_list}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td width="120px" align="center">
                          {" "}
                          Doctor Name:
                        </td>
                        <td>
                          <select
                            name="Doctorid"
                            id="D_name"
                            value={this.state.doctor_Name}
                            onChange={event =>
                              this.setState({ doctor_Name: event.target.value })
                            }
                          >
                            <option value="0">---Select--</option>
                            {this.state.DoctorList.map(T => (
                              <option value={T.id}>{T.name}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td width="120px" align="center">
                          {" "}
                          Date:
                        </td>
                        <td>
                          <input
                            type="Date"
                            id="app_date"
                            value={this.state.date}
                            onChange={event =>
                              this.setState({ date: event.target.value })
                            }
                          ></input>
                        </td>
                      </tr>
                      <tr>
                        <td width="120px" align="center">
                          {" "}
                          Reason:
                        </td>
                        <td>
                          <input
                            type="text"
                            id="app_reason"
                            value={this.state.reason}
                            onChange={event =>
                              this.setState({
                                reason: event.target.value
                              })
                            }
                          ></input>
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
                            href="/Appointment"
                          >
                            save
                          </button>

                          <button
                            id="bttn2"
                            className="updat"
                            onClick={e => this.UpdateDoctor(this.state.ID, e)}
                            href="/Appointment"
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
              <th>Appointment ID</th>
              <th> Doctor Name</th>
              <th>Patient Name(Age)</th>
              <th>Appointment Date</th>
              <th>Raason</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            {this.state.ListAppointment.map(td => {
              return (
                <tr>
                  <td id="grideview">{td.appointmentId}</td>
                  <td id="grideview">{td.doctor_name}</td>
                  <td id="grideview">
                    {td.patient_name + " ( " + td.ages + " ) "}
                  </td>
                  <td id="grideview">{td.date}</td>
                  <td id="grideview">{td.appointmentReason}</td>

                  <td>
                    <a
                      href={URl + td}
                      onClick={() => this.getPatientbyid(td.appointmentId)}
                      class="btn"
                      data-toggle="modal"
                      data-target="#myModal"
                    >
                      Edit
                    </a>
                  </td>

                  <td>
                    <a
                      onClick={this.delfn.bind(null, td.appointmentId)}
                      href="/Appointment"
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
    document.getElementById("head").innerHTML = "Add Appointment ";
    document.getElementById("bttn").style.display = "inline";
    document.getElementById("bttn2").style.display = "none"; 
    this.setState({ name: '',date:'',patient_list:'',AppointmentReason:'' })

  };

  Registerfn() {
    debugger;

    document.getElementById("bttn2").style.display = "none";
    document.getElementById("bttn").style.display = "inline";

    var doctorbabu = {
      patient_list: document.getElementById("p_name").value,
      name: document.getElementById("D_name").value,
      date: document.getElementById("app_date").value,
      Reason: document.getElementById("app_reason").value
    };

    if (doctorbabu.patient_list === "") {
      alert("Enter Name");
      document.getElementById("p_name").focus();
      return false;
    }
    if (doctorbabu.name === "") {
      alert("Enter Doctor Name");
      document.getElementById("D_name").focus();
      return false;
    }
    if (doctorbabu.date === "") {
      alert("Enter Apppointment Date");
      document.getElementById("app_date").focus();
      return false;
    }

    if (doctorbabu.Reason === "") {
      alert("Enter Reason Of Appointment");
      document.getElementById("app_reason").focus();
      return false;
    }

    axios({
      method: "POST",
      url: "https://localhost:44321/api/Appointment",
      data: doctorbabu
    })
      .then(function(response) {
        alert("Appointment Registered successfuly");
        console.log(response);
        window.location.assign("/Appointment");
      })
      .catch(function(response) {
        console.log(response);
        console.log(response);
      });
    console.log(doctorbabu);
  }
  delfn(appointmentId) {
    if (window.confirm("Do you want to delete this Patient details.") == true) {
      axios({
        method: "Delete",
        url: "https://localhost:44321/api/Appointment/" + appointmentId
      })
        .then(function(response) {
          alert("Deleted successfuly");
          console.log(response);
          window.location.assign("/Appointment");
        })
        .catch(function(response) {
          alert("this");
          console.log(response);
        });
    }
  }
  UpdateDoctor = (id, e) => {
    debugger;

    //  document.getElementById("bttn").style.display='none';
    var doctorbabu = {
      patient_list: document.getElementById("p_name").value,
      name: document.getElementById("D_name").value,
      date: document.getElementById("app_date").value,
      Reason: document.getElementById("app_reason").value
    };
    axios({
      method: "PUT",
      url: "https://localhost:44321/api/Appointment/" + id,
      data: doctorbabu
    })
      .then(function(response) {
        alert("Details Updated successfuly");
        console.log(response);
        window.location.assign("/Appointment");
      })
      .catch(function(response) {
        console.log(response);
      });
  };
}
export default Patient;
