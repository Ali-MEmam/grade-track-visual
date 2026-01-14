import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/atoms/Card/Card";
import { Button } from "@/components/atoms/Button/Button";
import { FormInput } from "@/components/molecules/FormInput/FormInput";
import { Eye, EyeOff, Lock, AlertCircle } from "lucide-react";
import { useChangePassword } from "@/components/pages/Auth/apis/useChangePassword";

export const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [validationError, setValidationError] = useState("");

  const changePasswordMutation = useChangePassword();

  const validatePassword = (password: string): string => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    // Validate password strength
    const passwordError = validatePassword(formData.newPassword);
    if (passwordError) {
      setValidationError(passwordError);
      return;
    }

    // Check if passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    changePasswordMutation.mutate({
      newPassword: formData.newPassword,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setValidationError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark:bg-gradient-to-br dark:from-background dark:via-background dark:to-muted/20 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Change Password</CardTitle>
          <CardDescription>
            You're using a temporary password. Please set a new password to
            continue.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Validation Error Alert */}
            {validationError && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-md p-3 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{validationError}</p>
              </div>
            )}

            {/* New Password */}
            <div className="relative">
              <FormInput
                label="New Password"
                id="newPassword"
                name="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your new password"
                value={formData.newPassword}
                onChange={handleChange}
                isRequired
                className="w-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <FormInput
                label="Confirm Password"
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                isRequired
                className="w-full pr-10"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Password Requirements */}
            <div className="bg-muted/50 rounded-md p-3 text-sm space-y-1">
              <p className="font-medium text-foreground mb-2">
                Password must contain:
              </p>
              <ul className="space-y-1 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span
                    className={
                      formData.newPassword.length >= 8
                        ? "text-green-600"
                        : "text-muted-foreground"
                    }
                  >
                    •
                  </span>
                  At least 8 characters
                </li>
                <li className="flex items-center gap-2">
                  <span
                    className={
                      /[A-Z]/.test(formData.newPassword)
                        ? "text-green-600"
                        : "text-muted-foreground"
                    }
                  >
                    •
                  </span>
                  One uppercase letter
                </li>
                <li className="flex items-center gap-2">
                  <span
                    className={
                      /[a-z]/.test(formData.newPassword)
                        ? "text-green-600"
                        : "text-muted-foreground"
                    }
                  >
                    •
                  </span>
                  One lowercase letter
                </li>
                <li className="flex items-center gap-2">
                  <span
                    className={
                      /[0-9]/.test(formData.newPassword)
                        ? "text-green-600"
                        : "text-muted-foreground"
                    }
                  >
                    •
                  </span>
                  One number
                </li>
              </ul>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={changePasswordMutation.isPending}
            >
              {changePasswordMutation.isPending
                ? "Changing Password..."
                : "Change Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
