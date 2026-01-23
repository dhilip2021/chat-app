import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";

export const SplashScreen = () => {
 const navigate = useNavigate();
const { isLoggedIn } = useApp();

useEffect(() => {
  const timer = setTimeout(() => {
    if (isLoggedIn) {
      navigate("/home");
    } else {
      navigate("/language");
    }
  }, 2500);

  return () => clearTimeout(timer);
}, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-[100px]" />

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center gap-6 animate-scale-in">
        <img
          src="/logo.png"
          className="w-[150px] h-full object-cover transition-opacity duration-700"
        />

        <h1 className="text-4xl font-bold text-gradient-primary tracking-tight">
          KALAIGNAR OTT
        </h1>

        <p className="text-muted-foreground text-sm">Entertainment Unlimited</p>
      </div>

      {/* Loading indicator */}
      <div className="absolute bottom-20 flex flex-col items-center gap-4">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Loading your experience...
        </p>
      </div>
    </div>
  );
};
