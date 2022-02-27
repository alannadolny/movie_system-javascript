import { useTranslation } from 'react-i18next';

function LanguageButton() {
  const { i18n } = useTranslation();

  const setInitialLanguage = () => {
    if (localStorage.getItem('language') === 'en') return false;
    else return true;
  };

  const changeLanguage = () => {
    if (localStorage.getItem('language') === 'en') {
      i18n.changeLanguage('pl');
      localStorage.setItem('language', 'pl');
    } else {
      i18n.changeLanguage('en');
      localStorage.setItem('language', 'en');
    }
  };

  return (
    <div id='slider'>
      <label className='switch'>
        <input
          type='checkbox'
          defaultChecked={setInitialLanguage()}
          onChange={() => changeLanguage()}
        />
        <span className='slider round'></span>
      </label>
    </div>
  );
}

export default LanguageButton;
