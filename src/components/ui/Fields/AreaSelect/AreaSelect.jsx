import { useEffect, useState } from "react";
import { FieldSelect } from "@/components/ui/Fields/FieldSelect/FieldSelect";
import { areasService } from "@/services/areasService";

export const AreaSelect = (props) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const data = await areasService();
        const formatted = (data || []).map((item) => ({
          value: item._id,
          label: item.name,
        }));
        setOptions(formatted);
      } catch (error) {
        console.error("Error fetching areas:", error);
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
      placeholder={loading ? "Loading..." : "Region"}
      {...props}
    />
  );
};
