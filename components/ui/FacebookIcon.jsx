"use client";;
import { cn } from "@/lib/utils";
import { motion, useAnimation, useReducedMotion } from "motion/react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const FacebookIcon = forwardRef((
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
        if (!isControlled.current) {
            controls.start("normal");
        } else {
            onMouseLeave?.(e);
        }
    }, [controls, onMouseLeave]);

    const svgVariants = {
        normal: { scale: 1, rotate: 0 },
        animate: {
            scale: [1, 1.1, 0.95, 1],
            rotate: [0, -2, 2, 0],
            transition: { duration: 1.2 * speed, repeat: 0, ease: "easeInOut" },
        },
    };

    const pathVariants = {
        normal: { pathLength: 1 },
        animate: {
            pathLength: [0, 1],
            transition: { duration: 1.5 * speed, ease: "easeInOut", repeat: 0 },
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
                variants={svgVariants}>
                <motion.path
                    d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7
        a1 1 0 0 1 1-1h3z"
                    variants={pathVariants} />
            </motion.svg>
        </motion.div>
    );
});

FacebookIcon.displayName = "FacebookIcon";
export { FacebookIcon };
