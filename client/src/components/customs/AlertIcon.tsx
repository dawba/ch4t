import { useState } from 'react';
import { ReactComponent as YellowAlertIcon } from '../../assets/alert_icons/alert_icon_yellow.svg';
import { ReactComponent as RedAlertIcon } from '../../assets/alert_icons/alert_icon_red.svg';
import { AlertIconState } from '../../types/types.ts';

interface Props {
    state: AlertIconState;
    className?: string;
    tooltip?: string;
}

const AlertIcon = ({ state, className, tooltip }: Props) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`relative inline-flex items-center ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {state === 'yellow' && <YellowAlertIcon className="w-full h-full" />}
            {state === 'red' && <RedAlertIcon className="w-full h-full" />}
            {state === 'hidden' && <div className="w-full h-full"></div>}
            {isHovered && tooltip && (
                <div
                    className="absolute left-full ml-2 p-2 bg-secondary-gray text-white
                        text-xs rounded shadow-lg z-10 whitespace-nowrap"
                >
                    {tooltip}
                </div>
            )}
        </div>
    );
};

export default AlertIcon;