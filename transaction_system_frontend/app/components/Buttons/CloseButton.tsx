type Props = {
  onClick: () => void;
};

const CloseButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="absolute  top-7  right-8  cursor-pointer  active:scale-95"
    >
      <img src="/close.svg" className="w-5" />
    </button>
  );
};

export default CloseButton;
