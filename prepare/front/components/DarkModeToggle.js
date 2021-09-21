import React, { useState, useContext, useEffect } from 'react';
import Switch from 'react-switch';
import { ThemeContext } from '../pages/_app';
import { lightTheme } from '../theme';

const DarkModeToggle = () => {
  const [checked, setChecked] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (theme === lightTheme) setChecked(false);
    else setChecked(true);
  }, [theme]);

  return (
    <Switch
      checked={checked}
      onChange={toggleTheme}
      onColor="#464646"
      offColor="#464646"
      handleDiameter={20}
      width={46}
      height={22}
      uncheckedIcon={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            fontSize: 14,
          }}
        >
          <span role="img" aria-label="darkMode">
            ⚫
          </span>
        </div>
      }
      checkedIcon={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            fontSize: 14,
          }}
        >
          <span role="img" aria-label="lightMode">
            🟡
          </span>
        </div>
      }
    />
  );
};

export default DarkModeToggle;
