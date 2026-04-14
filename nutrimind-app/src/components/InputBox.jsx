import React from 'react'

const InputBox = ({ value, onChange, quantity, onQuantityChange, placeholder = "Enter what you ate today..." }) => {
  const units = ["1 plate", "1/2 plate", "1 bowl", "100g", "200g", "1 piece", "1 serving"]

  return (
    <div className="flex flex-grow items-center">
      <input 
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-grow bg-transparent border-none focus:ring-0 px-8 py-5 text-lg text-on-surface placeholder:text-slate-500 font-medium outline-none"
        placeholder={placeholder}
      />
      <div className="h-10 w-px bg-white/10 mx-2 hidden md:block"></div>
      <select 
        value={quantity}
        onChange={(e) => onQuantityChange(e.target.value)}
        className="bg-transparent border-none focus:ring-0 px-4 py-5 text-sm font-bold text-secondary uppercase tracking-widest cursor-pointer outline-none appearance-none hover:text-primary transition-colors"
      >
        {units.map((unit) => (
          <option key={unit} value={unit} className="bg-surface text-on-surface uppercase">{unit}</option>
        ))}
      </select>
    </div>
  )
}

export default InputBox
