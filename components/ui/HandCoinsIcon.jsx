"use client";;
import { cn } from "@/lib/utils";
import { motion, useAnimation, useReducedMotion } from "motion/react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const HandCoinsIcon = forwardRef((
    { onMouseEnter, onMouseLeave, className, size = 28, speed = 1, ...props },
    ref,
) => {
    const groupControls = useAnimation();
    const coinsControls = useAnimation();
    const handControls = useAnimation();
    const reduced = useReducedMotion();
    const isControlled = useRef(false);

    useImperativeHandle(ref, () => {
        isControlled.current = true;
        return {
            startAnimation: () => {
                if (reduced) {
                    groupControls.start("normal");
                    coinsControls.start("normal");
                    handControls.start("normal");
                } else {
                    groupControls.start("animate");
                    coinsControls.start("animate");
                    handControls.start("animate");
                }
            },
            stopAnimation: () => {
                groupControls.start("normal");
                coinsControls.start("normal");
                handControls.start("normal");
            },
        };
    });

    const handleEnter = useCallback((e) => {
        if (reduced) return;
        if (!isControlled.current) {
            groupControls.start("animate");
            coinsControls.start("animate");
            handControls.start("animate");
        } else onMouseEnter?.(e);
    }, [groupControls, coinsControls, handControls, reduced, onMouseEnter]);

    const handleLeave = useCallback((e) => {
        if (!isControlled.current) {
            groupControls.start("normal");
            coinsControls.start("normal");
            handControls.start("normal");
        } else onMouseLeave?.(e);
    }, [groupControls, coinsControls, handControls, onMouseLeave]);

    const groupVariants = {
        normal: { scale: 1, rotate: 0 },
        animate: {
            scale: [1, 1.05, 0.98, 1],
            rotate: [0, -1.5, 1.5, 0],
            transition: { duration: 0.9 * speed, ease: "easeInOut" },
        },
    };

    const coinsVariants = {
        normal: { scale: 1, opacity: 1 },
        animate: {
            scale: [1, 1.2, 0.95, 1],
            opacity: [1, 0.9, 1],
            transition: { duration: 0.7 * speed, ease: "easeOut", delay: 0.1 },
        },
    };

    const handVariants = {
        normal: { pathLength: 1, opacity: 1 },
        animate: {
            pathLength: [0, 1],
            opacity: [0.6, 1],
            transition: { duration: 1.1 * speed, ease: "easeInOut", delay: 0.15 },
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
                initial="normal"
                animate={groupControls}
                variants={groupVariants}>
                <motion.path
                    d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"
                    initial="normal"
                    animate={handControls}
                    variants={handVariants} />
                <motion.path
                    d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"
                    initial="normal"
                    animate={handControls}
                    variants={handVariants} />
                <motion.path
                    d="m2 16 6 6"
                    initial="normal"
                    animate={handControls}
                    variants={handVariants} />
                <motion.circle
                    cx="16"
                    cy="9"
                    r="2.9"
                    initial="normal"
                    animate={coinsControls}
                    variants={coinsVariants} />
                <motion.circle
                    cx="6"
                    cy="5"
                    r="3"
                    initial="normal"
                    animate={coinsControls}
                    variants={coinsVariants} />
            </motion.svg>
        </motion.div>
    );
});

HandCoinsIcon.displayName = "HandCoinsIcon";
export { HandCoinsIcon };
