// app/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    async function fetchProducts() {
      let query = supabase.from('products').select('*');
      if (filter !== 'All') query = query.eq('category', filter);
      const { data } = await query;
      if (data) setProducts(data);
    }
    fetchProducts();
  }, [filter]);

  const addToCart = (product: any) => {
    setCart([...cart, product]);
  };

  const placeOrder = async () => {
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const phoneInput = document.getElementById('phone') as HTMLInputElement;

    if (!nameInput.value || !phoneInput.value) {
      alert('Please enter your name and phone number.');
      return;
    }

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const { error } = await supabase
      .from('orders')
      .insert([
        {
          customer_name: nameInput.value,
          phone_number: phoneInput.value,
          total_amount: total,
          cart_items: cart,
        },
      ]);

    if (error) alert('Error placing order: ' + error.message);
    else {
      alert('Order placed successfully!');
      setCart([]);
      nameInput.value = '';
      phoneInput.value = '';
    }
  };

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Auto Parts Catalog</h1>
        <div className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold">
          Cart ({cart.length})
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        {['All', 'Tyre', 'Oil', 'Rim'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full font-medium transition-colors ${
              filter === cat ? 'bg-blue-600 text-white' : 'bg-white border'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {products.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <ProductCard
                  name={product.name}
                  description={product.category}
                  price={`KSh ${product.price.toLocaleString()}`}
                  image={product.image_url}
                  onAdd={() => addToCart(product)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg border h-fit sticky top-10">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500 italic">Your cart is empty.</p>
          ) : (
            <>
              <ul className="space-y-2 mb-4 text-sm">
                {cart.map((item, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{item.name}</span>
                    <span className="font-bold">
                      KSh {item.price.toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
              <input
                id="name"
                placeholder="Your Name"
                className="w-full p-2 mb-2 border rounded"
              />
              <input
                id="phone"
                placeholder="Phone Number"
                className="w-full p-2 mb-4 border rounded"
              />
              <button
                onClick={placeOrder}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-bold"
              >
                Confirm Order
              </button>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
