import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { PhoneInput } from "@/components/ui/phone-number-input";
import { useAuth } from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { RegisterInput, registerSchema } from "../schema";
import { toast } from "react-hot-toast";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const { register } = useAuth();

  const registerForm = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      mobile: "",
      password: "",
      password_confirmation: "",
    },
  });

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, navigate]);

  async function onSubmit(values: RegisterInput) {
    try {
      await register.mutateAsync(values);
      setShowSuccess(true);
      toast.success("Registration successful!");
      setTimeout(() => {
        toast.success(
          "validation mail has been sent to your registered email",
          { duration: 4000 }
        );
      }, 1000);
    } catch (error: any) {
      // Log the error response for debugging
      console.log("Registration error:", error?.response);

      // Extract message
      const message = error?.response?.data?.message;

      // Check for user already exists error
      const isDuplicate =
        error?.response?.status === 422 &&
        message &&
        typeof message === "object" &&
        Object.values(message)
          .flat()
          .some(
            (msg) =>
              typeof msg === "string" &&
              (msg.toLowerCase().includes("already taken") ||
                msg.toLowerCase().includes("already exists") ||
                msg.toLowerCase().includes("duplicate") ||
                msg.toLowerCase().includes("taken") ||
                msg.toLowerCase().includes("user exists") ||
                msg.toLowerCase().includes("email exists"))
          );

      if (isDuplicate) {
        toast.error(
          "User already exists. Please login or use a different email/mobile."
        );
      } else if (typeof message === "string") {
        toast.error(message);
      } else if (typeof message === "object") {
        // Show first error message from object
        const firstMsg = Object.values(message).flat()[0];
        if (typeof firstMsg === "string") {
          toast.error(firstMsg);
        } else {
          toast.error("Registration failed. Please try again.");
        }
      } else {
        toast.error("Registration failed. Please try again.");
      }
    }
  }

  if (showSuccess) {
    return (
      <div className="flex flex-col gap-8 items-center justify-center h-full w-full">
        <h1 className="font-medium text-[32px] text-center">
          Registration Successful!
        </h1>
        <p className="text-center text-[#525252]">
          Please check your email to activate your account.
        </p>
        <p className="text-center text-[#8F8F8F]">
          Redirecting to login page in 5 seconds...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 items-center h-full w-full justify-center">
      <h1 className="font-medium text-[32px] text-center pt-16">Register</h1>
      <div className="flex justify-center w-full">
        <Form {...registerForm}>
          <form
            onSubmit={registerForm.handleSubmit(onSubmit)}
            className="flex flex-col gap-10 items-center"
          >
            <div className="w-full flex flex-col gap-1">
              <div className="flex gap-4 w-full">
                <FormField
                  control={registerForm.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter First Name"
                          className="rounded-lg px-[28px] w-[19rem] py-[24px] text-[16px] text-greyText"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Last Name"
                          className="rounded-lg px-[28px] w-[19rem] py-[24px] text-[16px] text-greyText"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4">
                <FormField
                  control={registerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Email"
                          className="rounded-lg px-[28px] w-[19rem] py-[24px] text-[16px] text-greyText"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <PhoneInput
                          defaultCountry="IN"
                          placeholder="Enter Mobile Number"
                          className="rounded-lg w-[19rem] h-full text-[16px] text-greyText"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4">
                <FormField
                  control={registerForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Enter Password"
                          className="rounded-lg px-[28px] w-[19rem] py-[24px] text-[16px] text-greyText"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="password_confirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <PasswordInput
                          placeholder="Re-Enter password"
                          className="rounded-lg px-[28px] w-[19rem] py-[24px] text-[16px] text-greyText"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full border-none text-[20px] shadow-none bg-secondary-50 text-white py-6"
              disabled={register.isPending}
            >
              {register.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Registering...</span>
                </div>
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </Form>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <p className="text-[#525252] text-[12px]">Or continue with</p>
        <div className="flex gap-4">
          <button className="border-none">
            <img src="/icons/google.svg" alt="Google login" />
          </button>
          <button className="border-none">
            <img src="/icons/facebook.svg" alt="Facebook login" />
          </button>
        </div>
        <Link to="/login" className="text-[#8F8F8F] text-[14px] underline">
          Already a User?
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
