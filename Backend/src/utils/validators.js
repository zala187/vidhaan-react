const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateRegister({ name, email, password }) {
  const errors = [];

  if (!name || !name.trim()) {
    errors.push("Name is required.");
  }

  if (!email || !EMAIL_RE.test(email)) {
    errors.push("A valid email is required.");
  }

  if (!password || password.length < 6) {
    errors.push("Password must be at least 6 characters.");
  }

  return errors;
}

function validateLogin({ email, password }) {
  const errors = [];

  if (!email || !EMAIL_RE.test(email)) {
    errors.push("A valid email is required.");
  }

  if (!password) {
    errors.push("Password is required.");
  }

  return errors;
}

module.exports = {
  validateRegister,
  validateLogin,
};