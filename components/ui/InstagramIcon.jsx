"use client";;
import { cn } from "@/lib/utils";
import { motion, useAnimation, useReducedMotion } from "motion/react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const InstagramIcon = forwardRef((
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

    const iconVariants = {
        normal: { scale: 1, rotate: 0 },
        animate: {
            scale: [1, 1.08, 0.95, 1],
            rotate: [0, -2, 2, 0],
            transition: { duration: 1.3 * speed, ease: "easeInOut", repeat: 0 },
        },
    };

    const drawVariants = {
        normal: { pathLength: 1, opacity: 1 },
        animate: {
            pathLength: [0, 1],
            opacity: [0.7, 1],
            transition: { duration: 1.5 * speed, ease: "easeInOut", repeat: 0 },
        },
    };

    const pulseVariants = {
        normal: { scale: 1, opacity: 1 },
        animate: {
            scale: [1, 1.4, 1],
            opacity: [1, 0.4, 1],
            transition: { duration: 1 * speed, repeat: 0, ease: "easeInOut" },
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
                initial="normal"
                variants={iconVariants}>
                <motion.rect width="20" height="20" x="2" y="2" rx="5" ry="5" variants={drawVariants} />
                <motion.path
                    d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                    variants={drawVariants} />
                <motion.line x1="17.5" x2="17.51" y1="6.5" y2="6.5" variants={pulseVariants} />
            </motion.svg>
        </motion.div>
    );
});

InstagramIcon.displayName = "InstagramIcon";
export { InstagramIcon };
