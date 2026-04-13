import { useFormContext } from "@/hooks/formContext";

export function UrlButton() {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <button
          type="submit"
          disabled={isSubmitting}
          onClick={(e) => {
            e.preventDefault();
            form.handleSubmit("url");
          }}
        >
          URL
        </button>
      )}
    </form.Subscribe>
  );
}
