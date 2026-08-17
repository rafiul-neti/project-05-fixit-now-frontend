import { Spinner } from "@/components/ui/spinner";

export function AcceptBookingButton({
  onClick,
  disabled,
  isLoading,
}: {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="btn-primary disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isLoading ? <Spinner /> : "Accept"}
    </button>
  );
}
