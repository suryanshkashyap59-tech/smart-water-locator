export async function getCoordinates(place) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        place
      )}&format=json&limit=1`
    )

    const data = await response.json()

    if (!data.length) {
  const fallback = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      place.split(',').slice(-2).join(',')
    )}&format=json&limit=1`
  )

  const fallbackData = await fallback.json()

  if (!fallbackData.length) {
    throw new Error('Location not found')
  }

  return {
    lat: parseFloat(fallbackData[0].lat),
    lon: parseFloat(fallbackData[0].lon),
    displayName: fallbackData[0].display_name
  }
}

    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
      displayName: data[0].display_name
    }
  } catch (error) {
    console.error(error)
    return null
  }
}
