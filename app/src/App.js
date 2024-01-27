import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import Command from './Components/Command';
import Footer from './Components/Footer';

function App() {
  const [commands, setCommands] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/linux-commands')
      .then(response => response.json())
      .then(data => setCommands(data));
  }, []);

  const filteredCommands = commands.filter(command =>
    command.command.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8 flex flex-col items-center">
      <Header />
      <input
        type="text"
        placeholder="Search commands..."
        className="bg-gray-800 text-white p-2 rounded-md mb-8"
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div className="w-full max-w-screen-md">
        {filteredCommands.map((command, index) => (
          <Command
            key={index}
            command={command.command}
            description={command.description}
            example={command.example}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;

