export async function getNearbyWaterBodies(lat, lon) {
  try {
    const response = await fetch(
      `/api/waterbodies?lat=${lat}&lon=${lon}`
    )

    if (!response.ok) {
      console.warn("Water body service unavailable")
      return []
    }

    const data = await response.json()

    return data.elements || []
  } catch (error) {
    console.error(error)
    return []
  }
}
