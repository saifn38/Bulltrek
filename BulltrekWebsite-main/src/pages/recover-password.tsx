import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { PasswordInput } from "@/components/ui/password-input"
import { NewPasswordInput, newPasswordSchema } from "@/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


const RecoverPasswordPage = () => {

    const form = useForm<NewPasswordInput>({
        resolver: zodResolver(newPasswordSchema),
        defaultValues: {
          confirmPassword: '',
          newPassword: '',
        },
      })
    
      function onSubmit(values: NewPasswordInput) {
        console.log(values)
      }
    

  return (
    <div className="flex flex-col gap-8 items-center h-full w-full">
      <h1 className="font-medium text-[32px] text-center pt-16">Recover Password</h1>
        <div className="flex flex-col items-center p-16  w-full"> 
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-20 max-w-4xl w-full items-center ">
                    <div className="flex max-w-xl w-full flex-col gap-4 ">
                        <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                <PasswordInput placeholder="Password" className="rounded-lg px-[28px]  py-[24px] text-[16px] text-greyText"  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Re-Enter Password</FormLabel>
                                <FormControl>
                                <PasswordInput placeholder="Re-Enter password" className="rounded-lg px-[28px] py-[24px] text-[16px] text-greyText"  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                            />
                    </div>

                <Button type="submit" className="max-w-xl w-full border-none text-[20px] shadow-none bg-secondary-50 text-white py-6">Confirm</Button>
            </form>
            </Form>
        
        </div>
    </div>
  )
}

export default RecoverPasswordPage