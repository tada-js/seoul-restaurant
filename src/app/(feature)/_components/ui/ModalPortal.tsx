import reactDom from 'react-dom';

interface Props {
  children: React.ReactNode;
}

const ModalPortal = ({ children }: Props) => {
  if (typeof window === 'undefined') {
    // SSR이 될 때는 처리해주지 않음. 브라우저 환경이 아니라면 아무것도 반환하지 않음.
    return null;
  }

  const node = document.getElementById('portal') as Element;
  return reactDom.createPortal(children, node); // children을 node(div id="portal")에 연결
};

export default ModalPortal;
