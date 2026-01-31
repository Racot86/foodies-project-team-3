import {useEffect, useState} from "react";
import axios from "axios";
import {FieldSelect} from "@/components/ui/Fields/FieldSelect/FieldSelect";
import {buildApiUrl} from "@/config/api";

export const AreaSelect = (props) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedValue, setSelectedValue] = useState("");

    useEffect(() => {
        const fetchAreas = async () => {
            try {
                const response = await axios.get(
                    buildApiUrl("/api/areas")
                );
                const formatted = response.data.map((item) => ({
                    value: item.id,
                    label: item.name,
                }));
                setOptions(formatted);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAreas();
    }, []);

    return (
        <FieldSelect
            label=""
            name="area"
            options={options}
            value={selectedValue}
            onChange={setSelectedValue}
            placeholder={loading ? "Loading..." : "Area"}
            {...props}
        />
    );
};
