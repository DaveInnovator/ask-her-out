import { useState } from "react";

export default function CTAButtons({ onAccept, onMaybe, name }) {
  const [showYesInput, setShowYesInput] = useState(false);
  const [showNoInput, setShowNoInput] = useState(false);
  const [receiverPhone, setReceiverPhone] = useState("");
  const [loveQuote, setLoveQuote] = useState("");

  const handleYes = () => {
    setShowYesInput(true);
  };

  const handleNo = () => {
    setShowNoInput(true);
  };

  const confirmYes = () => {
    if (!receiverPhone) return;
    // Optional: Save it somewhere or send it off
    onAccept();
  };

  const confirmNo = () => {
    if (!loveQuote) return;
    onMaybe(); // You can pass loveQuote as a param if needed
  };

  return (
    <div className="space-y-4">
      {!showYesInput && !showNoInput && (
        <>
          <button
            onClick={handleYes}
            className="bg-green-500 text-white px-6 py-2 rounded-xl w-full hover:bg-green-600 transition"
          >
            Yes, let's do this! 💌
          </button>
          <button
            onClick={handleNo}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-xl w-full hover:bg-gray-400 transition"
          >
            No... but here's a note 💭
          </button>
        </>
      )}

      {showYesInput && (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">Drop your WhatsApp number so I can text you 😉</p>
          <input
            type="tel"
            placeholder="e.g. 2348012345678"
            value={receiverPhone}
            onChange={(e) => setReceiverPhone(e.target.value)}
            className="px-4 py-2 border rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            onClick={confirmYes}
            className="bg-pink-500 text-white px-6 py-2 rounded-xl w-full hover:bg-pink-600 transition"
          >
            Send me that text 💘
          </button>
        </div>
      )}

      {showNoInput && (
        <div className="space-y-3">
          <p className="text-sm text-gray-600">Drop a soft quote before you break their heart 😔</p>
          <textarea
            placeholder="e.g. You're sweet, but I'm not ready right now 💔"
            value={loveQuote}
            onChange={(e) => setLoveQuote(e.target.value)}
            className="px-4 py-2 border rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            onClick={confirmNo}
            className="bg-gray-700 text-white px-6 py-2 rounded-xl w-full hover:bg-gray-800 transition"
          >
            Leave the quote 💭
          </button>
        </div>
      )}
    </div>
  );
}
