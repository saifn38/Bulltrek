import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Pencil } from 'lucide-react'
import { useLocation, useNavigate } from "react-router-dom"
import SupportTicket from "@/components/support/chat"

export default function SupportPage() {
  const tickets = [
    {
      sno: 1,
      ticketId: "1234GHY",
      concern: "Not able to create...",
      createdDate: "12 Jan, 2024",
      mailId: "abc@gmail.com",
      category: "General",
      status: "Resolved"
    },
    {
      sno: 2,
      ticketId: "1234GHY",
      concern: "Not able to create...",
      createdDate: "12 Jan, 2024",
      mailId: "abc@gmail.com",
      category: "General",
      status: "In-Progress"
    },
    {
      sno: 3,
      ticketId: "1234GHY",
      concern: "Not able to create...",
      createdDate: "12 Jan, 2024",
      mailId: "abc@gmail.com",
      category: "General",
      status: "Resolved"
    },
    {
      sno: 4,
      ticketId: "1234GHY",
      concern: "Not able to create...",
      createdDate: "12 Jan, 2024",
      mailId: "abc@gmail.com",
      category: "General",
      status: "Resolved"
    }
  ]

  const pathName = useLocation().pathname

  const faqs = [
    { question: "How to perform Backtesting?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inci didunt ut labore et dolore magn" },
    ...Array(8).fill({ question: "How to create a Strategy Bot?", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor inci didunt ut labore et dolore magn" })
  ]

  const router = useNavigate()

  return (
    <div className="flex gap-10 px-6 py-4">
      {pathName === "/support" && <div className="flex-1 space-y-6">
            
        <h2 className="text-[24px] font-semibold">Ticket History</h2>

        <Card className="border overflow-hidden">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-[#4A0404] text-white  hover:bg-[#4A0404]/90 p-4">
                  <TableHead className="text-white">S.no</TableHead>
                  <TableHead className="text-white">Ticket ID</TableHead>
                  <TableHead className="text-white">Concern</TableHead>
                  <TableHead className="text-white">Created Date</TableHead>
                  <TableHead className="text-white">Mail Id</TableHead>
                  <TableHead className="text-white">Category</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket, rowIndex) => (
                    <TableRow key={ticket.sno}>
                    {Object.entries(ticket).map(([key, value], cellIndex) => (
                        <TableCell
                        onClick={() => router("/ticket-chat") }
                        key={key}
                        className={`${
                            rowIndex === tickets.length - 1 ? "" : "border-b-2"
                        } ${
                            cellIndex === Object.entries(ticket).length - 1 ? "" : "border-r-2"
                        } cursor-pointer`}
                        >
                        {key === "status" ? (
                            <div className="flex items-center gap-2">
                            <div
                                className={`h-2 w-2 rounded-full ${
                                ticket.status === "Resolved" ? "bg-green-500" : "bg-purple-500"
                                }`}
                            />
                            {value}
                            </div>
                        ) : (
                            value
                        )}
                        </TableCell>
                    ))}
                </TableRow>
  ))}
</TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="p-6 bg-white">
          <h2 className="text-lg font-medium mb-4">Raise New Ticket</h2>
          <div className="flex gap-4 flex-col ">
            <div className="flex gap-6">
            <div className="">
              <label className="block text-sm mb-2">Category</label>
              <Select >
                <SelectTrigger className="w-full min-w-[20rem] border">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="technical">Technical</SelectItem>
                  <SelectItem value="billing">Billing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <div className="flex items-center gap-2">
              <label className="block text-sm">Email</label>
                <Button variant="ghost" size="icon">
                <Pencil className="h-4 w-4" />
                </Button>
                
              </div>
                <p>namename1@gmail.com</p>
            </div>
            </div>
            <div>
              <label className="block text-sm mb-2">Reason</label>
              <Textarea placeholder="Type your concern here..." className="!border outline-none"  />
            </div>
            <div className="w-full">
            <Button className="bg-[#4A0404] hover:bg-[#4A0404]/90 text-white">Submit Request</Button>
            </div>
          </div>
        </Card>
      </div>}


     {pathName === "/ticket-chat" && <div className="flex-1 ">
          <SupportTicket />
        </div>  
      }

      <div className="w-80 border bg-white p-6 rounded-xl">
        <h2 className="text-lg font-medium mb-4">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="space-y-2">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

