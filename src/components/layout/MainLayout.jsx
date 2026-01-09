import Header from "@/components/layout/Header";
import { useTheme } from "@/hooks/useTheme";

import bgLight from "@/assets/bg-desktop-light.jpg";
import bgDark from "@/assets/bg-desktop-dark.jpg";

function MainLayout({ children }) {
  const { theme } = useTheme();

  const backgroundImage = theme === "dark" ? bgDark : bgLight;

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Background */}
      <div
        className="absolute top-0 left-0 w-full h-[40vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Content */}
      <main className="relative max-w-xl mx-auto px-4 pt-8">
        <Header />
        {children}
      </main>
    </div>
  );
}

export default MainLayout;