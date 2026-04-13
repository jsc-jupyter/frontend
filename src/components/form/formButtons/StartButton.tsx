import { useFormContext } from "@/hooks/formContext";

export function StartButton({ label }: { label: string }) {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <button type="submit" disabled={isSubmitting}>
          start
        </button>
      )}
    </form.Subscribe>
  );
}
