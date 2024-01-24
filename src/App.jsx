import { useEffect, useState, useRef, useCallback } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa'; // Import icons from a library like react-icons
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [CharacterAllowed, setCharacterAllowed] = useState(false);
  const [isCopying, setIsCopying] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const passwordGenerator = useCallback(() => {
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let pass = '';

    if (numberAllowed) {
      str += '1234567890';
    }

    if (CharacterAllowed) {
      str += '!@#$%^&*()_-+=[]{}|;:,.<>?';
    }

    for (let idx = 0; idx < length; idx++) {
      let index = Math.floor(Math.random() * str.length);
      pass += str[index];
    }

    setPassword(pass);
  }, [length, numberAllowed , CharacterAllowed, setPassword]);

  const passwordRef = useRef(null);

  const handleCopyClick = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setIsCopying(true);

    // Reset the copy effect after a short delay
    setTimeout(() => {
      setIsCopying(false);
    }, 3000);
  };

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, CharacterAllowed]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <div
      className={`absolute top-[5%] left-[50%] transform translate-x-[-50%] -translate-y-[-50%] w-[90vw] sm:w-[80vw] md:w-[60vw] lg:w-[40vw] p-8 rounded-lg shadow-md transition-all duration-300 ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
      } glass-effect`}
    >
      <div className='mb-4 flex flex-col sm:flex-row items-stretch sm:items-center'>
        <input
          type='text'
          value={password}
          placeholder='Password'
          readOnly
          className={`border-2 border-gray-300 p-2 w-full rounded text-black mb-2 sm:mb-0 sm:mr-2 transition-all duration-300 ${
            isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200'
          }`}
          ref={passwordRef}
        />
        <button
          onClick={handleCopyClick}
          className={`px-4 py-2 ${
            isCopying ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-700'
          } text-white rounded transition-all duration-300 ${
            isCopying ? 'transform scale-95' : ''
          }`}
        >
          {isCopying ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div className='mt-4'>
        <label htmlFor='passwordLength' className='block mb-2'>
          Length({length})
        </label>
        <input
          min={5}
          max={20}
          value={length}
          type='range'
          id='passwordLength'
          name='passwordLength'
          className={`w-full cursor-pointer transition-all duration-300 ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}
          onChange={(e) => {
            setLength(e.target.value);
          }}
        />

        <div className='mt-4 flex flex-col sm:flex-row items-start sm:items-center'>
          <div className='flex items-center mr-4'>
            <input
              type='checkbox'
              id='includeNumbers'
              name='includeNumbers'
              className='mr-2'
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor='includeNumbers'>Numbers</label>
          </div>

          <div className='flex items-center'>
            <input
              type='checkbox'
              id='includeCharacters'
              name='includeCharacters'
              className='mr-2'
              onChange={() => setCharacterAllowed((prev) => !prev)}
            />
            <label htmlFor='includeCharacters'>Characters</label>
          </div>
        </div>
      </div>

      <div className='flex justify-end mt-4'>
        <button
          className={`flex items-center px-3 py-1 text-sm ${
            isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
          } rounded transition-all duration-300`}
          onClick={toggleDarkMode}
        >
          {isDarkMode ? (
            <>
              <FaSun className='mr-1' /> Light Mode
            </>
          ) : (
            <>
              <FaMoon className='mr-1' /> Dark Mode
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default App;
