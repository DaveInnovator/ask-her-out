import { useState, useEffect } from "react";

export default function Header({ name, onSubmit }) {
  const [inputName, setInputName] = useState("");

  useEffect(() => {
    if (name) {
      setInputName(name);
    }
  }, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputName.trim()) {
      onSubmit(inputName.trim());
    }
  };

  return (
    <div className="mb-6">
      {!name ? (
        <>
          <h1 className="text-2xl font-bold mb-2 text-pink-600">
            Who’s this love letter for? 💌
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
            <input
              type="text"
              placeholder="Enter their name"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              className="px-4 py-2 border rounded-xl focus:outline-none w-full"
            />
            <button
              type="submit"
              className="bg-pink-500 text-white px-6 py-2 rounded-xl hover:bg-pink-600 transition-all"
            >
              Set Name
            </button>
          </form>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-pink-600">
            To {name}, with 💘
          </h1>
          <button
            onClick={() => onSubmit("")}
            className="mt-2 text-sm text-pink-400 underline"
          >
            ✏️ Change Name
          </button>
        </>
      )}
    </div>
  );
}
