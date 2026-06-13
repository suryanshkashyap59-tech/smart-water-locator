export async function getElevation(lat, lon) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/elevation?latitude=${lat}&longitude=${lon}`
    )

    const data = await response.json()

    return data.elevation?.[0] || 0
  } catch (error) {
    console.error(error)
    return 0
  }
}
