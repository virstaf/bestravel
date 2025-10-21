"use client";;
import { cn } from "@/lib/utils";
import { motion, useAnimation, useReducedMotion } from "motion/react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const BookOpenCheckIcon = forwardRef((
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
            scale: [1, 1.06, 0.97, 1],
            rotate: [0, -2, 2, 0],
            transition: { duration: 0.9 * speed, ease: "easeInOut" },
        },
    };

    const spineVariants = {
        normal: { pathLength: 1, opacity: 1 },
        animate: {
            pathLength: [0, 1],
            opacity: 1,
            transition: { duration: 0.6 * speed, ease: "easeInOut" },
        },
    };

    const bookBodyVariants = {
        normal: { scale: 1, opacity: 1 },
        animate: {
            scale: [1, 1.05, 0.98, 1],
            opacity: 1,
            transition: { duration: 0.8 * speed, ease: "easeOut", delay: 0.15 },
        },
    };

    const checkVariants = {
        normal: { pathLength: 1, opacity: 1 },
        animate: {
            pathLength: [0, 1],
            opacity: 1,
            transition: { duration: 0.7 * speed, ease: "easeOut", delay: 0.25 },
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
                <motion.path d="M12 21V7" variants={spineVariants} initial="normal" animate={controls} />
                <motion.path
                    d="m16 12 2 2 4-4"
                    variants={checkVariants}
                    initial="normal"
                    animate={controls} />
                <motion.path
                    d="M22 6V4a1 1 0 0 0-1-1h-5a4 4 0 0 0-4 4 4 4 0 0 0-4-4H3a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h6a3 3 0 0 1 3 3 3 3 0 0 1 3-3h6a1 1 0 0 0 1-1v-1.3"
                    variants={bookBodyVariants}
                    initial="normal"
                    animate={controls} />
            </motion.svg>
        </motion.div>
    );
});

BookOpenCheckIcon.displayName = "BookOpenCheckIcon";
export { BookOpenCheckIcon };
