import './GlobalStyles.scss';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
// import 'swiper/css/effect-cube';
type Props = {
  children: any;
};
const GlobalStyles = ({ children }: Props) => {
  return children;
};
export default GlobalStyles;
