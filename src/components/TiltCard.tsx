import React, { useRef, useState, useCallback } from "react";
import "./TiltCard.css";
import { sounds } from "../utils/soundEffects";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = "",
  maxTilt = 12,
  scale = 1.02,
  glare = true,
  onClick,
  style = {},
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>("");
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Mouse position relative to center of the card (-1 to 1)
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const pctX = (mouseX / width) * 2 - 1;
      const pctY = (mouseY / height) * 2 - 1;

      // Rotation angles (inverted Y for natural tilt)
      const rotateX = -pctY * maxTilt;
      const rotateY = pctX * maxTilt;

      setTransform(
        `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
      );

      if (glare) {
        // Holographic glare angle & intensity for clean light mode
        const glareX = (mouseX / width) * 100;
        const glareY = (mouseY / height) * 100;
        setGlareStyle({
          opacity: 0.45,
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.8) 0%, rgba(99, 102, 241, 0.12) 40%, transparent 80%)`,
        });
      }
    },
    [maxTilt, scale, glare]
  );

  const handleMouseEnter = useCallback(() => {
    sounds.playHover();
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlareStyle({ opacity: 0, transition: "opacity 0.5s ease" });
  }, []);

  return (
    <div
      ref={cardRef}
      className={`tilt-card-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        ...style,
        transform: transform || "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      }}
    >
      <div className="tilt-card-content">{children}</div>
      {glare && <div className="tilt-card-glare" style={glareStyle} />}
    </div>
  );
};

export default TiltCard;
