export const getPasswordStrength = (password: string) => {
  if (!password) return 0;

  let strength = 0;

  if (password.length >= 8) strength++;
  if (password.length >= 12) strength++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++; // contains lowercase and uppercase letters
  if (/\d/.test(password) && /[^A-Za-z0-9]/.test(password)) strength++; // contains digit and special character

  return strength as 0 | 1 | 2 | 3 | 4;
};

export const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong"] as const;
export const COLORS = [
  "bg-app-neutral-700",
  "bg-app-red",
  "bg-app-amber-400",
  "bg-app-lime-500",
  "bg-app-lime-500",
];
export const TEXT_COLORS = [
  "text-app-neutral-700",
  "text-app-red",
  "text-app-amber-400",
  "text-app-lime-500",
  "text-app-lime-500",
];
