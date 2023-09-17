import React from 'react';

const Banner = () => (
  <div className="relative">
    <img
      className="h-96 w-full object-cover"
      src="https://images.unsplash.com/photo-1568115286680-d203e08a8be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      alt="penthouse"
    />
    <h1 className="absolute top-1/4 left-2/4 -translate-x-2/4  text-6xl text-white leading-[70px] font-semibold text-center">
      Sell Buy And Rent <br />
      Your Property
    </h1>
  </div>
);

export default Banner;
