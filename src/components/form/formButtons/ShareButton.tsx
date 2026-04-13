import { useFormContext } from "@/hooks/formContext";

export function ShareButton() {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <button type="submit" disabled={isSubmitting}>
          Share
        </button>
      )}
    </form.Subscribe>
  );
}
