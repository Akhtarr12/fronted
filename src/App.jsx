import ImageUpload from "./components/ImageUpload"
import ChatInterface from "./components/ChatInterface"
import ClinicFinder from "./components/ClinicFinder"
import LanguageSelector from "./components/LanguageSelector"
import { LanguageProvider } from "./contexts/LanguageContext"
import { useLanguage } from "./contexts/LanguageContext"
import { translations } from "./utils/translations"
import './index.css';


function AppContent() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-light-blue p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-4xl font-bold text-white">{t?.title || "Default Title"}</h1>

          <LanguageSelector />
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ImageUpload />
          <ChatInterface />
        </div>
        <div className="mt-8">
          <ClinicFinder />
        </div>
      </main>
      <footer className="bg-navy-blue text-light-gray p-4 mt-8">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2023 Derma AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

export default App

