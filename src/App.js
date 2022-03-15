import { useState, useEffect } from "react"
import { getPlacesData } from "./api"

import { CssBaseline, Grid } from "@material-ui/core"

import Header from "./components/Header/Header"
import List from "./components/List/List"
import Map from "./components/Map/Map"

function App() {
  const [places, setPlaces] = useState([])
  const [type, setType] = useState("restaurants")
  const [coords, setCoords] = useState({})
  const [bounds, setBounds] = useState({ sw: 0, ne: 0 })

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude })
        // setBounds({ sw: 0, ne: 0 })
      }
    )
  }, [])

  useEffect(() => {
    // console.log(coordinates, bounds)
    getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
      // console.log(data)
      // console.log(bounds.sw)
      // console.log(bounds.ne)
      setPlaces(data)
    })
  }, [coords, bounds])
  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List places={places} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map setCoords={setCoords} setBounds={setBounds} coords={coords} />
        </Grid>
      </Grid>
    </>
  )
}

export default App
