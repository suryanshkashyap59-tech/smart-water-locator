import { useState } from 'react'
import LandingPage from './components/landing/LandingPage'
import AssessmentPage from './components/assessment/AssessmentPage'
import DashboardPage from './components/dashboard/DashboardPage'
import Navbar from './components/shared/Navbar'

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const [assessmentResult, setAssessmentResult] = useState(null)
  const [assessmentData, setAssessmentData] = useState(null)

  const handleStartAssessment = () => setCurrentPage('assessment')
  const handleBackToLanding = () => setCurrentPage('landing')
  const handleBackToAssessment = () => setCurrentPage('assessment')

  const handleAssessmentComplete = (result, formData) => {
    setAssessmentResult(result)
    setAssessmentData(formData)
    setCurrentPage('dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onStartAssessment={handleStartAssessment}
      />
      {currentPage === 'landing' && (
        <LandingPage onStartAssessment={handleStartAssessment} />
      )}
      {currentPage === 'assessment' && (
        <AssessmentPage
          onComplete={handleAssessmentComplete}
          onBack={handleBackToLanding}
        />
      )}
      {currentPage === 'dashboard' && assessmentResult && (
        <DashboardPage
          result={assessmentResult}
          formData={assessmentData}
          onNewAssessment={() => setCurrentPage('assessment')}
          onBack={handleBackToAssessment}
        />
      )}
    </div>
  )
}
