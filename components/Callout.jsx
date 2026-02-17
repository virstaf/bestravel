"use client";

import {
  AlertCircle,
  Info,
  Lightbulb,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const calloutStyles = {
  info: {
    container:
      "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800",
    icon: "text-blue-600 dark:text-blue-400",
    title: "text-blue-900 dark:text-blue-100",
    Icon: Info,
  },
  warning: {
    container:
      "bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800",
    icon: "text-yellow-600 dark:text-yellow-400",
    title: "text-yellow-900 dark:text-yellow-100",
    Icon: AlertTriangle,
  },
  danger: {
    container:
      "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800",
    icon: "text-red-600 dark:text-red-400",
    title: "text-red-900 dark:text-red-100",
    Icon: AlertCircle,
  },
  tip: {
    container:
      "bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800",
    icon: "text-green-600 dark:text-green-400",
    title: "text-green-900 dark:text-green-100",
    Icon: Lightbulb,
  },
  success: {
    container:
      "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800",
    icon: "text-emerald-600 dark:text-emerald-400",
    title: "text-emerald-900 dark:text-emerald-100",
    Icon: CheckCircle,
  },
};

export function Callout({ type = "info", title, children }) {
  const style = calloutStyles[type] || calloutStyles.info;
  const Icon = style.Icon;

  return (
    <div className={`border-l-4 rounded-lg p-4 my-6 ${style.container}`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${style.icon}`} />
        <div className="flex-1">
          {title && (
            <h4 className={`font-semibold mb-1 ${style.title}`}>{title}</h4>
          )}
          <div className="text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
