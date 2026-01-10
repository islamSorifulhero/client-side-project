import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link } from "react-router";
import { motion } from "framer-motion";

const AllProducts = () => {
  const axiosPublic = useAxiosPublic();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic.get("/products")
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log("PRODUCT ERROR:", err);
        setLoading(false);
      });
  }, []);

  // Skeleton Loader
  const SkeletonCard = () => (
    <div className="flex flex-col gap-4 w-full h-[450px]">
      <div className="h-60 w-full rounded-2xl bg-base-200 animate-pulse"></div>
      <div className="h-6 w-3/4 rounded bg-base-300 animate-pulse"></div>
      <div className="h-4 w-1/2 rounded bg-base-300 animate-pulse"></div>
      <div className="h-10 w-full mt-auto rounded bg-base-300 animate-pulse"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-base-100 transition-colors duration-300">
      {/* Header */}
      <div className="bg-base-200 py-16 mb-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.h2 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-black text-base-content uppercase tracking-tighter"
          >
            Our Full <span className="text-primary">Collection</span>
          </motion.h2>
          <p className="mt-4 text-base-content font-bold uppercase tracking-widest text-sm">
            Explore {products.length} Premium Garments Items
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        {/* Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {loading ? (
            Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
          ) : products.length > 0 ? (
            products.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -10 }}
                className="group flex flex-col h-[450px] bg-base-100 rounded-[2rem] shadow-lg border border-base-200 overflow-hidden transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={product.images?.[0] || product.images || "/placeholder.png"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 bg-base-200/90 px-3 py-1 rounded-full text-[10px] font-black uppercase text-primary">
                    {product.category}
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-black text-base-content uppercase truncate">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between mt-3">
                    <p className="text-2xl font-black text-primary">${product.price}</p>
                    <p className="flex items-center gap-1 text-yellow-500 font-bold text-sm uppercase">
                      Stock: {product.availableQty}
                    </p>
                  </div>

                  <p className="mt-4 text-xs font-bold text-base-content/70 line-clamp-2">
                    {product.description}
                  </p>

                  {/* View Details */}
                  <div className="mt-auto">
                    <Link to={`/product/${product._id}`}>
                      <button className="btn btn-primary btn-sm w-full rounded-xl font-black uppercase tracking-widest shadow-lg shadow-primary/10">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <h2 className="text-2xl font-black text-gray-400 uppercase">No Products Found!</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
