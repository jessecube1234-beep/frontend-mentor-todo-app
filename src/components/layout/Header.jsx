import { useTheme } from "@hooks/useTheme";
import { Button } from "@components/ui/button";
/**
 * Application header component.
 */
export default function Header() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const handleThemeChange = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <header className="flex items-center justify-between mb-10">
      <h1 className="text-4xl font-bold tracking-[0.5em] text-foreground">
        TODO
      </h1>

      <Button
        variant="ghost"
        onClick={handleThemeChange}
        className="uppercase tracking-widest text-xs"
      >
        {isDark ? "Light" : "Dark"}
      </Button>
    </header>
  );
}