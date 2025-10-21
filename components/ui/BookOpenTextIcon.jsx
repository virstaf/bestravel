"use client";;
import { cn } from "@/lib/utils";
import { motion, useAnimation, useReducedMotion } from "motion/react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const BookOpenTextIcon = forwardRef((
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
            scale: [1, 1.04, 0.98, 1],
            rotate: [0, -2, 2, 0],
            transition: { duration: 1.1 * speed, ease: "easeInOut", repeat: 0 },
        },
    };

    const strokeVariants = {
        normal: { pathLength: 1, opacity: 1 },
        animate: (i) => ({
            pathLength: [0.9, 1, 1],
            opacity: [0.7, 1, 1],
            transition: {
                duration: 0.9 * speed,
                ease: "easeInOut",
                delay: i * 0.12,
            },
        }),
    };

    const lineVariants = {
        normal: { opacity: 1, y: 0, scaleX: 1 },
        animate: (i) => ({
            opacity: [0.6, 1, 1],
            y: [1.5, -1, 0],
            scaleX: [0.9, 1.05, 1],
            transition: {
                duration: 0.9 * speed,
                ease: "easeInOut",
                delay: 0.2 + i * 0.1,
            },
        }),
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
                <motion.path
                    d="M12 7v14"
                    variants={strokeVariants}
                    custom={0}
                    initial="normal"
                    animate={controls} />
                <motion.path
                    d="M16 12h2"
                    variants={lineVariants}
                    custom={0}
                    initial="normal"
                    animate={controls} />
                <motion.path
                    d="M16 8h2"
                    variants={lineVariants}
                    custom={1}
                    initial="normal"
                    animate={controls} />
                <motion.path
                    d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"
                    variants={strokeVariants}
                    custom={1}
                    initial="normal"
                    animate={controls} />
                <motion.path
                    d="M6 12h2"
                    variants={lineVariants}
                    custom={2}
                    initial="normal"
                    animate={controls} />
                <motion.path
                    d="M6 8h2"
                    variants={lineVariants}
                    custom={3}
                    initial="normal"
                    animate={controls} />
            </motion.svg>
        </motion.div>
    );
});

BookOpenTextIcon.displayName = "BookOpenTextIcon";
export { BookOpenTextIcon };
