import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { useAuth } from "@/hooks/useAuth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { LoginInput, loginSchema } from "../schema"
import { toast } from "react-hot-toast"

const LoginPage = () => {
  const { login } = useAuth()

  const loginForm = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false
    },
  })

  async function onSubmit(values: LoginInput) {
    try {
      await login.mutateAsync({
        email: values.email,
        password: values.password
      })
      toast.success("Login Successfull, Please wait while we prepare your dashboard")
      if (values.rememberMe) {
        // Implement remember me logic if needed
      }
    } catch (error: any) {
      if (error?.response?.status === 404 || error?.response?.data?.message?.toLowerCase().includes("not found")) {
        toast.error("Account does not exist. Please check your email or register.")
      } else if (error?.response?.data?.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error("Login failed. Please try again.")
      }
      console.error("Login error:", error)
    }
  }

  return (
    <div className="flex flex-col gap-8 justify-center items-center h-full w-full">
      <h1 className="font-medium text-[32px] text-center">Login</h1>
      <div className="flex justify-center w-full"> 
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(onSubmit)} className="w-[25rem] flex flex-col gap-10 items-center">
            <div className="w-full flex flex-col gap-1">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter email/username" 
                        className="rounded-lg px-[28px] py-[24px] text-[16px] text-greyText" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput 
                        placeholder="Enter Password" 
                        className="rounded-lg px-[28px] py-[24px] text-[16px] text-greyText"  
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between items-center">
                <FormField
                  control={loginForm.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <label className="flex gap-2 items-center text-greyText">
                          <Input 
                            type="checkbox" 
                            className="w-4 border-2 border-[#8F8F8F]" 
                            checked={field.value} 
                            onChange={(e) => field.onChange(e.target.checked)}
                          />
                          <span className="text-[#8F8F8F] text-[14px]">Remember me</span>
                        </label>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Link to="/forgot-password" className="text-[#8F8F8F] text-[14px] underline">
                  Forgot Password?
                </Link>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full border-none text-[20px] shadow-none bg-secondary-50 text-white py-6"
              disabled={login.isPending}
            >
              {login.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Logging in...</span>
                </div>
              ) : (
                "Login"
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
        <Link to="/register" className="text-[#8F8F8F] text-[14px] underline">
          New User?
        </Link>
      </div>
    </div>
  )
}

export default LoginPage