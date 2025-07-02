import React from 'react'
import { useNavigate } from 'react-router-dom';

const Quotebtn = () => {
     const navigate = useNavigate();

    const handleRequestQuote = (itemId) => {
     navigate("/request-quote", { state: { itemId } });
    console.log(`Requesting quote for item ${itemId}`);
  };  
    return (
        <div>
            {/* Button */}
            <button
                onClick={() => handleRequestQuote()}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-md transition-colors duration-300"
            >
                Request Quote
            </button>

        </div>
    )
}

export default Quotebtn
