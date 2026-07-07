export const MENU_ITEMS = [
  { id: 'home', label: 'Home', href: '/', sectionId: null, defaultVisible: true },
  { id: 'about', label: 'About', href: '/#about', sectionId: 'about', defaultVisible: true },
  { id: 'services', label: 'Services', href: '/#services', sectionId: 'services', defaultVisible: true },
  { id: 'technologies', label: 'Technologies', href: '/#technologies', sectionId: 'technologies', defaultVisible: true },
  { id: 'portfolio', label: 'Portfolio', href: '/#portfolio', sectionId: 'portfolio', defaultVisible: true },
  { id: 'blog', label: 'Blog', href: '/blog', sectionId: 'blog', defaultVisible: true },
  { id: 'careers', label: 'Careers', href: '/careers', sectionId: 'careers', defaultVisible: false },
  { id: 'contact', label: 'Contact', href: '/#contact', sectionId: 'contact', defaultVisible: true },
];

export const menuSettingKey = id => `menu_show_${id}`;

export const getDefaultMenuVisibility = () =>
  Object.fromEntries(MENU_ITEMS.map(item => [item.id, item.defaultVisible]));

export const buildNavLinks = (menuVisibility = {}) =>
  MENU_ITEMS.filter(item => menuVisibility[item.id] !== false).map(({ label, href }) => ({ label, href }));

export const isMenuVisible = (menuVisibility, id) => menuVisibility[id] !== false;
