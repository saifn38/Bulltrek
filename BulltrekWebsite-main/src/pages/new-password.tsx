import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


const NewPasswordPage = () => {
  return (
    <div className="flex flex-col gap-8 items-center h-full w-full">
      <h1 className="font-medium text-[32px] text-center pt-16">New Password</h1>
        <div className="flex flex-col items-center gap-20 p-16  w-full"> 
            <p className="text-center text-greyText font-medium text-[14px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut architecto sequi sed amet aliquam sit corrupti at perspiciatis culpa, neque incidunt. Illo officia similique consequatur dolore est voluptas quod mollitia!
            </p>
            <Input placeholder="Enter code" className="rounded-lg px-[28px] max-w-xl py-[24px] text-[16px] text-greyText" />
            <Button className="max-w-xl w-full border-none text-[20px] shadow-none bg-secondary-50 text-white py-6">Submit</Button>
        </div>
    </div>
  )
}

export default NewPasswordPage