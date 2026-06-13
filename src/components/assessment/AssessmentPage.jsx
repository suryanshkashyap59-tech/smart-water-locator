import { useState } from 'react'
import { getCoordinates } from "../../services/geocoding"
import { getRainfall } from "../../services/weatherApi"
export default function AssessmentPage({ onComplete, onBack }) {
  const [formData, setFormData] = useState({
    location: '',
    soilType: 'Loamy',
    riverDistance: '',
    vegetation: 'Medium',
    borewells: 'No'
  })

  const [loading, setLoading] = useState(false)




const handleSubmit = async () => {
const riverDistance = Number(formData.riverDistance)
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

  const rainfall = rainfallFromApi || 0



let soilScore = 0
let vegetationScore = 0
let riverScore = 0
let borewellScore = 0

// Rainfall (25 points)
if (rainfall > 1500) rainfallScore = 25
else if (rainfall > 1000) rainfallScore = 20
else if (rainfall > 500) rainfallScore = 10
else rainfallScore = 5

// Soil (20 points)
if (formData.soilType === 'Loamy') soilScore = 20
else if (formData.soilType === 'Clay') soilScore = 15
else if (formData.soilType === 'Sandy') soilScore = 8
else soilScore = 3

// Vegetation (20 points)
if (formData.vegetation === 'High') vegetationScore = 20
else if (formData.vegetation === 'Medium') vegetationScore = 10
else vegetationScore = 5

// River Distance (20 points)
if (riverDistance < 1) riverScore = 20
else if (riverDistance < 5) riverScore = 10
else riverScore = 3

// Existing Borewells (15 points)
if (formData.borewells === 'Yes') borewellScore = 15
else borewellScore = 5

const score =
rainfallScore +
soilScore +
vegetationScore +
riverScore +
borewellScore

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

onComplete(
{
score,
successProbability,
recommendation,
coordinates,
rainfall: rainfallFromApi,

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


        <input
          className="w-full p-4 rounded-xl bg-white text-black placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          placeholder="Distance from River (km)"
          type="number"
          value={formData.riverDistance}
          onChange={(e) =>
            setFormData({
              ...formData,
              riverDistance: e.target.value
            })
          }
        />

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
            {loading ? "Analyzing..." : "Analyze Groundwater"}



          </button>
        </div>

      </div>
    </div>
  )
}
