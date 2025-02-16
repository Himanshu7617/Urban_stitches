import { useState, useRef, useEffect } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const Dropdown = ({ items }: { items: string[] }) => {
  const [active, setActive] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(( ) => {

    function handleClick(e : MouseEvent){
        if (dropdownRef.current && !dropdownRef.current.contains( e.target as Node )){
            setActive(false)
        }
    }
    document.addEventListener('mousedown', handleClick);

    return () => {
        document.removeEventListener('mousedown', handleClick);
    }
  },[])
  return (
    <div className="w-fit h-fit relative" ref={dropdownRef}>
      <span className="cursor-pointer" onClick={() => setActive(!active)}>
        <BsThreeDotsVertical />
      </span>
      {active && (
        <div className="absolute right-4 rounded cursor-pointer bg-gray-300 flex flex-col w-fit h-fit shadow-lg">
          {items.map((item, index) => (
            <span className="rounded hover:bg-gray-500 p-2 w-full h-fit" key={index}>
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
