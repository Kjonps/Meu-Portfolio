import React, { useEffect } from "react";
import { Particles } from "@tsparticles/react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "@/contexts/ThemeContext";

let engineReady = false;

export default function InteractiveBackground() {
  const { theme } = useTheme();
  const particleColor = theme === "light" ? "#cccccc" : "#ffffff";
  const linkColor = theme === "light" ? "#bbbbbb" : "#ffffff";

  useEffect(() => {
    const initEngine = async () => {
      if (!engineReady) {
        await initParticlesEngine(async (engine) => {
          await loadSlim(engine);
          engineReady = true;
        });
      }
    };
    initEngine();
  }, []);

  return (
    <Particles
      id="tsparticles"
      options={{
        fullScreen: {
          enable: true,
          zIndex: 0,
        },
        fpsLimit: 120,
        particles: {
          number: {
            value: 120,
          },
          color: {
            value: particleColor,
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.6,
          },
          size: {
            value: { min: 1, max: 3 },
          },
          links: {
            enable: true,
            distance: 200,
            color: linkColor,
            opacity: 0.3,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: true,
            straight: false,
            outModes: {
              default: "out",
            },
          },
        },
        interactivity: {
          detectsOn: "window",
          events: {
            onHover: {
              enable: true,
              mode: "push",
            },
            onClick: {
              enable: true,
              mode: "push",
            },
          },
          modes: {
            push: {
              quantity: 5,
            },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
