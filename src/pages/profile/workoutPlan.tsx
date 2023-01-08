import {ReactElement, ReactNode, useReducer} from "react"
import Footer from "../../components/layouts/home/layoutComponents/Footer"
import { CiDumbbell, CiLogout } from 'react-icons/ci'
import { AiOutlineForm } from 'react-icons/ai'
import Navbar from "../../components/layouts/home/layoutComponents/Navbar"
import { MdDelete } from 'react-icons/md'
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
import {IoAdd} from "react-icons/io5"

const WorkoutPlan = () => {
    const router = useRouter()
    const { data: session, status } = useSession()
    const [shouldUpdate, setShouldUpdate] = useState(false)

    const [userId, setUserId] = useState('')
    const [userInfoId, setUserInfoId] = useState('')
    
    useEffect(() => {
	session?.user?.id ? setUserId(session?.user?.id) : null
    }, [session?.user?.id])
    const userInfo = trpc.auth.getUserInfo.useQuery({ userId: userId })
    useEffect(() => {
	userInfo.data?.id ? setUserInfoId(userInfo.data?.id) : null
    }, [userInfo.data?.id])
    const workoutPlan = trpc.workoutPlan.getWorkoutPlan.useQuery({ userInfoId: userInfoId })
     
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);

    const deleteExercise = trpc.workoutPlan.deleteExerciseFromWorkoutPlan.useMutation()
    const handleDelete = (exerciseId: string) => {
	console.log(workoutPlan.data?.id, exerciseId)
	if(workoutPlan.data?.id) {
	    deleteExercise
		.mutateAsync({
		    exerciseId: exerciseId,
		    workoutId: workoutPlan.data?.id,
		})
		.then(() => {
		    forceUpdate()
		})
	}
    }

    return (
	<div className="bg-black min-h-screen pt-8">
	    <div className="w-[1100px] mx-auto bg-black flex flex-row space-x-4">
		<Sidebar/>
		<form className="flex flex-col space-y-5 min-h-screen grow">
		    <div className="flex flex-col space-y-2">
			<h1 className="text-white font-semibold text-4xl">Workout Plan</h1>
			<h1 className="text-gray-400 font-medium text-md">You can edit you workout plan</h1>
		    </div>
		    <div className="bg-special-slate-component rounded-xl space-y-5">
			{workoutPlan.data?.workoutPlanOnExercises.map((exercise: any) => {
			    return (
				<Excercise key={exercise.id} exercise={exercise} handleDelete={handleDelete}/>
			    ) 
			})}
		    </div> 
		</form>
	    </div>
	</div>
    )
}

const Excercise = ({ exercise, handleDelete }: any) => {
    console.log(exercise)
    const [equipments, setEquipments] = useState<string>()
    const [primaryMuscles, setPrimaryMuscles] = useState<string>()
    useEffect(() => {
	let tempEquip = ''
	exercise.exercise['equipments'].forEach((item: any) => {
	    tempEquip += `${tempEquip} ${item.name},`
	})
	setEquipments(tempEquip.substring(0, tempEquip.length - 1))
	let tempMuscle = ''
	exercise.exercise['primaryMuscles'].forEach((item: any) => {
	    tempMuscle += `${tempMuscle} ${item.name},`
	})
	setPrimaryMuscles(tempMuscle.substring(0, tempMuscle.length - 1))
    }, [])

    if(equipments && primaryMuscles) {
	return (
	    <div className="flex flex-row justify-between items-center pt-3">
		<div className="space-y-1">
		    <h1 className="text-3xl font-semibold text-gray-200">{exercise.exercise.name}</h1>
		    <p className="text-gray-100 ">Equipment: <span className="text-gray-400">{equipments}</span></p>
		    <p className="text-gray-100">Primary Muscles: <span className="text-gray-400">{primaryMuscles}</span></p>
		</div>
		<div className="flex flex-row space-x-7">
		<div className="flex flex-col space-y-2">
		    <p className="text-gray-100 ">Sets: <span className="text-gray-400">{exercise.sets}</span></p>
		    <p className="text-gray-100 ">Reps: <span className="text-gray-400">{exercise.reps}</span></p>
		    <p className="text-gray-100 ">Rest: <span className="text-gray-400">{exercise.rest}</span></p>
		</div>
		<div className="flex flex-col space-y-3">
		    <Button
			variant="contained"
			className='text-white rounded-xl bg-gradient-to-tr from-blue-700'
		    >
			View details
		    </Button>
		    <Button
			variant="outlined"
			className='rounded-xl border border-blue-800 text-white px-3'
			onClick={() => handleDelete(exercise.exerciseId)}
		    >
			<MdDelete className="mr-2" size={24}/>
			Delete
		    </Button>
		</div>

		</div>
	    </div>
	)
    }
    
    return null
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
	url: '/auth/signOut',
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
