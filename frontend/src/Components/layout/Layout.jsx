import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import ParticleBackground from "../effects/ParticleBackground";

export default function Layout({ children }) {
  return (
<div className="flex bg-[#0F172A] text-white min-h-screen relative">

<ParticleBackground />

      <Sidebar />

      <div className="flex-1 flex flex-col ml-64">

        <Navbar />

        <main className="p-8 flex-1 overflow-auto">
          {children}
        </main>

      </div>

    </div>
  );
}