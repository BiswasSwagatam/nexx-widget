import { useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import tailwindStyles from "../index.css?inline"
import supabase from "@/supabaseClient"

export const Widget = ({projectId}) => {

    const [rating, setRating] = useState(3)
    const [submitted, setSubmitted] = useState(false)

    const onSelectStar = (index) => {
        setRating(index + 1)
    }

    const submit = async (e) => {
        e.preventDefault()
        const form = e.target
        const data = {
            p_project_id: projectId, 
            p_user_name: form.name.value,
            p_user_email: form.email.value,
            p_message: form.feedback.value,
            p_rating: rating
        }
        const {data: returnedData, error} = await supabase.rpc("add_feedback", data)
        setSubmitted(true)
        console.log(returnedData)
    }

    return (
        <>
        <style>{tailwindStyles}</style>
        <div className="widget fixed bottom-4 right-4 z-50">
            <Popover>
            <PopoverTrigger asChild>
            <Button className='rounded-full shadow-lg
                hover:scale-105'>
                    <MessageCircleIcon className='mr-1 h-5 w-5'/>
                    Feedback</Button>
            </PopoverTrigger>
            <PopoverContent className='widget rounded-lg bg-card p-4 shadow-lg w-full max-w-md'>
            <style>{tailwindStyles}</style>
               { submitted ? (<div>
                    <h3 className="text-lg font-bold">Thank you!</h3>
                    <p className="text-sm">We appreciate your feedback.</p>
               </div>) 
               :
                <div>
                    <h3 className="text-lg font-bold">Send us your feedback</h3>
                    <form className="space-y-2" onSubmit={submit}>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input id='name' placeholder="Your name"/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id='email' type="email" placeholder="Your email"/>
                            </div>
                        </div>
                        
                        <div>
                            <Label htmlFor="feedback">Feedback</Label>
                            <Textarea 
                            id='feedback' 
                            placeholder="Tell us what you think"
                            className='min-h-[100px]'/>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                {[...Array(5)].map((_, index) => (
                                    <StarIcon key={index} 
                                    className={`h-5 w-5 cursor-pointer ${index < rating ? "fill-primary" : "fill-muted stroke-muted-foreground"}`}
                                    onClick={() => onSelectStar(index)} />
                                ))}
                            </div>
                            <Button type="submit">Submit</Button>
                        </div>
                        
                    </form>
                </div>}
            </PopoverContent>
                
            </Popover>
          
        </div>
        </>
    ) 
}

function StarIcon(props) {
    return (<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)
}

function MessageCircleIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
    )
}