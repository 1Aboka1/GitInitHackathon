import {ReactElement, ReactNode} from "react"
import Footer from "../../components/layouts/home/layoutComponents/Footer"
import { CiDumbbell, CiLogout } from 'react-icons/ci'
import { AiOutlineForm } from 'react-icons/ai'
import Navbar from "../../components/layouts/home/layoutComponents/Navbar"
import MainLayout from "../../components/layouts/home/MainLayout"
import {Button, MenuItem, Select, TextField} from "@mui/material"
import { useSession} from "next-auth/react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { AnimatePresence, motion } from "framer-motion"
import {useEffect, useState} from "react"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {trpc} from "../../utils/trpc"

const WorkoutPlan = () => {
    const router = useRouter()
    const { data: session, status } = useSession()

    const [userId, setUserId] = useState('')
    const userInfo = trpc.auth.getUserInfo.useQuery({ userId: userId })
    
    useEffect(() => {
	session?.user?.id ? setUserId(session?.user?.id) : null
    }, [session?.user?.id])

    return (
	<div className="bg-black min-h-screen pt-8">
	    <div className="w-[1100px] mx-auto bg-black flex flex-row space-x-4">
		<Sidebar/>
		<form className="flex flex-col space-y-5 min-h-screen grow">
		    <div className="flex flex-col space-y-2">
			<h1 className="text-white font-semibold text-3xl">Workout Plan</h1>
			<h1 className="text-gray-400 font-medium text-md">You can edit you workout plan</h1>
		    </div>
		    <div className="bg-special-slate-component rounded-xl space-y-5">
			<div className="space-y-5">
			</div>
		    </div> 
		</form>
	    </div>
	</div>
    )
}

const Sidebar = () => {
    return (
	<div className="bg-black sticky px-4 space-y-4 basis-1/4 min-h-screen">
	    <h1 className="font-semibold text-2xl text-white">Profile</h1>
	    <div className="flex flex-col space-y-2 text-gray-200">
		{Tabs.map((tab) => <Tab key={tab.name} name={tab.name} icon={tab.icon} url={tab.url}/>)}
	    </div>
	</div>
    )
}

const Tabs = [
    {
	name: 'My Workout Plan',
	icon: <CiDumbbell color="white" size={30}/>,
	url: '/profile/workoutPlan',
    },
    {
	name: 'Edit my details',
	icon: <AiOutlineForm color="white" size={25}/>,
	url: '/profile/edit_profile',
    },
    {
	name: 'Logout',
	icon: <CiLogout color="white" size={30}/>,
	url: '/signOut',
    },
]

const Tab = ({name, icon, url}: {name: string, icon: ReactNode, url: string}) => {
    const router = useRouter()

    return (
	<motion.div 
	    className="flex flex-row relative py-2 space-x-3 items-center cursor-pointer group"
	    onClick={() => { router.push(url) }}
	>
	    <div className="rounded-full z-10 w-8 h-8 items-center justify-center flex">
		{icon}
	    </div>
	    <h1 className="group-hover:text-gray-100 z-10 transition duration-300 ease-in-out">{name}</h1>
	    {
		url === router.pathname ?
		(
		    <motion.div 
			className="absolute bg-gradient-to-r from-black to-blue-900 w-60 rounded-tr-3xl rounded-br-3xl h-full z-0"
			initial={{ left: -500 }}
			animate={{ left: -50 }}
			transition={{ duration: 1 }}
		    />
		) : null
	    }
	</motion.div>
    )
}

WorkoutPlan.getLayout = function getLayout(page: ReactElement) {
    return (
	<>
	    <Navbar/>
	    <MainLayout>
		{page}
	    </MainLayout>
	    <Footer/>
	</>
    )
}

export default WorkoutPlan
