interface Props {
  message?: string;
}

const ErrorMessage = ({ message }: Props) => {
  return (
    <div className="mx-auto h-screen w-full pt-[15%] text-center font-semibold text-red-500">
      <div className="text-[40px]">❌</div>
      {message}
    </div>
  );
};

export default ErrorMessage;
