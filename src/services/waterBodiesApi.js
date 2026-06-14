export async function getNearbyWaterBodies(lat, lon) {
  try {
    const query = `
      [out:json];
      (
        way["waterway"](around:5000,${lat},${lon});
        way["natural"="water"](around:5000,${lat},${lon});
      );
      out center tags;
    `

    const response = await fetch(
      "https://lz4.overpass-api.de/api/interpreter",
      {
        method: "POST",
        body: query,
      }
    )

    if (!response.ok) {
      console.warn("Overpass API rate limit reached")
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
