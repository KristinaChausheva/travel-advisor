import React from "react"
import GoogleMapReact from "google-map-react"
import { Paper, Typography, useMediaQuery } from "@material-ui/core"
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined"
import Rating from "@material-ui/lab"

import useStyles from "./styles"

export default function Map({ setCoords, setBounds, coords }) {
  const GOOGLE_API = "AIzaSyAbuMwCWVaaRvmbgrLC9Xa4ejfJoTXE9AU"
  const classes = useStyles()
  const isMobile = useMediaQuery("(min-width:600px)") //isMobile will be false if the screen is larger than the given px
  // const dummyCoords = { lat: 0, lng: 0 }
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_API }}
        defaultCenter={coords}
        center={coords}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        onChange={(e) => {
          // console.log(e)
          // console.log(e.center)
          // console.log(e.marginBounds)
          setCoords({ lat: e.center.lat, lng: e.center.lng })
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw })
        }}
        onChildClick={""}
      ></GoogleMapReact>
    </div>
  )
}
