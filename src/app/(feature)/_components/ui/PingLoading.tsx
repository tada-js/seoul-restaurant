interface Props {
  mapLoading?: boolean;
}

const PingLoading = ({ mapLoading }: Props) => {
  return (
    <div
      className={`flex gap-4 justify-center ${
        mapLoading ? 'pt-[20%] items-center' : 'mb-10'
      }`}
    >
      <div className={`w-2 h-2 animate-ping rounded-full bg-[#038C7F]`} />
      <div className={`w-2 h-2 animate-ping rounded-full bg-[#038C7F]`} />
      <div className={`w-2 h-2 animate-ping rounded-full bg-[#038C7F]`} />
    </div>
  );
};

export default PingLoading;
