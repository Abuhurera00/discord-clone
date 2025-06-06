"use client"
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle } from "../ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FileUpload } from '../file-upload'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Server name is required."
    }),
    imageUrl: z.string().min(1, {
        message: "Server image is required."
    })
})

export const InitialModal = () => {

    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            imageUrl: "",
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post('/api/servers', values);

            form.reset();
            router.refresh();
            window.location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Dialog open>
            <DialogPortal>
                {/* semi‑transparent backdrop */}
                <DialogOverlay className="fixed inset-0 bg-black/50 z-40" />

                <DialogContent className="fixed inset-x-0 top-8 bottom-8 mx-auto max-w-lg -50 p-0 bg-white text-black rounded-lg overflow-hidden z-50">
                    <DialogHeader className="pt-8 px-6">
                        <DialogTitle className="text-2xl text-center font-bold">
                            Customize your server
                        </DialogTitle>
                        <DialogDescription className="text-center text-zinc-500">
                            Give your server a personality with a name and an image. You can always change it later.
                        </DialogDescription>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                            <div className="space-y-8 px-6">
                                <div className="flex items-center justify-center text-center">
                                    <FormField
                                        control={form.control}
                                        name='imageUrl'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <FileUpload
                                                        endpoint="serverImage"
                                                        value={field.value}
                                                        onChange={field.onChange}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel
                                                className='uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70'
                                            >
                                                Server name
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    disabled={isLoading}
                                                    className='bg-zinc-300 border border-zinc-300 text-black'
                                                    placeholder='Enter server name'
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <DialogFooter className='bg-gray-100 px-6 py-4'>
                                <Button variant="primary" disabled={isLoading}>
                                    Create
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
}
