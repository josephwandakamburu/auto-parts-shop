'use client';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';

export default function UploadPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert('Please select an image');

    // 1. Upload the image to Storage
    const fileName = `${Date.now()}_${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(fileName, file);

    if (uploadError) return alert('Upload error: ' + uploadError.message);

    // 2. Get the public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from('product-images').getPublicUrl(fileName);

    // 3. Save product details (including the image URL) to the database
    const { error: dbError } = await supabase
      .from('products')
      .insert([{ name, price: parseFloat(price), image_url: publicUrl }]);

    if (dbError) alert('Database error: ' + dbError.message);
    else alert('Product added with image!');
  };

  return (
    <div className="p-10 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Product with Image</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow border"
      >
        <input
          type="text"
          placeholder="Product Name"
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="number"
          placeholder="Price"
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Save Product
        </button>
      </form>
    </div>
  );
}
