type Props = {
  label: string;
  onClick: () => void;
};

const ButtonComp = ({ label, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="px-4  py-3  text-white  font-medium  bg-[#FF8A5B]  hover:bg-[#FF8A5B]/88  rounded-2xl  active:scale-95  cursor-pointer"
    >
      {label}
    </button>
  );
};

export default ButtonComp;
