import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MyNavbar } from "./components/ui/navbar"
import React, { useState } from "react"


function App() {

  const [input,setInput]=useState("")
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch (err) {
    console.error("Copy failed:", err);
  }
};

  const callGemini = async () => {
    const apiKey = "AIzaSyA8gG1AaPzhECQKuQ5qbc71XRcKTAvunKU";
    setLoading(true)
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-pro:generateContent?key=AIzaSyCfHYsMBn89u0k_vxafsvbDtbBIa4EGx_U`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: `You are an AI prompt engineer.

Your task is to take a vague or short idea given by the user and turn it into a clear, specific, and high-quality prompt that can be used with an AI assistant or image generator.

Follow these rules:
- Be precise and detailed in under 50-60 words.
- Expand the idea with relevant context.
- Focus on the user’s intent (e.g., question, image generation, explanation).
- Format the output as a single prompt, not a conversation or multiple choices.
               user want the best prompt for ${input}}`}],
              },
            ],
          }),
        }
      )

      const data = await res.json()
      console.log(data)

      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response"
      setResponse(generatedText)
    } catch (err) {
      console.error("Error:", err)
    }finally {
    setLoading(false);
  }
  }

  return (
    <div className="h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center bg-[url('/Hersheys.jpg')]">
      
      <MyNavbar/>
      <div className="flex flex-col items-center gap-6">
        <div className=" text-6xl mb-9 font-semibold mb-2 text-center italic text-[#d4d4d4]">
          # Prompt. Process. Produce
        </div>

        <div className="text-[#d4d4d8] text-4xl font-semibold mb-2 text-center italic">
          Enter thought for best Prompt .....
        </div>

        <div className="flex flex-row items-center gap-8">
          <Input
            type="text"
            placeholder="Enter Something"
            className="text-white text-xl font-semibold tracking-wider placeholder:text-xl shadow-md bg-neutral-800 border border-neutral-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 h-[60px] w-[80vh]"
            id="box"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            variant=""
            className="w-[120px] h-[60px] px-6 text-lg rounded-xl"
            onClick={callGemini}
         >
            Enter
          </Button>

    {loading ? (
  <div className="mt-8 flex items-center justify-center text-white text-lg animate-pulse">
    <svg className="animate-spin h-6 w-6 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
    </svg>
    Generating prompt...
  </div>
) : response && (
  <div className="relative w-full max-w-3xl">
    {/* Copy Button */}
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 px-7 py-3 text-sm bg-white/10 text-white border border-white/20 rounded-md hover:bg-white/20 transition-all backdrop-blur-md"
    >
      {copied ? "Copied!" : "Copy"}
    </button>

    {/* Response Box */}
    <div className="bg-gradient-to-br from-neutral-800 via-neutral-900 to-black border border-white/10 shadow-xl text-white p-6 mt-8 rounded-3xl text-base leading-relaxed tracking-wide space-y-4 transition-all duration-300 ">
      {response}
    </div>
  </div>
)}

    

        </div>
      </div>
    </div>
  )
}

export default App
