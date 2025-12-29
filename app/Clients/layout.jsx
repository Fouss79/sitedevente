// app/clients/layout.jsx


import FooterClient from "./components/FooterClient";

import DropdownMenus from "./produit/component/dropdownmenu";


export default function ClientLayout({ children }) {
  return (
        
    <div className="flex flex-col min-h-screen bg-gray-50">
                   
            
            {/* Hero section */}
            <div className="bg-yellow-700 text-white p-10 rounded-xl shadow-lg text-center ">
              <h1 className="text-3xl font-bold mb-2">Bienvenue sur notre boutique</h1>
              <p className="text-lg">Découvrez les meilleurs produits sélectionnés pour vous !</p>
            </div>
      <DropdownMenus/>
      <main className="flex-1 p-4">
      {children}
       </main>
      
    <FooterClient/>
    </div>
  
  );
}
