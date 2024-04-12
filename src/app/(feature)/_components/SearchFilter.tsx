import { CiSearch } from 'react-icons/ci';
import { DISTRICT } from '../_constants/restaurant';
import { useSearchFilterStore } from '../_store/restaurant';
import { MAINCOLOR } from '../_constants/color';

const SearchFilter = () => {
  const { search, setSearch } = useSearchFilterStore();

  return (
    <div className="flex flex-row gap-2 my-4">
      <div className="flex justify-center items-center gap-2 w-full">
        <CiSearch className="w-6 h-6 " />
        <input
          type="search"
          onChange={(e) => setSearch({ ...search, q: e.target.value })}
          placeholder="식당 이름"
          className={`p-4 text-sm block w-full text-gray-800 border  border-gray-300 rounded-lg bg-gray-50 outline-none focus:border-[text-[${MAINCOLOR}]`}
        />
      </div>
      <select
        onChange={(e) => setSearch({ ...search, district: e.target.value })}
        className={`outline-none block w-full p-3 bg-gray-50 border border-gray-300 text-gray-800 text-sm md:max-w-[200px] rounded-lg focus:border-[${MAINCOLOR}]`}
      >
        <option value="">지역 선택</option>
        {DISTRICT.map((data) => (
          <option value={data} key={data}>
            {data}
          </option>
        ))}
      </select>
    </div>
  );
};
export default SearchFilter;
