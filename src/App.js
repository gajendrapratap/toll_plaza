import React, { Component, useLayoutEffect } from 'react';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicleNo: "",
      wayType: "oneway",
      amount: 100,
      error: "",
      searchVehicleNo: "",
      serachError: "",
      amountPaid: "",
    }

    this.baseUrl = "http://localhost:3001/receipt";
    this.onVehicleChange = this.onVehicleChange.bind(this);
    this.onWayChanged = this.onWayChanged.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.onSearchVehicleChange = this.onSearchVehicleChange.bind(this);
    this.search = this.search.bind(this);
  }

  search() {
    if (this.state.searchVehicleNo === "") {
      this.setState({ serachError: "Enter Vehicle No in search" });
    } else {
      this.setState({ serachError: "" });
      fetch(`${this.baseUrl}/has_return_receipt_by_vehical_no?vehical_no=${this.state.searchVehicleNo}`)
        .then(response => response.text())
        .then(result => {
          const data = JSON.parse(result);
          console.log('data', data);
          const keys = Object.keys(data);
          const paidText = keys.length > 0 ? 'PAID' : 'UNPAID';
          this.setState({ amountPaid: paidText});

        })
        .catch(error => console.log('error', error));
    }

  }

  onSearchVehicleChange(e) {
    this.setState({
      searchVehicleNo: e.target.value
    });
  }

  submitForm() {
    if (this.state.vehicleNo === "") {
      this.setState({ error: "Enter Vehicle No" });
    } else {
      this.setState({ error: "" });
      const options = {
        "vehicle_no": this.state.vehicleNo,
        "way_type": this.state.wayType,
        "paid_amount": this.state.amount
      }
      fetch(this.baseUrl, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(options)
      }).then((response) => {
        return response.json();
      }).then((data) => {
        console.log('success', data);
        this.clearForm();
      });
    }

  }

  onVehicleChange(e) {
    this.setState({
      vehicleNo: e.target.value
    })
  }

  onWayChanged(e) {
    console.log('e1', e.target.value);
    const amount = e.target.value === "oneway" ? 100 : 200;
    this.setState({
      wayType: e.target.value,
      amount
    });
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="App">
        {this.getNewEntry()}
        {this.getSearch()}
      </div>
    );
  }

  getNewEntry() {
    return (
      <div>
        <h4>New Entry</h4>
        <label>{this.state.error}</label>
        <table>
          <tbody>
            <tr>
              <td><label>Vehicle No</label></td>
              <td>
                <input type="text" value={this.state.vehicleNo}
                  onChange={this.onVehicleChange} />
              </td>
            </tr>
            <tr>
              <td><label>Way type</label></td>
              <td><input type="radio" name="way"
                value="oneway"
                checked={this.state.wayType === "oneway"}
                onChange={this.onWayChanged} />One Way</td>
              <td><input type="radio" name="way"
                value="twoway"
                checked={this.state.wayType === "twoway"}
                onChange={this.onWayChanged} />Two Way</td>
            </tr>
            <tr>
              <td><label>Amount</label></td>
              <td><label>{this.state.amount}</label> </td>
            </tr>
            <tr>
              <td>
                <button onClick={this.submitForm}>Submit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  getSearch() {
    return (
      <div>
        <h4>Search Return Toll</h4>
        <label>{this.state.serachError}</label>
        <table>
          <tbody>
            <tr>
              <td><label>Vehicle No</label></td>
              <td>
                <input type="text" value={this.state.searchVehicleNo}
                  onChange={this.onSearchVehicleChange} />
              </td>
            </tr>
            <tr>
              <td>
                <button onClick={this.search}>Submit</button>
              </td>
            </tr>
          </tbody>
        </table>
        <h4>{this.state.amountPaid}</h4>
      </div>
    );

  }

  clearForm() {
    this.setState(
      {
        vehicleNo: "",
        wayType: "oneway",
        amount: 100,
        error: "",
      }
    )
  }
}

export default App;
