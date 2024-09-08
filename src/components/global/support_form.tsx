import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { support_api } from "@/lib/api";
import { toast } from "react-toastify";

// Schema for validation using Zod
const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
    query: z.string().min(10, { message: "Query must be at least 10 characters." }),
});

export const HelpSupportForm = ({ initialValue }: { initialValue?: { name: string, email: string, phone: string } }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Initialize React Hook Form with Zod schema validation
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialValue?.name || '',
            email: initialValue?.email || '',
            phone: initialValue?.phone || '',
            query: '',
        },
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsSubmitting(true);
        // await onSubmit(values);
        const data = await support_api.create(values)
        if (data.success) {
            form.reset();
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
        setIsSubmitting(false);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 text-black rounded lg:space-y-6 lg:p-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Your email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                                <Input type="tel" placeholder="Your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="query"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Query</FormLabel>
                            <FormControl>
                                <Textarea rows={4} placeholder="Describe your issue" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-4">
                    <Button type="submit" disabled={isSubmitting} variant='primary'>
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};
