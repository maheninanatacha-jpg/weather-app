export async function getIcon(name) {
  try {
    const module = await import(`./icons/${name}.svg`);
    return module.default; // l'URL du fichier
  } catch {
    return null; // icône inconnue : on n'affiche rien
  }
}
