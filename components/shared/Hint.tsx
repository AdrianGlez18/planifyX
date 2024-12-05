import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface HintProps {
    children: React.ReactNode;
    description: string;
    side?: "top" | "right" | "bottom" | "left";
    offset?: number;
}

const Hint = ({
    children,
    description,
    side = "bottom",
    offset = 0
}: HintProps) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent
                sideOffset={offset}
                side={side}
                className="text-xs max-w-56 break-words">
                    {description}
                </TooltipContent>
                </Tooltip>
        </TooltipProvider>
    )
}

export default Hint