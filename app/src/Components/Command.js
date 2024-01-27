import React from 'react';

const Command = ({ command, description, example }) => {
  return (
    <div className="mb-8 bg-gray-800 p-6 rounded-md shadow-md">
      <div className="text-2xl font-bold mb-4 text-white">{command}</div>
      <div className="console bg-black rounded-md overflow-hidden">
        <header className="bg-gray-700 p-2 text-white">
          <p>Example</p>
        </header>
        <div className="consolebody p-4">
          <p className="text-green-300">&gt; {example}</p>
          <p className="text-green-300">&gt;</p>
        </div>
      </div>
      <div className="text-gray-400 mt-4">{description}</div>
    </div>
  );
};

export default Command;
