import { useState,useCallback,useEffect,useRef } from "react"

 const App = () => {
   
   const [length , setLength] = useState(8);
   const [numberAllow , setNumberAllow] = useState(false);
   const [charAllow , setCharAllow] = useState(false);
   const [password , setPassword] = useState("");

   const passwordRef = useRef(null);

   

   const passwordGenerator = useCallback(() =>{

    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllow) str += "0123456789";
    if(charAllow) str += "~!@#$%^&*(){}[]";

    for(let i = 1; i <= length; i++){
      let char = Math.floor(Math.random()* str.length +1)

      pass += str.charAt(char);
    }

    setPassword(pass)

   },[length,numberAllow,charAllow,setPassword])

   const copyPassword = useCallback(()=>{
    
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0,99);
      window.navigator.clipboard.writeText(password)

   },[password])


   useEffect(() =>{

    passwordGenerator();

   },[length,numberAllow,charAllow,passwordGenerator])

  return (
    <>
      <div className="bg-black text-white h-screen">
        <h1 className="text-center font-bold text-3xl py-6">Password Generator</h1>
        <div className="bg-gray-500 rounded-lg w-[500px] h-[200px] shadow-lg m-auto">
          <div className="flex items-center text-red-400 px-5 py-8">
            <input type="text" value={password} placeholder="Password" readOnly ref={passwordRef} className="w-full rounded-l-lg py-2 px-2 outline-none" />
            <button onClick={copyPassword} className="rounded-r-lg bg-blue-600 px-2 py-2 text-white font-semibold">Copy</button>
          </div>

          <div className="px-6 py-5">
            <div className="flex items-center gap-x-4">
              <div className="flex items-center gap-x-2">
                <input type="range" id ="inputLength" value={length} min={8} max={100}  onChange={(e)=>{setLength(e.target.value)}} className="w-20 cursor-pointer"/>
                <label htmlFor="inputLength">Length: {length}</label>
              </div>
              <div className="flex items-center gap-x-1">
                <input type="checkbox" id="numberInput" Checked={numberAllow} onChange={() => {setNumberAllow((prev) => !prev); }} className=" cursor-pointer"/>
                <label htmlFor="numberInput">Number</label>
              </div>
              <div className="flex items-center gap-x-1">
                <input type="checkbox" id="charInput"Checked={charAllow} onChange={()=>{setCharAllow((prev)=>!prev)}} className=" cursor-pointer"/>
                <label htmlFor="charInput">Char</label>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default App