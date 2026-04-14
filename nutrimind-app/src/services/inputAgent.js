/**
 * Input Agent
 * Responsibility: Captures, cleans, and validates user input.
 */
export const sanitizeInput = (text) => {
  if (!text) return "";
  return text.trim();
};

export const validateInput = (text) => {
  return text.length > 0;
};
