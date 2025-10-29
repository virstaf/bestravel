"use client";;
import { cn } from "@/lib/utils";
import { motion, useAnimation, useReducedMotion } from "motion/react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const MapPinIcon = forwardRef((
    {
        onMouseEnter,
        onMouseLeave,
        className,
        size = 28,
        duration = 1,
        ...props
    },
    ref,
) => {
    const pathControls = useAnimation();
    const circleControls = useAnimation();
    const reduced = useReducedMotion();
    const isControlled = useRef(false);

    useImperativeHandle(ref, () => {
        isControlled.current = true;
        return {
            startAnimation: () => {
                if (reduced) {
                    pathControls.start("normal");
                    circleControls.start("normal");
                } else {
                    pathControls.start("animate");
                    circleControls.start("animate");
                }
            },
            stopAnimation: () => {
                pathControls.start("normal");
                circleControls.start("normal");
            },
        };
    });

    const handleEnter = useCallback((e) => {
        if (reduced) return;
        if (!isControlled.current) {
            pathControls.start("animate");
            circleControls.start("animate");
        } else onMouseEnter?.(e);
    }, [pathControls, circleControls, reduced, onMouseEnter]);

    const handleLeave = useCallback((e) => {
        if (!isControlled.current) {
            pathControls.start("normal");
            circleControls.start("normal");
        } else onMouseLeave?.(e);
    }, [pathControls, circleControls, onMouseLeave]);

    const pathVariants = {
        normal: { strokeDashoffset: 0, scale: 1 },
        animate: {
            strokeDashoffset: [120, 0],
            scale: [1, 1.05, 1],
            transition: { duration: 1.5 * duration, ease: "easeOut" },
        },
    };

    const circleVariants = {
        normal: { scale: 1, opacity: 1 },
        animate: {
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1],
            transition: { duration: 0.9 * duration, ease: "easeOut", delay: 0.2 },
        },
    };
    return (
        <motion.div
            className={cn("inline-flex items-center justify-center", className)}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            {...props}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <motion.path
                    d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
                    initial="normal"
                    animate={pathControls}
                    variants={pathVariants}
                    style={{ strokeDasharray: 120, strokeLinecap: "round" }} />
                <motion.circle
                    cx="12"
                    cy="10"
                    r="3"
                    initial="normal"
                    animate={circleControls}
                    variants={circleVariants} />
            </svg>
        </motion.div>
    );
});

MapPinIcon.displayName = "MapPinIcon";
export { MapPinIcon };
