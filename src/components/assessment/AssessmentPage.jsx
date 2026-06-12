import { useState } from 'react'
export default function AssessmentPage({ onComplete, onBack }) {
  const [formData, setFormData] = useState({
    location: '',
    soilType: 'Loamy',
    rainfall: '',
    riverDistance: '',
    vegetation: 'Medium',
    borewells: 'No'
  })

  const handleSubmit = () => {
    let score = 50

    if (Number(formData.rainfall) > 1000) score += 15
    if (formData.soilType === 'Loamy') score += 10
    if (formData.vegetation === 'High') score += 10
    if (Number(formData.riverDistance) < 2) score += 15
    if (formData.borewells === 'Yes') score += 10

    if (score > 100) score = 100

    onComplete(
      {
        score,
        recommendation:
          score >= 80
            ? 'High Groundwater Potential'
            : score >= 60
            ? 'Moderate Groundwater Potential'
            : 'Low Groundwater Potential'
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
          placeholder="Annual Rainfall (mm)"
          type="number"
          value={formData.rainfall}
          onChange={(e) =>
            setFormData({
              ...formData,
              rainfall: e.target.value
            })
          }
        />

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
            className="px-6 py-3 bg-cyan-500 text-black rounded font-bold"
          >
            Analyze Groundwater
          </button>
        </div>

      </div>
    </div>
  )
}
