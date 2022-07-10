import { ThreeDots } from 'react-loader-spinner';
import s from './Loader.module.css'
export const Loader = () => {
  return (
    <div className={s.loader}>
      <p><ThreeDots color="#00BFFF" height={80} width={80} /></p>
    </div>
  );
};
