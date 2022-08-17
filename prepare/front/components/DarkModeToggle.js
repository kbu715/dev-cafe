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
      onColor="#87ceeb"
      offColor="#02012c"
      handleDiameter={18}
      uncheckedIcon={
        <span
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 1,
            fontSize: 12,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          🌙
        </span>
      }
      checkedIcon={
        <span
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 1,
            fontSize: 12,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          🌞
        </span>
      }
    />
  );
};

export default DarkModeToggle;
