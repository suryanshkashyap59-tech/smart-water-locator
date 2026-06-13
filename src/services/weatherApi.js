export async function getRainfall(lat, lon) {
  try {
    const response = await fetch(
      `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=2024-01-01&end_date=2024-12-31&daily=rain_sum`
    )

    const data = await response.json()

    if (!data.daily?.rain_sum) {
      return null
    }

    const totalRainfall =
      data.daily.rain_sum.reduce(
        (sum, value) => sum + (value || 0),
        0
      )

    return Math.round(totalRainfall)
  } catch (error) {
    console.error(error)
    return null
  }
}
