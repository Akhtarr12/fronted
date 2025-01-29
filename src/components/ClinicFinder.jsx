import { useState } from "react"
import api from "../services/api"
import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../utils/translations"

const ClinicFinder = () => {
  const [clinics, setClinics] = useState([])
  const [location, setLocation] = useState({ lat: "", lng: "" })
  const [radius, setRadius] = useState(5000)
  const { language } = useLanguage()
  const t = translations[language]

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await api.get(
        `/clinics/nearby?lat=${location.lat}&lng=${location.lng}&radius=${radius}&language=${language}`,
      )
      setClinics(response.data)
    } catch (error) {
      console.error("Error finding clinics:", error)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-dark-blue">{t.findClinics}</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex mb-2">
          <input
            type="text"
            value={location.lat}
            onChange={(e) => setLocation({ ...location, lat: e.target.value })}
            placeholder={t.latitude}
            className="flex-grow p-2 border rounded-l bg-soft-gray"
          />
          <input
            type="text"
            value={location.lng}
            onChange={(e) => setLocation({ ...location, lng: e.target.value })}
            placeholder={t.longitude}
            className="flex-grow p-2 border bg-soft-gray"
          />
          <input
            type="number"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            placeholder={t.radius}
            className="flex-grow p-2 border rounded-r bg-soft-gray"
          />
        </div>
        <button
          type="submit"
          className="bg-light-coral text-white px-4 py-2 rounded hover:bg-dark-coral transition duration-300 w-full"
        >
          {t.findClinicsButton}
        </button>
      </form>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-2 text-dark-blue">{t.nearbyDermaClinics}</h3>
        {clinics.map((clinic, index) => (
          <div key={index} className="mb-2 p-2 bg-soft-blue rounded">
            <p className="font-bold text-dark-blue">{clinic.name}</p>
            <p>
              {t.rating}: {clinic.rating}
            </p>
            <p>{clinic.address}</p>
            <p>{clinic.phone}</p>
            {clinic.website && (
              <p>
                <a
                  href={clinic.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light-blue hover:text-dark-blue transition duration-300"
                >
                  {t.website}
                </a>
              </p>
            )}
            {clinic.openingHours && (
              <details>
                <summary className="cursor-pointer text-light-blue hover:text-dark-blue transition duration-300">
                  {t.openingHours}
                </summary>
                <ul className="pl-4">
                  {clinic.openingHours.map((hours, i) => (
                    <li key={i}>{hours}</li>
                  ))}
                </ul>
              </details>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ClinicFinder

