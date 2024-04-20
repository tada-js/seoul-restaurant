interface Props {
  message?: string;
}

const FormErrorMesssage = ({ message }: Props) => {
  return <div className="pt-2 text-sm text-red-500 ml-2">{message}</div>;
};

export default FormErrorMesssage;
