import React from 'react';
import atlantisImage from './atlantis.png';

export default function Content() {
  return (
    <div className="relative h-[90vh] w-full">
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
        <h1 className="text-white text-3xl md:text-5xl font-bold text-center px-4">
          Bem vindo ao site de gestão da Atlantis
        </h1>
      </div>
      <img
        src={atlantisImage}
        alt="Atlantis underwater city"
        className="object-top w-full h-full"
      />
    </div>
  );
}