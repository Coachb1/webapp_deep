import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const NORMAL_MAX_VALUE = 1;
const BOOSTER_MAX_VALUE = 5;

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & { disabled?: boolean }
>(({ className, disabled = false, value, max = BOOSTER_MAX_VALUE, ...props }, ref) => {
  const currentValue = value?.[0] ?? 0;
  const isBoosterActive = currentValue > NORMAL_MAX_VALUE;

  const normalRangePercentage = (NORMAL_MAX_VALUE / max) * 100;

  const normalColor = "#4dd9b3";
  const boosterColor = "#ff7f50";

  return (
    <SliderPrimitive.Root
      ref={ref}
      max={max}
      step={0.01}
      aria-label="Audio Volume"
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
      disabled={disabled}
      value={value}
      {...props}
    >
      {/* Track */}
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        {/* Normal section marker */}
        <div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            width: `${normalRangePercentage}%`,
            backgroundColor: normalColor,
            borderRight: `2px dashed ${boosterColor}`,
          }}
        />

        {/* Active range */}
        <SliderPrimitive.Range
          className="absolute h-full transition-colors duration-300"
          style={{
            background: isBoosterActive
              ? `linear-gradient(90deg, ${normalColor} 0%, ${boosterColor} 100%)`
              : normalColor,
          }}
        />
      </SliderPrimitive.Track>

      {/* Thumb */}
      <SliderPrimitive.Thumb asChild>
        <motion.div
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            boxShadow: isBoosterActive
              ? `0 0 12px ${boosterColor}`
              : "0 0 6px rgba(0,0,0,0.2)",
          }}
          transition={{ duration: 0.2 }}
          className={cn(
            "relative flex h-5 w-5 items-center justify-center rounded-full border-2 bg-background focus-visible:outline-none",
            isBoosterActive ? "border-orange-400" : "border-teal-400",
            disabled && "cursor-not-allowed"
          )}
          title={
            disabled
              ? "Volume control disabled"
              : isBoosterActive
              ? `Booster: ${(currentValue * 100).toFixed(0)}%`
              : `Volume: ${(currentValue * 100).toFixed(0)}%`
          }
        >
          {/* Inner indicator dot */}
          <div
            className={cn(
              "h-2.5 w-2.5 rounded-full",
              isBoosterActive ? "bg-orange-400" : "bg-teal-400"
            )}
          />
        </motion.div>
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  );
});
Slider.displayName = "AudioSlider";

export { Slider as AudioSlider };
