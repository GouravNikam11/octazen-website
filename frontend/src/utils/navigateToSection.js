export function navigateToSection(e, navigate, currentPath, href) {
  e.preventDefault();
  if (!href.includes('#')) {
    navigate(href);
    return;
  }
  const [path, hash] = href.split('#');
  const targetPath = path || '/';
  if (currentPath !== targetPath) {
    navigate(targetPath);
    setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 400);
  } else {
    document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
  }
}
