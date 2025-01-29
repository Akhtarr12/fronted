import { useState } from "react"
import api from "../services/api"
import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../utils/translations"

const ImageUpload = () => {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const { language } = useLanguage()
  const t = translations[language]

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) return

    const formData = new FormData()
    formData.append("image", file)

    try {
      const response = await api.post("/images/analyze", formData)
      setResult(response.data)
    } catch (error) {
      console.error("Error uploading image:", error)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-dark-blue">{t.imageAnalysis}</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input type="file" onChange={handleFileChange} className="mb-2 p-2 border rounded w-full bg-soft-gray" />
        <button
          type="submit"
          className="bg-light-coral text-white px-4 py-2 rounded hover:bg-dark-coral transition duration-300"
        >
          {t.analyzeImage}
        </button>
      </form>
      {result && (
        <div className="mt-4 bg-soft-blue p-4 rounded">
          <h3 className="text-xl font-semibold mb-2">{t.analysisResult}</h3>
          <p>
            {t.prediction}: {result.result}
          </p>
          <p>
            {t.confidence}: {result.confidence * 100}%
          </p>
        </div>
      )}
    </div>
  )
}

export default ImageUpload

