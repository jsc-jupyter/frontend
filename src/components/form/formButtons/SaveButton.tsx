import { useFormContext } from "@/hooks/formContext";

export function SaveButton() {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <button type="submit" disabled={isSubmitting}>
          Save
        </button>
      )}
    </form.Subscribe>
  );
}
