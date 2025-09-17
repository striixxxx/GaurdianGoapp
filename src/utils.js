// src/utils.js

// Format a date to DD/MM/YYYY
export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN");
}

// Generate a random ID
export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}
export function createPageUrl(pageName) {
  if (!pageName) return '/';
  return `/${pageName.toLowerCase()}`;
}
// Check if a string is empty or only spaces
export function isEmpty(str) {
  return !str || str.trim().length === 0;
}
