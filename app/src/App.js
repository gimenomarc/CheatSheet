import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import Command from './Components/Command';
import Footer from './Components/Footer';

function App() {
  const [linuxCommands, setLinuxCommands] = useState([]);
  const [windowsCommands, setWindowsCommands] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCommands, setVisibleCommands] = useState(20);

  useEffect(() => {
    fetch('http://localhost:3000/linux-commands')
      .then(response => response.json())
      .then(data => setLinuxCommands(data));

    fetch('http://localhost:3000/windows-commands')
      .then(response => response.json())
      .then(data => setWindowsCommands(data));
  }, []);

  const filteredLinuxCommands = linuxCommands
    .filter(command => command.command.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, visibleCommands);

  const filteredWindowsCommands = windowsCommands
    .filter(command => command.command.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, visibleCommands);

  const handleLoadMore = () => {

    setVisibleCommands(prevVisibleCommands => prevVisibleCommands + 20);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8 flex flex-col items-center">
      <Header />
      <input
        type="text"
        placeholder="Search commands..."
        className="bg-gray-800 text-white p-2 rounded-md mb-8"
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div className="flex">
        <div className="mr-4">
          <h2 className="text-xl font-bold mb-4 text-white">Linux Commands</h2>
          {filteredLinuxCommands.map((command, index) => (
            <Command
              key={index}
              command={command.command}
              description={command.description}
              example={command.example}
            />
          ))}
        </div>
        <div className="">
          <h2 className="text-xl font-bold mb-4 text-white">Windows Commands</h2>
          {filteredWindowsCommands.map((command, index) => (
            <Command
              key={index}
              command={command.command}
              description={command.description}
              example={command.example}
            />
          ))}
        </div>
      </div>
      {visibleCommands < linuxCommands.length && (
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={handleLoadMore}>
          More
        </button>
      )}
      <Footer />
    </div>
  );
}

export default App;

