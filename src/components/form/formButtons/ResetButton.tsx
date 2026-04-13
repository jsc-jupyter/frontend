import { useFormContext } from "@/hooks/formContext";

export function ResetButton() {
  const form = useFormContext();

  const handleReset = (e) => {
    e.preventDefault();
    form.reset();
  };

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <button
          type="submit"
          disabled={isSubmitting}
          onClick={(e) => handleReset(e)}
        >
          Reset
        </button>
      )}
    </form.Subscribe>
  );
}
