import { getNearbyWaterBodies } from "../../services/waterBodiesApi"
import { useState } from 'react'
import { getCoordinates } from "../../services/geocoding"
import { getRainfall } from "../../services/weatherApi"
import { getElevation } from "../../services/elevationApi"

export default function AssessmentPage({ onComplete, onBack }) {
  const [formData, setFormData] = useState({
    location: '',
    soilType: 'Loamy',
    vegetation: 'Medium',
    borewells: 'No'
  })

  const [loading, setLoading] = useState(false)




const handleSubmit = async () => {
  setLoading(true)



let rainfallScore = 0

  const coordinates = await getCoordinates(formData.location)
  console.log(coordinates)
console.log("COORDINATES RESULT:", coordinates)


  if (!coordinates) {
    alert("Location not found. Please enter a valid place.")
    return
  }


console.log("AFTER RAINFALL API")

  const rainfallFromApi = await getRainfall(
    coordinates.lat,
    coordinates.lon
  )

  console.log("Rainfall:", rainfallFromApi)

  const elevation = await getElevation(
    coordinates.lat,
    coordinates.lon
  )

  console.log("Elevation:", elevation)

  const waterBodies = await getNearbyWaterBodies(
    coordinates.lat,
    coordinates.lon
  )

  console.log(waterBodies.map(w => w.tags?.name || "Unnamed"))




  const rainfall = rainfallFromApi || 0



let soilScore = 0
let vegetationScore = 0
let riverScore = 0
let borewellScore = 0
let elevationScore = 0


// Rainfall (25 points)
if (rainfall > 1500) rainfallScore = 30
else if (rainfall > 1000) rainfallScore = 25
else if (rainfall > 500) rainfallScore = 15
else rainfallScore = 5


if (formData.soilType == 'Loamy') soilScore = 25
else if (formData.soilType == 'Clay') soilScore = 20
else if (formData.soilType == 'Sandy') soilScore = 10
else soilScore = 5

if (formData.vegetation == 'High') vegetationScore = 15
else if (formData.vegetation == 'Medium') vegetationScore = 10
else vegetationScore = 5


if (waterBodies.length > 20) riverScore = 5
else if (waterBodies.length > 10) riverScore = 3
else riverScore = 1


// Elevation (20 points)
if (elevation < 200) elevationScore = 20
else if (elevation < 500) elevationScore = 10
else elevationScore = 5
if (formData.borewells == 'Yes') borewellScore = 5
else borewellScore = 2


// Existing Borewells (15 points)


const score =
rainfallScore +
soilScore +
vegetationScore +
riverScore +
borewellScore
+ elevationScore


const successProbability = Math.min(
95,
Math.round(score * 0.9)


)

let recommendation = ''

if (score >= 80) {
recommendation =
'Excellent groundwater potential. Borewell drilling is strongly recommended.'
} else if (score >= 60) {
recommendation =
'Moderate groundwater potential. Site survey is recommended before drilling.'
} else {
recommendation =
'Low groundwater potential. Consider alternate water sources or a hydrogeological survey.'
}


  setLoading(false)


const history = JSON.parse(
localStorage.getItem("assessmentHistory") || "[]"
)


const filteredHistory = history.filter(
  item => item.location !== formData.location
)

filteredHistory.unshift({
location: formData.location,
score,
rainfall: rainfallFromApi,
date: new Date().toLocaleDateString()
})

localStorage.setItem(
"assessmentHistory",
JSON.stringify(filteredHistory.slice(0,10))
)

onComplete(
{
score,
successProbability,
recommendation,
coordinates,
rainfall: rainfallFromApi,
elevation,
rainfallScore,
soilScore,
vegetationScore,
elevationScore,
riverScore,
borewellScore,

waterBodies,



},
formData
)
}

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Groundwater Assessment
      </h1>

      <div className="space-y-4">

        <input
          className="w-full p-4 rounded-xl bg-white text-black placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Location"
          value={formData.location}
          onChange={(e) =>
            setFormData({
              ...formData,
              location: e.target.value
            })
          }
        />

        <select
          className="w-full p-4 rounded-xl bg-white text-black placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          value={formData.soilType}
          onChange={(e) =>
            setFormData({
              ...formData,
              soilType: e.target.value
            })
          }
        >
          <option>Loamy</option>
          <option>Clay</option>
          <option>Sandy</option>
          <option>Rocky</option>
        </select>



        <select
          className="w-full p-4 rounded-xl bg-white text-black placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          value={formData.vegetation}
          onChange={(e) =>
            setFormData({
              ...formData,
              vegetation: e.target.value
            })
          }
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <select
          className="w-full p-4 rounded-xl bg-white text-black placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          value={formData.borewells}
          onChange={(e) =>
            setFormData({
              ...formData,
              borewells: e.target.value
            })
          }
        >
          <option>No</option>
          <option>Yes</option>
        </select>

        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="px-6 py-3 bg-gray-500 text-white rounded"
          >
            Back
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "📍 Finding Location • 🌧 Fetching Rainfall • ⛰ Checking Elevation" : "Analyze Groundwater"}




          </button>
        </div>

      </div>
    </div>
  )
}
