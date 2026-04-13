import { useFormContext } from "@/hooks/formContext";

export function DeleteButton() {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <button type="submit" disabled={isSubmitting}>
          Delete
        </button>
      )}
    </form.Subscribe>
  );
}
