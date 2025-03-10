import { useCallback, useEffect, useRef, useState } from 'react';


function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumber] = useState(false);
  const [charAllowed, setAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef=useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "1234567890";
    }

    if (charAllowed) {
      str += "!@#$%&*";
    }
for(let i=1;i<=length;i++){
  let char=Math.floor(Math.random()*str.length)
  pass += str.charAt(char)
}

    setPassword(pass)
console.log(pass)

  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(()=>{

    passwordGenerator()

  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (

<div className='w-full max-w-md mx-auto shadow-lg rounded-xl px-6 py-8 my-8 bg-gradient-to-br from-gray-800 to-gray-900'>
  <h1 className='text-white text-center text-2xl font-bold mb-6'>Password Generator</h1>
  
  <div className="flex shadow-md rounded-lg overflow-hidden mb-6 border border-gray-700">
    <input
      type="text"
      value={password}
      className="outline-none w-full py-3 px-4 bg-gray-700 text-white"
      placeholder="Password"
      readOnly
      ref={passwordRef}
    />
    <button className='outline-none bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 transition-colors duration-200 font-medium'
    onClick={copyPassword}
    >
      copy
    </button>
  </div>
  
  <div className='flex flex-wrap text-sm gap-x-4 gap-y-3'>
    <div className='flex items-center gap-x-2'>
      <input
        type="range"
        min={6}
        max={100}
        value={length}
        className='cursor-pointer w-32 accent-blue-600'
        onChange={(e) => {setLength(parseInt(e.target.value))}}
      />
      <label className="text-white">Length: {length}</label>
    </div>
    
    <div className="flex items-center gap-x-2">
      <input
        type="checkbox"
        checked={numberAllowed}

        id="numberInput"
        className="w-4 h-4 accent-blue-600 rounded"
        onChange={()=>{setNumber((prev)=>!prev)}}
      />
      <label htmlFor="numberInput" className="text-white">Numbers</label>
    </div>
    
    <div className="flex items-center gap-x-2">
      <input
        type="checkbox"
        checked={charAllowed}
        id="characterInput"
        className="w-4 h-4 accent-blue-600 rounded"
        onChange={()=>{setAllowed((prev)=>!prev)}}
      />
      <label htmlFor="characterInput" className="text-white">Characters</label>
    </div>
  </div>
</div>

  );
}

export default App;
