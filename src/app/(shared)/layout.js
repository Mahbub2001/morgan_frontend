import "../globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import AuthProvider from "@/hooks/AuthProvider";

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <Navbar />
      <div className="min-h-screen mt-40">{children}</div>
      <Footer />
    </AuthProvider>
  );
}
