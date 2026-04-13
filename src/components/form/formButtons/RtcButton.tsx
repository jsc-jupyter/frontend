import { useFormContext } from "@/hooks/formContext";

export function RtcButton() {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <button type="submit" disabled={isSubmitting}>
          RTC
        </button>
      )}
    </form.Subscribe>
  );
}
