import { useEffect, useState } from "react";
import { FieldSelect } from "@/components/ui/Fields/FieldSelect/FieldSelect";
import { ingredientsService } from "@/services/ingredientsService";

export const IngredientSelect = (props) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const data = await ingredientsService();
        const formatted = (data || []).map((item) => ({
          value: item._id,
          label: item.name,
        }));
        setOptions(formatted);
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  return (
    <FieldSelect
      label=""
      name="ingredient"
      options={options}
      placeholder={loading ? "Loading..." : "Ingredient"}
      {...props}
    />
  );
};
