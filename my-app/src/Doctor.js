import React, { Component } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import "./App.css";
let URl = "./Doctor?Id=";

var Id;


export class Doctor extends Component {
  displayName = Doctor.name;

  constructor(props) {
    super(props);
    this.state = {
      Doctor: [],
      Id: "",
      Name: "",
      Specialization: ""
    };
    this.filldoctor = this.filldoctor.bind(this);
  }

  componentWillMount() {
    this.filldoctor();
  }

  filldoctor() {
    axios.get("https://localhost:44321/api/Doctor").then(resp => {
      const detail = resp.data;
      this.setState({ Doctor: detail });
      console.log(detail);
    });
  }

  getdoctorbyid(trr) {
    document.getElementById("head").innerHTML = "Update Doctor";
    document.getElementById("bttn").style.display = "none";
    document.getElementById("bttn2").style.display = "inline";
    axios.get("https://localhost:44321/api/Doctor/" + trr).then(response => {
      let details = response.data;

      this.setState({
        Id: details[0].id,
        Name: details[0].name,
        Specialization: details[0].specilization
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
          <button
            type="button"
            class="btn btn-info btn-lg"
            id="tb_id"
            data-toggle="modal"
            data-target="#myModal"
            onClick={this.Register}
          >
            Add Doctor
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
                      Add Doctor
                    </h4>
                  </center>
                </div>
                <div class="modal-body">
                  <div>
                    <table>
                      <tr>
                        <td width="120px" align="center">
                          {" "}
                          Name:
                        </td>
                        <td>
                          <input
                            type="text"
                            id="Name"
                            value={this.state.Name}
                            onChange={e =>
                              this.setState({ Name: e.target.value })
                            }
                          />
                        </td>
                      </tr>
                      <tr>
                        <td width="120px" align="center">
                          Specilization:
                        </td>
                        <td>
                          <input
                            type="text"
                            id="Specilization"
                            value={this.state.Specialization}
                            onChange= {e =>
                              this.setState({ Specialization: e.target.value })
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
                            href="/Doctor"
                          >
                            save
                          </button>
                          <button
                            id="bttn2"
                            className="updat"
                            onClick={e => this.UpdateDoctor(this.state.Id, e)}
                            href="/Doctor"
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
              <th>Doctor ID</th>
              <th> Name</th>
              <th>Specialization</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            {this.state.Doctor.map(td => {
              return (
                <tr>
                  <td id="grideview">{td.id}</td>
                  <td id="grideview">{td.name}</td>
                  <td id="grideview">{td.specilization}</td>
                  <td>
                    <a
                      href={URl + td}
                      onClick={() => this.getdoctorbyid(td.id)}
                      class="btn"
                      data-toggle="modal"
                      data-target="#myModal"
                    >
                      Edit
                    </a>
                  </td>

                  <td>
                    <a onClick={this.delfn.bind(null, td.id)} href="/Doctor">
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
    document.getElementById("head").innerHTML = "Add Doctor ";
    document.getElementById("bttn").style.display = "inline";
    document.getElementById("bttn2").style.display = "none"; 
    this.setState({ 
      Id:'',
        Name:'',
        Specialization:''
     })
  };

  Registerfn() {
    debugger;

    document.getElementById("bttn2").style.display = "none";
    document.getElementById("bttn").style.display = "inline";

    var doctorbabu = {
      Name: document.getElementById("Name").value,
      Specilization: document.getElementById("Specilization").value
    };

    if (doctorbabu.Name === "") {
      alert("Enter Name");
      document.getElementById("Name").focus();
      return false;
    }
    if (doctorbabu.Specilization === "") {
      alert("Enter Specilization");
      document.getElementById("Specilization").focus();
      return false;
    }

    axios({
      method: "POST",
      url: "https://localhost:44321/api/Doctor",
      data: doctorbabu
    })
      .then(function(response) {
        alert("Doctor Registered successfuly");
        console.log(response);
        window.location.assign("/Doctor");
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
      url: "https://localhost:44321/api/Doctor/" + id
    })
      .then(function(response) {
        alert(id);
        alert("Deleted successfuly");
        console.log(response);
        window.location.assign("/Doctor");
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
      Name: document.getElementById("Name").value,
      Specilization: document.getElementById("Specilization").value
    };
    axios({
      method: "PUT",
      url: "https://localhost:44321/api/Doctor/" + id,
      data: doctorbabu
    })
      .then(function(response) {
        alert("Details Updated successfuly");
        console.log(response);
        window.location.assign("/Doctor");
      })
      .catch(function(response) {
        console.log(response);
      });
  };
}
export default Doctor;
