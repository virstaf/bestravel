"use client";;
import { cn } from "@/lib/utils";
import { motion, useAnimation, useReducedMotion } from "motion/react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const UsersIcon = forwardRef((
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

    const arcVariants = {
        normal: { strokeDashoffset: 0, opacity: 1 },
        animate: {
            strokeDashoffset: [50, 0],
            opacity: [0.3, 1],
            transition: {
                duration: 0.7 * speed,
                ease: "easeInOut",
            },
        },
    };

    const headVariants = {
        normal: { scale: 1, opacity: 1 },
        animate: {
            scale: [0.6, 1.2, 1],
            opacity: [0, 1],
            transition: {
                duration: 0.6 * speed,
                ease: "easeOut",
            },
        },
    };

    const sideArcVariants = {
        normal: { strokeDashoffset: 0, opacity: 0.8 },
        animate: {
            strokeDashoffset: [40, 0],
            opacity: [0.2, 1],
            transition: {
                duration: 0.7 * speed,
                ease: "easeInOut",
                delay: 0.3,
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
                className="lucide lucide-users-icon lucide-users">
                <motion.path
                    d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
                    strokeDasharray="50"
                    strokeDashoffset="50"
                    variants={arcVariants}
                    initial="normal"
                    animate={controls} />
                <motion.path
                    d="M16 3.128a4 4 0 0 1 0 7.744"
                    strokeDasharray="40"
                    strokeDashoffset="40"
                    variants={sideArcVariants}
                    initial="normal"
                    animate={controls} />
                <motion.path
                    d="M22 21v-2a4 4 0 0 0-3-3.87"
                    strokeDasharray="40"
                    strokeDashoffset="40"
                    variants={sideArcVariants}
                    initial="normal"
                    animate={controls} />
                <motion.circle
                    cx="9"
                    cy="7"
                    r="4"
                    variants={headVariants}
                    initial="normal"
                    animate={controls} />
            </motion.svg>
        </motion.div>
    );
});

UsersIcon.displayName = "UsersIcon";
export { UsersIcon };
