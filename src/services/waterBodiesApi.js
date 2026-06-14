export async function getNearbyWaterBodies(lat, lon) {
  try {
    const apiUrl =
      window.location.hostname === "localhost"
        ? "https://lz4.overpass-api.de/api/interpreter"
        : `/api/waterbodies`

    let response

    if (window.location.hostname === "localhost") {
      const query = `
        [out:json];
        (
          way["waterway"](around:5000,${lat},${lon});
          way["natural"="water"](around:5000,${lat},${lon});
        );
        out center tags;
      `

      response = await fetch(apiUrl, {
        method: "POST",
        body: query,
      })
    } else {
      response = await fetch(
        `/api/waterbodies?lat=${lat}&lon=${lon}`
      )
    }

    if (!response.ok) {
      console.warn("Water body API failed")
      return []
    }

    const data = await response.json()

    console.log("Water Bodies Found:", data.elements?.length)

    return data.elements || []
  } catch (error) {
    console.error(error)
    return []
  }
}
