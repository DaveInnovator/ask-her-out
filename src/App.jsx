import { useState, useEffect } from "react";
import Header from "./components/Header";
import Message from "./components/Message";
import CTAButtons from "./components/CTAButtons";
import ResultDisplay from "./components/ResultDisplay";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import Footer from "./components/footer";

export default function App() {
  const [copied, setCopied] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);
  const role = queryParams.get("role") || "sender";
  const receiverParamName = queryParams.get("name") || "";

  const [crushName, setCrushName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [receiverPhone, setReceiverPhone] = useState("");
  const [quote, setQuote] = useState("");
  const [accepted, setAccepted] = useState(null);
  const [step, setStep] = useState("name");
  const [audio, setAudio] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const bgAudio = new Audio("/lofi.mp3");
    bgAudio.loop = true;
    bgAudio.volume = 0.4;
    setAudio(bgAudio);

    const playAudio = () => {
      bgAudio.play().catch((err) => {
        console.warn("Autoplay failed:", err);
      });
    };

    document.addEventListener("click", playAudio, { once: true });

    return () => {
      bgAudio.pause();
      document.removeEventListener("click", playAudio);
    };
  }, []);

  const toggleMute = () => {
    if (audio) {
      audio.muted = !audio.muted;
      setIsMuted(audio.muted);
    }
  };

  useEffect(() => {
    if (role === "receiver") {
      setCrushName(receiverParamName);
      setStep("cta");
    } else {
      const savedName = localStorage.getItem("crushName");
      const savedPhone = localStorage.getItem("senderPhone");
      const savedStep = localStorage.getItem("step");

      if (savedName) setCrushName(savedName);
      if (savedPhone) setSenderPhone(savedPhone);
      if (savedStep) setStep(savedStep);
    }
  }, [role, receiverParamName]);

  const handleSetName = (name) => {
    setCrushName(name);
    localStorage.setItem("crushName", name);
    setStep("phone");
    localStorage.setItem("step", "phone");
  };

  const handleSetPhone = () => {
    if (!senderPhone.trim()) return;
    localStorage.setItem("senderPhone", senderPhone);
    setStep("cta");
    localStorage.setItem("step", "cta");
  };

  const sanitizePhone = (phone) => {
    const digits = phone.replace(/\D/g, "");
    if (digits.startsWith("0")) {
      return "234" + digits.slice(1);
    }
    if (digits.startsWith("234")) return digits;
    return "234" + digits;
  };

  const handleAccept = () => {
    setAccepted(true);
    setStep("result");
    localStorage.setItem("step", "result");
    setTimeout(() => {
      const cleanNumber = sanitizePhone(senderPhone);
      window.location.href = `https://wa.me/${cleanNumber}?text=Hey%20👋%20I%20saw%20your%20web%20app...%20Let%E2%80%99s%20be%20together%20%20mylove💘`;
    }, 3000);
  };

  const handleMaybe = () => {
    if (!receiverPhone.trim()) return;

    const cleanNumber = sanitizePhone(senderPhone || receiverPhone);
    const message = encodeURIComponent(
      quote.trim() || "Sorry, you're amazing but I’m not ready for love right now 💔"
    );

    setAccepted(false);
    setStep("result");
    localStorage.setItem("step", "result");

    setTimeout(() => {
      window.location.href = `https://wa.me/${cleanNumber}?text=${message}`;
    }, 3000);
  };

  const resetFlow = () => {
    setCrushName("");
    setSenderPhone("");
    setReceiverPhone("");
    setQuote("");
    setAccepted(null);
    setStep("name");
    localStorage.clear();
  };

  return (
    <>
      <main className="min-h-screen w-full bg-gradient-to-b from-rose-100 via-pink-200 to-rose-300 flex items-center justify-center p-4 overflow-hidden relative">
        {accepted && <Confetti />}

        <motion.button
          onClick={toggleMute}
          className="absolute top-6 right-6 bg-white border-4 border-pink-300 shadow-2xl rounded-full p-5 hover:scale-110 transition-all duration-300 z-50"
          title={isMuted ? "Unmute the Love" : "Pause the Love"}
          whileTap={{ scale: 0.95 }}
          animate={{
            rotate: [0, -5, 5, -5, 0],
            scale: [1, 1.1, 1],
            boxShadow: [
              "0 0 0px pink",
              "0 0 20px pink",
              "0 0 30px hotpink",
              "0 0 20px pink",
              "0 0 0px pink",
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
          }}
        >
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="hotpink" viewBox="0 0 24 24" className="w-10 h-10">
              <path d="M10 9v6H8V9h2zm4 0v6h-2V9h2z" />
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.22 2.44C11.09 5.01 12.76 4 14.5 4 17 4 19 6 19 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="hotpink" viewBox="0 0 24 24" className="w-10 h-10">
              <path d="M8 5v14l11-7L8 5z" />
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.22 2.44C11.09 5.01 12.76 4 14.5 4 17 4 19 6 19 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center z-10"
        >
          {role === "sender" && step === "name" && (
            <Header name={crushName} onSubmit={handleSetName} />
          )}

          {role === "sender" && step === "phone" && (
            <>
              <Header name={crushName} onSubmit={handleSetName} />
              <div className="mt-4">
                <input
                  type="tel"
                  placeholder="Your WhatsApp Number"
                  value={senderPhone}
                  onChange={(e) => setSenderPhone(e.target.value)}
                  className="px-4 py-2 border rounded-xl w-full"
                />
                <button
                  onClick={handleSetPhone}
                  className="mt-4 bg-pink-500 text-white px-6 py-2 rounded-xl hover:bg-pink-600 transition-all"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {step === "cta" && (
            <>
              <Header name={crushName} onSubmit={handleSetName} />
              <Message name={crushName} />
              <CTAButtons onAccept={handleAccept} onMaybe={() => setStep("result")} />
              {role === "sender" && (
                <div className="mt-6 text-sm text-gray-500">
                  Share this link with your crush:
                  <br />
                  <div className="flex flex-col items-start gap-2 mt-1 w-full">
  <div className="flex items-center gap-2 flex-wrap">
    <span
      className="font-mono bg-gray-100 p-1 rounded break-all inline-block"
    >
      {`${window.location.origin}?role=receiver&name=${encodeURIComponent(
        crushName
      )}`}
    </span>
    <button
      onClick={() => {
        const link = `${window.location.origin}?role=receiver&name=${encodeURIComponent(
          crushName
        )}`;
        navigator.clipboard.writeText(link).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000); // reset after 2 sec
        });
      }}
      className="bg-pink-500 text-white px-3 py-1 rounded hover:bg-pink-600 transition-all text-sm"
    >
      Copy
    </button>
  </div>

  {copied && (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.3 }}
      className="text-green-600 text-sm mt-1"
    >
      ✅ Copied!
    </motion.div>
  )}
</div>

                </div>
              )}
            </>
          )}

          {step === "result" && (
            <>
              <Header name={crushName} onSubmit={handleSetName} />
              {accepted ? (
                <p className="text-green-600 font-semibold mt-4">
                  Redirecting to WhatsApp...
                </p>
              ) : (
                <div className="mt-4 space-y-4">
                  <input
                    type="tel"
                    placeholder="Drop sender's number"
                    value={receiverPhone}
                    onChange={(e) => setReceiverPhone(e.target.value)}
                    className="px-4 py-2 border rounded-xl w-full"
                  />
                  <textarea
                    placeholder="Leave a kind message 💌"
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    className="px-4 py-2 border rounded-xl w-full"
                  />
                  <button
                    onClick={handleMaybe}
                    className="mt-2 bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition-all"
                  >
                    Send Response
                  </button>
                </div>
              )}
              <ResultDisplay
                accepted={accepted}
                name={crushName}
                quote={quote}
                receiverPhone={receiverPhone}
              />
            </>
          )}

          {role === "sender" && step !== "name" && (
            <button
              onClick={resetFlow}
              className="mt-6 text-sm text-pink-600 underline"
            >
              ⬅️ Back
            </button>
          )}
        </motion.div>

        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-400 text-2xl animate-pulse"
              style={{
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                animationDuration: `${Math.random() * 5 + 5}s`,
              }}
              animate={{ y: [0, -100], opacity: [1, 0] }}
              transition={{
                repeat: Infinity,
                duration: Math.random() * 10 + 5,
              }}
            >
              ❤️
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}
