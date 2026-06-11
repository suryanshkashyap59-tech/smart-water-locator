import { motion } from 'framer-motion'
import { Droplets, MapPin, BarChart3 } from 'lucide-react'

export default function LandingPage({ onStartAssessment }) {
  return (
    <div>
      <section>
        <div>
          <div>
            <Droplets size={32} />
            <h2>Smart Water Locator</h2>
            <p>AI Groundwater Intelligence</p>
          </div>

          <h1>Discover Groundwater Before You Dig</h1>

          <p>
            Reduce failed borewells and drilling costs using AI-powered groundwater assessment.
          </p>

          <button onClick={onStartAssessment}>
            Start Assessment
          </button>
        </div>

        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21"
          alt="Groundwater"
          style={{
            width: '400px',
            height: '250px',
            objectFit: 'cover'
          }}
        />
      </section>

      <section>
        <div>
          <MapPin />
          <h3>Location Intelligence</h3>
        </div>

        <div>
          <Droplets />
          <h3>Water Potential Score</h3>
        </div>

        <div>
          <BarChart3 />
          <h3>Actionable Insights</h3>
        </div>
      </section>
    </div>
  )
}
