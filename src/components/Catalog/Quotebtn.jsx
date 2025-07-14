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
            <a href='/request-quote' title='Request a quote for our products'>
            <button
              
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black py-2 rounded-md transition-colors duration-300"
            >
                Request Quote
            </button>
            </a>

        </div>
    )
}

export default Quotebtn
