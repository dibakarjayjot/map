import React, { Component } from "react";
import { compose } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

import {Table} from "reactstrap";



const MapWithAMarker = compose(withScriptjs, withGoogleMap)(props => {

  return (
    <GoogleMap defaultZoom={11} defaultCenter={{ lat: parseFloat(13.02 ), lng: parseFloat(77.67) }}>
      {props.markers.map(marker => {
        const onClick = props.onClick.bind(this, marker)
        return (
          <Marker
            key={marker.id}
            onClick={onClick}
            position={{ lat: parseFloat(marker.latitude), lng:parseFloat( marker.longitude) }}
          >
            {props.selectedMarker === marker &&
              <InfoWindow>
                <div>
                  {marker.shelter}
                </div>
              </InfoWindow>}
            }
          </Marker>
        )
      })}
    </GoogleMap>
  )
})

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shelters: [],
      selectedMarker: false,
      count:0
            
    }
  }

  


  componentDidMount() {
    fetch("https://api.myjson.com/bins/hq9bo")
      .then(r => r.json())
      .then(first => {
        this.setState({ shelters: first.data })
      })
  }
  handleClick = (marker, event) => {
    // console.log({ marker })
    this.setState({ selectedMarker: marker })
    console.log(this.state.selectedMarker)
   // marker.addListener('click', function(event) {
     // alert(event)
    
    
  }

  increment = (e) => {
    console.log("this is a increment method")
    //let tempCart = [...this.state.selectedMarker];
    //const selectedProduct = tempCart.saplings.find(item=>
      //item.types['102205'].name === e.target.value)
    //const index = tempCart.indexOf(selectedProduct);
    //const product = tempCart[index];
    //product.count = product.count +1;
    //console.log(product.count)


    

  }

  decrement = (e) => {
    console.log("this is a decrement method")

  }

  
  render() {
    return (
      <div className="row">
      <div style={{width:'60%'}}>
      <MapWithAMarker
        selectedMarker={this.state.selectedMarker}
        markers={this.state.shelters}
        onClick={this.handleClick}
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBBisOPzZyURsNepHT8BcxUU2NINDF60_Q&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `200%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `200%` }} />}
      />
      </div> 
      <div style={{width:'40%'}}>
        <div style={{textAlign:"center"}}>
        
        
        
        {this.state.selectedMarker?<h2>{this.state.selectedMarker.name}</h2>:<h2>You haven't select any marker yet.</h2>} 
        <p> {this.state.selectedMarker.address}</p>
    <p>{this.state.selectedMarker?<span>"Contact No." {this.state.selectedMarker.contactNumber}</span>:""}</p>

    {this.state.selectedMarker && <div>
      {this.state.selectedMarker.saplings.map((item, index)=>
        (
          <Table border><tbody>
{item.types['102205'] && <tr scope="row"><td>{item.name}{item.types['102205'].name}</td><td> &#8377;{item.types['102205'].price}</td>
<td> <button onClick={this.decrement} value={item.types['102205'].name}>
                -
              </button>
              <span className="btn btn-black mx-1">{this.state.count}</span>
              <button onClick={this.increment} value={item.types['102205'].name}>
                +
              </button>
              </td>
<td>{item.types['102205'].quantity+ "Left"}</td></tr>}
{item.types['102204'] && <tr scope="row"><td>{item.name}{item.types['102204'].name}</td><td>&#8377;{item.types['102204'].price}</td>
<td> <button onClick={this.decrement} value={item.types['102204'].name}>
                -
              </button>
              <span className="btn btn-black mx-1">{this.state.count}</span>
              <button onClick={this.increment} value={item.types['102204'].name}>
                +
              </button></td>
<td>{item.types['102204'].quantity+ "Left"}</td></tr>}</tbody>
 </Table>
        ))}</div>}

        {this.state.selectedMarker?<span><button>RESERVE MY SAPPLINGS</button>
        <p> A minimum bill of INR 10 is required to complete the booking </p></span>:""}



    
    </div>
     
      </div>
      </div>
    );
  }
}