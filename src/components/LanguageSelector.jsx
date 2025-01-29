import { useLanguage } from "../contexts/LanguageContext"

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage()

  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="p-2 border rounded bg-white text-dark-blue"
    >
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
    </select>
  )
}

export default LanguageSelector

