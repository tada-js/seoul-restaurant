import { SUBCOLOR } from 'app/(feature)/_constants/color';

interface Props {
  mapLoading?: boolean;
}

const PingLoading = ({ mapLoading }: Props) => {
  return (
    <div
      className={`flex gap-4 justify-center ${
        mapLoading ? 'h-dvh items-center' : 'mt-10'
      }`}
    >
      <div className={`w-2 h-2 animate-ping rounded-full bg-[${SUBCOLOR}]`} />
      <div className={`w-2 h-2 animate-ping rounded-full bg-[${SUBCOLOR}]`} />
      <div className={`w-2 h-2 animate-ping rounded-full bg-[${SUBCOLOR}]`} />
    </div>
  );
};

export default PingLoading;
