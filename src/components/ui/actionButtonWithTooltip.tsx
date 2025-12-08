import React from "react";
import { Button } from "./button";

interface ActionButtonWithTooltipProps {
    icon: React.ReactNode;
    tooltip: string;
    onClick?: (e: React.MouseEvent) => void;
    colorClass?: string;
}

export const ActionButtonWithTooltip: React.FC<
    ActionButtonWithTooltipProps
> = ({
    icon,
    tooltip,
    onClick,
    colorClass = "h-5 w-5 p-0 bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors rounded-md",
}) => {
    return (
        <Button
            size="sm"
            variant="ghost"
            className={colorClass}
            onClick={onClick}
            title={tooltip}
        >
            {icon}
        </Button>
    );
};
