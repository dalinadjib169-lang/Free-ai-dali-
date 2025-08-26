import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const handleGenerate = async () => {
    if (!prompt) return;

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setResult(data.text || "فشل التوليد، تحقق من المفتاح أو الإعدادات.");
    } catch (err) {
      console.error(err);
      setResult("حدث خطأ أثناء الاتصال بالخادم.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p
