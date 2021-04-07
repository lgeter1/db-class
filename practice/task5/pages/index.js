import React from "react";
import {getInfo} from '../lib/utils.js'
class Home extends React.Component {
  constructor(props) {
    super(props);
this.state = { search: "" };
  }
 handleUpdate(evt) {
this.setState({search: evt.target.value});
}

async handleSearch(evt){
	const parkInfo = await getInfo(this.state.search);
	this.setState({parkInfo});
	console.log(parkInfo);
	
}

  render() {
    return (
      <div
        style={{
          margin: "auto auto",
          width: "800px",
          textAlign: "center",
          background: "#daf6db",
          borderStyle: "groove",
        }}
      >
        <h1>National Park Search</h1>
        <img src="/static/nationalPark1.jpg" className="App-logo" />
    <p>	   
 <input className="input-style" type="text" value={this.state.search} onChange={this.handleUpdate.bind(this)} /> </p>					          <div className="button-style" onClick ={this.handleSearch.bind(this)}>   Submit </div>
	    
	    {this.state.parkInfo ? (
<div>
<h2>{this.state.parkInfo.name} </h2>
<h3>{this.state.parkInfo.state} </h3>
<h3>{parseInt(this.state.parkInfo.acres).toLocaleString() + " acres"}</h3>
</div>
) : null}
        <br />
        <style jsx>{`
          .button-style {
            margin: auto auto;
            margin-top: 35px;
            cursor: pointer;
            background-color: #166d17;
            color: #ffffff;
            width: 150px;
            height: 45px;
            font-family: "Arial";
            line-height: 1.9;
            font-size: 1.4rem;
          }

          .input-style {
            font-size: 1.4rem;
            line-height: 1.6;
          }

          h1 {
            font-size: 2.1rem;
            font-family: "Arial";
            color: #125213;
          }
          h2 {
            font-family: "Arial";
            font-size: 1.6rem;
          }

          h3 {
            font-family: "Arial";
            font-size: 1.4rem;
          }

          .App-logo {
            height: 500px;
          }
        `}</style>
      </div>
    );
  }
}

export default Home;
