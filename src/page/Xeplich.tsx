import { useForm } from "react-hook-form";

interface FormXepLich {
  tengiaovu: string;
  magiaovu: string;
  file1: string;
  file2: string;
  file3: string;
}

const Xeplich = () => {
  const { register } = useForm<FormXepLich>();

  return (
    <div className=" bg-slate-600">
      <div className="flex flex-row">
        <div className="bg-red-200 p-3 ml-2">
          Để có thể xếp lịch thi bạn cần có 1 số file sau
        </div>

        <div className="flex flex-col w-2/3 mr-4">
          <form className="flex-col w-full sapce-y-2 mt-5 justify-center p-4 ml-2 bg-white space-y-3">
            <div className="mb-3">
              Tên giáo vụ
              <input
                className="w-full bg-gray-400 rounded p-2 "
                type="text"
                {...register("tengiaovu", { required: true })}
              />
            </div>

            <div>
              Mã giáo vụ
              <input
                className="w-full bg-gray-400 rounded p-2 "
                type="text"
                {...register("magiaovu", { required: true })}
              />
            </div>

            <div>
              File 1
              <input
                className="w-full bg-gray-400 rounded p-2 "
                type="file"
                {...register("file1", { required: true })}
              />
            </div>
            <div>
              File 2
              <input
                className="w-full bg-gray-400 rounded p-2 "
                type="file"
                {...register("file1", { required: true })}
              />
            </div>
            <div>
              File 3
              <input
                className="w-full bg-gray-400 rounded p-2 "
                type="file"
                {...register("file1", { required: true })}
              />
            </div>
            <button className=" relative left-32  bg-blue-200 p-2 rounded hover:bg-blue-500">
              Submit
            </button>
          </form>

          <div>Xin chào</div>
        </div>
      </div>

      <div>sadasdsadmasdas</div>
    </div>
  );
};

export default Xeplich;
