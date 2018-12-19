import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import septalogo2 from '../../septalogo2.png';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      when: '',
      purchaseLocation: '',
      rideNumber: 1,
      fareTotal: 0.00,
      tripTypePrice: null,
      zone: '',
      helperText: '',
      json: null,
    };
    this.onChooseZone = this.onChooseZone.bind(this);
    this.updatePurchaseLocation = this.updatePurchaseLocation.bind(this);
    this.onChooseTime = this.onChooseTime.bind(this);
    this.updateRideNumber = this.updateRideNumber.bind(this);
  }

  componentDidMount() {
    const requestURL = 'https://raw.githubusercontent.com/thinkcompany/code-challenges/master/septa-fare-calculator/fares.json';

    axios.get(requestURL).then(res => {
      this.setState({ json: res.data })
      this.setState({ helperText: res.data.info.weekday });
      this.setState({ when: res.data.zones[0].fares[0].type});
      this.setState({ purchaseLocation: res.data.zones[0].fares[0].purchase });
      this.setState({ zone: res.data.zones[0].name });
      this.setState({ tripTypePrice: res.data.zones[0].fares[0].purchase });
      this.farePrice();
    });
  }

  onChooseZone(event) {
    this.setState({ zone: event.target.value }, () => this.farePrice());
  }

  anytimeHelper() {
    if (this.state.when === 'anytime') {
      return <p style={{ color: 'white' }}>Anytime purchase total represents 10 rides</p>
    }
  }

  onChooseTime(event) {
    const chosenTime = event.target.value;

    // update helperText
    _.map(this.state.json.info, (timeDetail, key) => {
      if (chosenTime === key) {
        this.setState({ helperText: timeDetail })
      }
    })

    // toggle 'anytime' fare total helper text
    if (event.target.value === 'anytime') {
      this.setState()
    }

    // update 'when' state
    this.setState({ when: chosenTime }, () => this.farePrice());

  }

  updatePurchaseLocation(event) {
    this.setState({ purchaseLocation: event.target.value }, () => this.farePrice());
  }

  updateRideNumber(event) {
    this.setState({ rideNumber: event.target.value }, () => this.farePrice());
  }

  // Calculate total fare and setState of 'fareTotal'
  farePrice = () => this.state.json.zones.map((zone) => {
    console.log(zone.name);
    console.log(this.state.zone);
    if (zone.name === this.state.zone) {
      zone.fares.map((fare) => {
        if (fare.type === this.state.when && fare.purchase === this.state.purchaseLocation) {
          const fareTot = this.state.rideNumber * fare.price;
          console.log(fareTot);
          this.setState({ tripTypePrice: fare.price });
          this.setState({ fareTotal: fareTot });
        }
      })
    }
  })

  render() {
    return (
      <div className="App">
        <div className="Container">
          <div className="Container-Header">
            <img src={septalogo2} className="Septa-logo" alt="septa" />
            <h2 style={{ color: 'white' }}>Regional Rail Fares</h2>
          </div>
          <div className="Section">
            <h3 className="Heading">Where are you going?</h3>
            <select className="Dropdown" value={this.state.zone} onChange={this.onChooseZone}>
              {(this.state.json !== null) && this.state.json.zones.map(zone => <option value={zone.name}>{zone.name}</option>)}
            </select>
          </div>
          <div className="Section">
            <h3 className="Heading">When are you Riding?</h3>
            <select className="Dropdown" value={this.state.when} onChange={this.onChooseTime}>
              <option value="weekday">Weekdays</option>
              <option value="evening_weekend">Weekend and Weekday Evening</option>
              <option value="anytime">Anytime</option>
            </select>
            <p className="Helpertext">{this.state.helperText}</p>
          </div>
          <div className="Section">
            <h3 className="Heading">Where will you purchase the fare?</h3>
            <div className="radio">
              <input
                type="radio"
                value="advance_purchase"
                checked={this.state.purchaseLocation === 'advance_purchase'}
                onChange={this.updatePurchaseLocation}
              />
              <h3 className="Heading">Station Kiosk</h3>
            </div>
            <div className="radio">
              <input
                type="radio"
                value="onboard_purchase"
                checked={this.state.purchaseLocation === 'onboard_purchase'}
                onChange={this.updatePurchaseLocation}
              />
              <h3 className="Heading">Onboard</h3>
            </div>
          </div>
          <div className="Section">
            <h3 className="Heading">How many rides will you need?</h3>
            <input
              type="number"
              value={this.state.rideNumber}
              onChange={this.updateRideNumber}
            ></input>
          </div>
          <div className="Faredisplay">
            <text className="Fareheading">Your fare will cost</text>
            {this.anytimeHelper()}
            <h2 style={{ color: 'white' }}>&#36;{this.state.fareTotal}</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
