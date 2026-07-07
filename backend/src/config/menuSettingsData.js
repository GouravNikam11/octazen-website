const MENU_ITEMS = [
  { id: 'home', label: 'Home', defaultVisible: true },
  { id: 'about', label: 'About', defaultVisible: true },
  { id: 'services', label: 'Services', defaultVisible: true },
  { id: 'technologies', label: 'Technologies', defaultVisible: true },
  { id: 'portfolio', label: 'Portfolio', defaultVisible: true },
  { id: 'blog', label: 'Blog', defaultVisible: true },
  { id: 'careers', label: 'Careers', defaultVisible: false },
  { id: 'contact', label: 'Contact', defaultVisible: true },
];

const menuSettingKey = id => `menu_show_${id}`;

const getDefaultMenuSettings = () =>
  MENU_ITEMS.map(item => ({
    key: menuSettingKey(item.id),
    value: item.defaultVisible,
    group: 'menu',
    label: `Show ${item.label}`,
  }));

module.exports = { MENU_ITEMS, menuSettingKey, getDefaultMenuSettings };
