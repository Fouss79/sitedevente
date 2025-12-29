// layouts/VendeurLayout.js
import ProtectedRoute from "../components/ProtectedRoute";

export default function VendeurLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={['vendeur']}>
      <div className="p-4 bg-blue-50 min-h-screen">
        <h1 className="text-xl font-bold mb-4">Espace Vendeur</h1>
        {children}
      </div>
    </ProtectedRoute>
  );
}
