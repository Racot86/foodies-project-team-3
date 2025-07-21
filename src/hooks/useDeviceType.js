import {useEffect, useState} from "react";
import {getDeviceType} from "@/utils/deviceUtils";

export const useDeviceType = () => {
    const [deviceType, setDeviceType] = useState(() => getDeviceType());

    useEffect(() => {
        const handleResize = () => {
            const newDeviceType = getDeviceType();
            setDeviceType(newDeviceType);
        };

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return deviceType;
};
