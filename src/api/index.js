/* eslint-disable consistent-return */
import axios from "axios"

export const getPlacesData = async (type, sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
          tr_latitude: ne.lat,
        },
        headers: {
          "x-rapidapi-key":
            "1325b500f7msh6afb27926a375b8p1e6d00jsnfe6869f40dbf",
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        },
      }
    )

    return data
  } catch (error) {
    console.log(error)
  }
}
