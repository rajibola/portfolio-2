import {Link} from 'react-router-dom';
import {useDarkMode} from '../../hooks';

export const NavBar = () => {
  const [colorTheme, setTheme] = useDarkMode();
  return (
    <div>
      <ul className="flex items-center justify-around h-11">
        <Link to="/signup">SignUp screen</Link>
        <Link to="/transactions">Transaction screen</Link>
        <Link to="/operations">Operation screen</Link>
        <div
          className="px-3 py-1 rounded cursor-pointer"
          onClick={() => setTheme(colorTheme)}>
          Change mode
        </div>
      </ul>
    </div>
  );
};
