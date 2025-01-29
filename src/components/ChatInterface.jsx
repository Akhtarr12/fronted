import { useState, useEffect } from "react"
import api from "../services/api"
import { useLanguage } from "../contexts/LanguageContext"
import { translations } from "../utils/translations"

const ChatInterface = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    fetchChatHistory()
  }, [])

  const fetchChatHistory = async () => {
    try {
      const response = await api.get("/chat/history")
      setMessages(response.data.reverse())
    } catch (error) {
      console.error("Error fetching chat history:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    try {
      const response = await api.post("/chat/send", { message: input, language })
      setMessages([...messages, { userMessage: input, botReply: response.data.botReply }])
      setInput("")
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-dark-blue">{t.chatWithAI}</h2>
      <div className="h-64 overflow-y-auto mb-4 bg-soft-gray p-4 rounded">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <p className="bg-mint-green p-2 rounded inline-block">You: {msg.userMessage}</p>
            <p className="bg-light-blue text-white p-2 rounded inline-block mt-1">AI: {msg.botReply}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border rounded-l bg-soft-gray"
          placeholder={t.typeMessage}
        />
        <button
          type="submit"
          className="bg-light-coral text-white px-4 py-2 rounded-r hover:bg-dark-coral transition duration-300"
        >
          {t.send}
        </button>
      </form>
    </div>
  )
}

export default ChatInterface

