function ActionButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-[0.15rem] text-xs font-light text-brand-subtleText"
    >
      {children}
    </button>
  );
}

export default ActionButton;
