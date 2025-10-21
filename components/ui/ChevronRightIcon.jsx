"use client";;
import { cn } from "@/lib/utils";
import { motion, useAnimation, useReducedMotion } from "motion/react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const ChevronRightIcon = forwardRef((
    { onMouseEnter, onMouseLeave, className, size = 28, speed = 1, ...props },
    ref,
) => {
    const controls = useAnimation();
    const reduced = useReducedMotion();
    const isControlled = useRef(false);

    useImperativeHandle(ref, () => {
        isControlled.current = true;
        return {
            startAnimation: () =>
                reduced ? controls.start("normal") : controls.start("animate"),
            stopAnimation: () => controls.start("normal"),
        };
    });

    const handleEnter = useCallback((e) => {
        if (reduced) return;
        if (!isControlled.current) controls.start("animate");
        else onMouseEnter?.(e);
    }, [controls, reduced, onMouseEnter]);

    const handleLeave = useCallback((e) => {
        if (!isControlled.current) controls.start("normal");
        else onMouseLeave?.(e);
    }, [controls, onMouseLeave]);

    const arrowVariants = {
        normal: { x: 0, opacity: 1 },
        animate: {
            x: [0, 4, 0],
            opacity: [1, 0.6, 1],
            transition: {
                duration: 0.8 * speed,
                repeat: 0,
            },
        },
    };

    const trailVariants = {
        normal: { x: 0, opacity: 0 },
        animate: {
            x: [6, 10],
            opacity: [0.4, 0],
            transition: {
                duration: 0.8 * speed,
                repeat: 0,
            },
        },
    };

    return (
        <motion.div
            className={cn("inline-flex items-center justify-center", className)}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            {...props}>
            <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={controls}
                initial="normal">
                <motion.path d="m9 18 6-6-6-6" variants={trailVariants} stroke="currentColor" />
                <motion.path d="m9 18 6-6-6-6" variants={arrowVariants} />
            </motion.svg>
        </motion.div>
    );
});

ChevronRightIcon.displayName = "ChevronRightIcon";
export { ChevronRightIcon };
