import {IoMdCheckmark} from 'react-icons/io';       

type Props = {
  active: number;
  setActive: (active: number) => void;
};

const CourseOptions = ({ active, setActive }: Props) => {
  const options = [
    "Course Information",
    "Course Options",
    "Course Content",
    "Course Preview",
  ];

  return (
    <div className="">
      {options.map((option, index) => (
        <div key={index} className="w-full flex py-3">
          <div
            className={`relative w-[35px] h-[35px]  rounded-full flex items-center justify-center
             ${active + 1 > index ? "bg-blue-500" : "bg-[#384766]"}`}
          >
            <IoMdCheckmark className="text-[25px]" />
            {index !== options.length - 1 && (
              <div
                className={`absolute w-1 h-[30px] ${
                  active + 1 > index ? "bg-blue-500" : "bg-[#384766]"
                } bottom-[-100%]`}
              />
            )}
          </div>
          <h6
            className={`pl-3 ${
              active === index ? "dark:text-white text-black" : "dark:text-white text-black"
            } text-[20px]`}
          >
            {option}
          </h6>
        </div>
      ))}
    </div>
  );
};

export default CourseOptions;