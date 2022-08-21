export type ThemeType = {
  body: string;
  text: string;
  mainColor: string;
  itemBackground: string;
};

const lightTheme: ThemeType = {
  body: '#fcfcfc',
  text: '#363537',
  mainColor: '#8e44ad',
  itemBackground: '#fcfcfc',
};

const darkTheme: ThemeType = {
  body: '#252424',
  text: '#fafafa',
  mainColor: '#8e44ad',
  itemBackground: '#333333',
};

export { lightTheme, darkTheme };
