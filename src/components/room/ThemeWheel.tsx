/**
 * Theme Wheel Component
 * Spinning wheel for random theme selection
 *
 * CORRECTIONS APPLIED (Phase 2):
 * - ✅ Imported musicThemes from centralized mocks/data.ts
 * - ✅ Removed duplicate theme definitions
 */

import React, { useState, useRef } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, RotateCcw } from "lucide-react";
import { musicThemes } from "@/mocks/data";

interface ThemeWheelProps {
  onThemeSelected?: (theme: string) => void;
  onThemeRejected?: () => void;
  isRoomLeader?: boolean;
}

// ✅ FIXED: Use centralized musicThemes from mocks/data.ts
const themes = musicThemes;

const ThemeWheel: React.FC<ThemeWheelProps> = ({
  onThemeSelected = () => {},
  onThemeRejected = () => {},
  isRoomLeader = false,
}) => {
  const [spinning, setSpinning] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spinWheel = () => {
    if (spinning) return;

    setSpinning(true);
    setShowControls(false);

    // Random rotation between 1080 and 3600 degrees (3-10 full rotations)
    const newRotation = rotation + 1080 + Math.random() * 2520;
    setRotation(newRotation);

    // Calculate which theme will be selected
    setTimeout(() => {
      const normalizedRotation = newRotation % 360;
      const themeIndex = Math.floor((normalizedRotation / 360) * themes.length);
      const selectedIndex = themes.length - 1 - (themeIndex % themes.length);

      const selectedThemeValue = themes[selectedIndex];
      if (selectedThemeValue) {
        setSelectedTheme(selectedThemeValue);
      }
      setSpinning(false);
      setShowControls(true);
    }, 3000); // Match this with the CSS transition duration
  };

  const handleAccept = () => {
    if (selectedTheme) {
      onThemeSelected(selectedTheme);
      setSelectedTheme(null);
      setShowControls(false);
    }
  };

  const handleReject = () => {
    onThemeRejected();
    setSelectedTheme(null);
    setShowControls(false);
    // Auto spin again after rejection
    setTimeout(spinWheel, 500);
  };

  // Create wheel segments
  const segmentAngle = 360 / themes.length;
  const wheelSegments = themes.map((theme, index) => {
    const startAngle = index * segmentAngle;
    // const endAngle = (index + 1) * segmentAngle; // Unused for now

    // Alternate colors for better visibility
    const backgroundColor = index % 2 === 0 ? "bg-purple-600" : "bg-indigo-700";

    return (
      <div
        key={theme}
        className={cn(
          "absolute w-full h-full origin-bottom-center",
          backgroundColor,
        )}
        style={{
          transform: `rotate(${startAngle}deg) skewY(${90 - segmentAngle}deg)`,
          transformOrigin: "50% 0%",
        }}
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-white text-xs font-bold rotate-180 mb-20 whitespace-nowrap">
          {theme}
        </div>
      </div>
    );
  });

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg w-full max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Theme Selection Wheel
      </h2>

      {/* Wheel container */}
      <div className="relative w-80 h-80 mb-8">
        {/* Spinning wheel */}
        <div
          ref={wheelRef}
          className="relative w-full h-full rounded-full overflow-hidden transition-transform duration-3000 ease-out"
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: "center center",
          }}
        >
          {wheelSegments}
        </div>

        {/* Center point */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full border-4 border-gray-800 z-10"></div>

        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[15px] border-r-[15px] border-b-[30px] border-l-transparent border-r-transparent border-b-red-600 z-10"></div>
      </div>

      {/* Selected theme display */}
      <AnimatePresence>
        {selectedTheme && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 text-center"
          >
            <h3 className="text-xl font-semibold mb-2">Selected Theme:</h3>
            <div className="text-3xl font-bold text-purple-700 p-4 bg-purple-100 rounded-lg">
              {selectedTheme}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="flex gap-4 justify-center">
        {isRoomLeader && (
          <>
            {!spinning && !showControls && (
              <Button
                onClick={spinWheel}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                size="lg"
              >
                <RotateCcw className="mr-2 h-5 w-5" />
                Spin the Wheel
              </Button>
            )}

            {showControls && (
              <div className="flex gap-4">
                <Button
                  onClick={handleAccept}
                  variant="default"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Check className="mr-2 h-5 w-5" />
                  Accept Theme
                </Button>
                <Button onClick={handleReject} variant="destructive">
                  <X className="mr-2 h-5 w-5" />
                  Reject & Spin Again
                </Button>
              </div>
            )}
          </>
        )}

        {!isRoomLeader && (
          <div className="text-center p-4 bg-gray-200 rounded-lg">
            {spinning ? (
              <p className="text-lg">The wheel is spinning...</p>
            ) : selectedTheme ? (
              <p className="text-lg">
                Waiting for room leader to accept or reject the theme
              </p>
            ) : (
              <p className="text-lg">
                Waiting for room leader to spin the wheel
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeWheel;
