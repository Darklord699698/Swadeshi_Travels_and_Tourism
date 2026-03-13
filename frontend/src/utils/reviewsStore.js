export const getReviews = () => 
  JSON.parse(localStorage.getItem('bharatTrailsReviews') || '[]');

export const saveReviews = (reviews) => 
  localStorage.setItem('bharatTrailsReviews', JSON.stringify(reviews));

export const getReviewsForPackage = (packageName) =>
  getReviews().filter(r => r.packageName?.toLowerCase() === packageName?.toLowerCase());

export const addReview = (review) => {
  const reviews = getReviews();
  reviews.unshift(review);
  saveReviews(reviews);
};