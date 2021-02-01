import slugify from 'slugify';

export const slugifyTitle = (title) => {
  // ou bien on aurait pu regarder la doc de slugify pour qu'il remplace les _
  const modifiedTitle = title.replace('_', '-').replace('&', '');

  return slugify(modifiedTitle, { lower: true });
};

// transforme un titre de recette en slug et ajoute devant /recipe/
export const buildTripURL = (title) => `/exploration/${slugifyTitle(title)}`;

// trouver une recette selon son slug
// je veux trouver dans mon tableau de recettes...
// la recette dont le titre, une fois transformé en slug...
// est égal au 2eme parametre (slug)
export const getTripBySlug = (trips, slug) => (
  trips.find((trip) => slugifyTitle(trip.title) === slug)
);
