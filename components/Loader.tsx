
import React from 'react';

const Loader: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-20">
     <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
     <p className="mt-4 text-slate-300 text-lg">AI sedang mengkurasi film...</p>
  </div>
);

export default Loader;
