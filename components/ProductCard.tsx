// components/ProductCard.tsx
import React from 'react';

interface ProductProps {
  name: string;
  description: string;
  price: string;
  image: string;
  onAdd: () => void;
}

export default function ProductCard({
  name,
  description,
  price,
  image,
  onAdd,
}: ProductProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-blue-900">{price}</span>
          <button
            onClick={onAdd}
            className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
