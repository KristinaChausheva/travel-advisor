import { useState, useEffect } from "react"
import { getPlacesData } from "./api"

import { CssBaseline, Grid } from "@material-ui/core"

import Header from "./components/Header/Header"
import List from "./components/List/List"
import Map from "./components/Map/Map"

function App() {
  const [childClicked, setChildClicked] = useState(null)
  const [places, setPlaces] = useState([])
  const [filteredPlaces, setFilteredPlaces] = useState([])
  const [type, setType] = useState("restaurants")
  const [rating, setRating] = useState("")
  const [coords, setCoords] = useState({})
  const [bounds, setBounds] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoords({ lat: latitude, lng: longitude })
        // setBounds({ sw: 0, ne: 0 })
      }
    )
  }, [])

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place.rating > rating)
    setFilteredPlaces(filteredPlaces)
    console.log(rating)
  }, [rating])

  useEffect(() => {
    // console.log(coordinates, bounds)
    setIsLoading(true)
    getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
      // console.log(data)
      // console.log(bounds.sw)
      // console.log(bounds.ne)
      setPlaces(data)
      setFilteredPlaces([])
      setIsLoading(false)
    })
  }, [coords, bounds, type])
  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.legnt ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoords={setCoords}
            setBounds={setBounds}
            coords={coords}
            places={filteredPlaces.legnt ? filteredPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default App
