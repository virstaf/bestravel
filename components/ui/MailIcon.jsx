"use client";;
import { cn } from "@/lib/utils";
import { motion, useAnimation, useReducedMotion } from "motion/react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

const MailIcon = forwardRef((
    { onMouseEnter, onMouseLeave, className, size = 28, speed = 1, ...props },
    ref,
) => {
    const flapControls = useAnimation();
    const bodyControls = useAnimation();
    const containerControls = useAnimation();
    const reduced = useReducedMotion();
    const isControlled = useRef(false);

    useImperativeHandle(ref, () => {
        isControlled.current = true;
        return {
            startAnimation: () => {
                if (reduced) {
                    containerControls.start("normal");
                    flapControls.start("normal");
                    bodyControls.start("normal");
                } else {
                    containerControls.start("animate");
                    flapControls.start("animate");
                    bodyControls.start("animate");
                }
            },
            stopAnimation: () => {
                containerControls.start("normal");
                flapControls.start("normal");
                bodyControls.start("normal");
            },
        };
    });

    const handleEnter = useCallback((e) => {
        if (reduced) return;
        if (!isControlled.current) {
            containerControls.start("animate");
            flapControls.start("animate");
            bodyControls.start("animate");
        } else onMouseEnter?.(e);
    }, [containerControls, flapControls, bodyControls, reduced, onMouseEnter]);

    const handleLeave = useCallback((e) => {
        if (!isControlled.current) {
            containerControls.start("normal");
            flapControls.start("normal");
            bodyControls.start("normal");
        } else onMouseLeave?.(e);
    }, [containerControls, flapControls, bodyControls, onMouseLeave]);

    const containerVariants = {
        normal: { scale: 1 },
        animate: {
            scale: [1, 1.04, 1],
            transition: { duration: 0.36 * speed, ease: "easeOut" },
        },
    };

    const flapVariants = {
        normal: { rotateX: 0, translateY: 0, transformOrigin: "12px 6px" },
        animate: {
            rotateX: [-0, -12, 2, 0],
            translateY: [0, -1.6, 0.6, 0],
            transition: {
                duration: 0.45 * speed,
                ease: "easeOut",
                times: [0, 0.5, 0.85, 1],
            },
        },
    };

    const bodyVariants = {
        normal: { opacity: 1 },
        animate: {
            opacity: [1, 0.95, 1],
            transition: { duration: 0.45 * speed, ease: "easeOut" },
        },
    };

    return (
        <motion.div
            className={cn("inline-flex items-center justify-center", className)}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            {...props}
            initial="normal"
            animate={containerControls}
            variants={containerVariants}>
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
                    d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"
                    initial="normal"
                    animate={flapControls}
                    variants={flapVariants}
                    style={{ transformStyle: "preserve-3d" }} />
                <motion.rect
                    x="2"
                    y="4"
                    width="20"
                    height="16"
                    rx="2"
                    initial="normal"
                    animate={bodyControls}
                    variants={bodyVariants} />
            </svg>
        </motion.div>
    );
});

MailIcon.displayName = "MailIcon";
export { MailIcon };
