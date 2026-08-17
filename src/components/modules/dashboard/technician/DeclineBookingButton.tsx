import { Spinner } from "@/components/ui/spinner";

export function DeclineBookingButton({
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
      className="btn-secondary disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isLoading ? <Spinner /> : "Decline"}
    </button>
  );
}
