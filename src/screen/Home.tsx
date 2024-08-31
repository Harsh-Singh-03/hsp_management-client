import { CreatePatientFrom } from "@/components/admin/form/create-patient"
import { OnboardingForm } from "@/components/admin/form/onboard-form"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Link } from "react-router-dom"

export const Home = () => {
    return (
        <div className='relative w-screen min-h-[100svh] flex flex-col z-10'>
            <img src='/home-bg.svg' alt="Banner" className="object-cover z-[-1] w-full h-full absolute top-0 left-0" />

            <div className="z-10 flex items-center justify-between px-4 py-2 bg-white/90">
                <div className="flex items-center gap-1">
                    <img src="/logo.png" alt="logo" className="object-contain w-10 h-10" />
                    <h4 className="text-xl font-semibold tracking-wide text-neutral-700">Hospitality</h4>
                </div>
                <Button asChild>
                    <Link to='/admin/login'>Access Panel</Link>
                </Button>
            </div>

            <div className="z-10 flex flex-col justify-between flex-1 w-full gap-10 p-4 lg:flex-row">
                <div className="lg:ml-10 lg:mt-10" >
                    <div className="flex flex-col gap-4 p-4 rounded lg:p-6 ">
                        <h1 className="text-4xl font-bold tracking-wide text-neutral-800">Welcome to Hospitality</h1>
                        <p className="text-lg font-medium text-neutral-600">
                            Our hospital management system streamlines healthcare processes, enabling efficient patient and doctor management,
                            ensuring seamless operations, and enhancing the overall care experience.
                        </p>
                        <div className="flex items-center gap-4">
                            <Button size="lg" variant='primary' asChild>
                                <Link to='/patient/login'>Access Patient</Link>
                            </Button>
                            <Button size="lg" variant='default' asChild>
                                <Link to='/doctor/login'>Access Docter</Link>
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="min-w-[50%] z-10 lg:mt-10">
                    <Tabs defaultValue="patient" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="patient">Resgister As Patient</TabsTrigger>
                            <TabsTrigger value="doctor">Register As Doctor</TabsTrigger>
                        </TabsList>
                        <TabsContent value="patient" className="pt-2 rounded-md bg-neutral-100">
                            <CreatePatientFrom isHome={true} />
                        </TabsContent>
                        <TabsContent value="doctor" className="pt-2 rounded-md bg-neutral-100">
                            <OnboardingForm isHome={true} />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}