import React, { Component } from "react"
import { compose } from "recompose"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps"

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
      selectedMarker: false
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

  
  render() {
    return (
      <div className="row">
      <div style={{width:'63%'}}>
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
      <div style={{width:'37%'}}>
        <div style={{textAlign:"center"}}>
        
        
        
        {this.state.selectedMarker?<h2>{this.state.selectedMarker.name}</h2>:<h2>You haven't select any marker yet.</h2>} 
        <p> {this.state.selectedMarker.address}</p>
    <p> {"Contact No."} {this.state.selectedMarker.contactNumber}</p>

    

    
    </div>
     </div> 
      </div>
    );
  }
}