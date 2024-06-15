import { Link } from 'react-router-dom';

interface Props {
  path: string;
  where: string;
}

const NavigationFooter = ({ path, where }: Props) => {
  return (
    <p className="text-white text-xs mx-auto mt-2">
      Click{' '}
      <Link
        to={path}
        className="text-primary-yellow underline hover:no-underline hover:opacity-80"
      >
        here
      </Link>{' '}
      to {where}
    </p>
  );
};

export default NavigationFooter;
