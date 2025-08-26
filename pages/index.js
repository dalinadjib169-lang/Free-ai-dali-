import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleGenerate = async () => {
    if (!input) return;

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();
      setResult(data.text || "فشل التوليد، تحقق من الإعدادات.");
    } catch (err) {
      console.error(err);
      setResult("حدث خطأ أثناء الاتصال بالخادم.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-end p-6">
      <h1 className="text-3xl font-bold mb-6 w-full text-right">
        محفظة الأستاذ الشاملة
      </h1>

      <textarea
        className="w-full h-40 p-4 mb-4 text-black rounded-lg"
        placeholder="أدخل طلبك هنا..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleGenerate}
        className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded-2xl mb-4"
      >
        توليد
      </button>

      <textarea
        className="w-full h-60 p-4 text-black rounded-lg"
        placeholder="النص المولد سيظهر هنا..."
        value={result}
        readOnly
      />
    </div>
  );
}
