import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ru' | 'uz';

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  en: {
    'hero.title': 'LUMORA',
    'hero.subtitle': 'Ethereal Beats & Visual Dreams',
    'nav.settings': 'Settings',
    'settings.title': 'Account Settings',
    'settings.update': 'Update Profile',
    'settings.username': 'New Username',
    'settings.password': 'New Password',
    'settings.success': 'Profile updated successfully',
    'nav.music': 'Music',
    'nav.photos': 'Photos',
    'nav.about': 'About',
    'nav.members': 'Members',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.logout': 'Logout',
    'members.title': 'The Duo',
    'members.edit': 'Edit Profile',
    'comments.title': 'Comments',
    'comments.placeholder': 'Leave a comment...',
    'comments.submit': 'Post',
    'auth.login.title': 'Admin Login',
    'auth.username': 'Username',
    'auth.password': 'Password',
    'auth.submit': 'Enter',
    'auth.error': 'Invalid credentials',
    'nav.news': 'News',
    'nav.admin': 'Admin',
    'admin.dashboard': 'Dashboard',
    'admin.add_news': 'Add News',
    'admin.add_video': 'Add Video',
    'admin.add_photo': 'Add Photo',
    'news.title': 'Latest News',
    'form.title': 'Title',
    'form.description': 'Description',
    'form.image': 'Image URL',
    'form.video': 'Video URL',
    'form.submit': 'Publish',
    'latest.release': 'Latest Release',
    'listen.now': 'Listen Now',
    'about.title': 'Who We Are',
    'about.desc': 'Lumora is a creative duo transcending boundaries through music and visual art. We capture moments and melodies that resonate with the soul.',
    'gallery.title': 'Visual Diary',
    'footer.rights': '© 2024 Lumora. All rights reserved.'
  },
  ru: {
    'hero.title': 'LUMORA',
    'hero.subtitle': 'Эфирные Ритмы и Визуальные Мечты',
    'nav.settings': 'Настройки',
    'settings.title': 'Настройки аккаунта',
    'settings.update': 'Обновить профиль',
    'settings.username': 'Новое имя',
    'settings.password': 'Новый пароль',
    'settings.success': 'Профиль обновлен',
    'nav.music': 'Музыка',
    'nav.photos': 'Фото',
    'nav.about': 'О нас',
    'nav.members': 'Участники',
    'nav.login': 'Войти',
    'nav.register': 'Регистрация',
    'nav.logout': 'Выйти',
    'members.title': 'Участники',
    'members.edit': 'Ред. профиль',
    'comments.title': 'Комментарии',
    'comments.placeholder': 'Оставьте комментарий...',
    'comments.submit': 'Отправить',
    'auth.login.title': 'Вход для Админа',
    'auth.username': 'Имя пользователя',
    'auth.password': 'Пароль',
    'auth.submit': 'Войти',
    'auth.error': 'Неверные данные',
    'nav.news': 'Новости',
    'nav.admin': 'Админ',
    'admin.dashboard': 'Панель',
    'admin.add_news': 'Добавить новость',
    'admin.add_video': 'Добавить видео',
    'admin.add_photo': 'Добавить фото',
    'news.title': 'Новости',
    'form.title': 'Заголовок',
    'form.description': 'Описание',
    'form.image': 'Ссылка на фото',
    'form.video': 'Ссылка на видео',
    'form.submit': 'Опубликовать',
    'latest.release': 'Новый Релиз',
    'listen.now': 'Слушать',
    'about.title': 'Кто Мы',
    'about.desc': 'Lumora — это творческий дуэт, выходящий за рамки через музыку и визуальное искусство. Мы ловим моменты и мелодии, резонирующие с душой.',
    'gallery.title': 'Визуальный Дневник',
    'footer.rights': '© 2024 Lumora. Все права защищены.'
  },
  uz: {
    'hero.title': 'LUMORA',
    'hero.subtitle': 'Efir Ritmlari va Vizual Orzular',
    'nav.settings': 'Sozlamalar',
    'settings.title': 'Hisob sozlamalari',
    'settings.update': 'Profilni yangilash',
    'settings.username': 'Yangi foydalanuvchi nomi',
    'settings.password': 'Yangi parol',
    'settings.success': 'Profil yangilandi',
    'nav.music': 'Musiqa',
    'nav.photos': 'Rasmlar',
    'nav.about': 'Biz haqimizda',
    'nav.members': 'Ishtirokchilar',
    'nav.login': 'Kirish',
    'nav.register': 'Ro\'yxatdan o\'tish',
    'nav.logout': 'Chiqish',
    'members.title': 'Ishtirokchilar',
    'members.edit': 'Profilni tahrirlash',
    'comments.title': 'Izohlar',
    'comments.placeholder': 'Izoh qoldiring...',
    'comments.submit': 'Yuborish',
    'auth.login.title': 'Admin Kirish',
    'auth.username': 'Foydalanuvchi nomi',
    'auth.password': 'Parol',
    'auth.submit': 'Kirish',
    'auth.error': 'Noto\'g\'ri ma\'lumotlar',
    'nav.news': 'Yangiliklar',
    'nav.admin': 'Admin',
    'admin.dashboard': 'Boshqaruv',
    'admin.add_news': 'Yangilik qo\'shish',
    'admin.add_video': 'Video qo\'shish',
    'admin.add_photo': 'Rasm qo\'shish',
    'news.title': 'So\'nggi Yangiliklar',
    'form.title': 'Sarlavha',
    'form.description': 'Tavsif',
    'form.image': 'Rasm havolasi',
    'form.video': 'Video havolasi',
    'form.submit': 'Chop etish',
    'latest.release': 'Yangi Reliz',
    'listen.now': 'Tinglash',
    'about.title': 'Biz Kim',
    'about.desc': 'Lumora - musiqa va vizual san\'at orqali chegaralardan oshib o\'tuvchi ijodiy duet. Biz qalb bilan hamohang daqiqalar va ohanglarni muhrlaymiz.',
    'gallery.title': 'Vizual Kundalik',
    'footer.rights': '© 2024 Lumora. Barcha huquqlar himoyalangan.'
  }
};

const I18nContext = createContext<{
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
} | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('uz');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
