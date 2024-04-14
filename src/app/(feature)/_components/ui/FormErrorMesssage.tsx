interface Props {
  name: string;
}

const FormErrorMesssage = ({ name }: Props) => {
  return (
    <div className="pt-2 text-sm text-red-500 ">{name} 입력해 주세요.</div>
  );
};

export default FormErrorMesssage;
