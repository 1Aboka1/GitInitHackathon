import {ReactElement, ReactNode} from "react"
import Footer from "../../components/layouts/home/layoutComponents/Footer"
import { CiDumbbell, CiLogout } from 'react-icons/ci'
import { AiOutlineForm } from 'react-icons/ai'
import Navbar from "../../components/layouts/home/layoutComponents/Navbar"
import MainLayout from "../../components/layouts/home/MainLayout"
import {Button, MenuItem, Select, SelectChangeEvent} from "@mui/material"
import {Checkbox, FormControlLabel, InputAdornment, TextField} from "@mui/material"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import { AnimatePresence, motion } from "framer-motion"
import { FaDiscord } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'
import Link from "next/link"
import {useEffect, useState} from "react"
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {VisibilityOutlined} from "@mui/icons-material"
import {MdOutlineLocalShipping} from "react-icons/md"
import {AiOutlineUser} from "react-icons/ai"
import {BiCategory} from "react-icons/bi"
import {BsFillInboxesFill} from "react-icons/bs"
import {RiDashboard3Line} from "react-icons/ri"
import {trpc} from "../../utils/trpc"

type Inputs = {
    height: number,
    weight: number,
    goal: 'MuscleGain' | 'FatLoss' | 'Maintanence',
    gender: 'Male' | 'Female'
}

const validationSchema = yup.object({
    height: yup.number().required('Required field'),
    weight: yup.number().required('Required field'),
    goal: yup.string().required(),
    gender: yup.string().required(),
})

const EditProfile = () => {
    const router = useRouter()
    const { data: session, status } = useSession()

    const {
	register,
	setValue,
	handleSubmit,
	getValues,
	clearErrors,
	formState: { errors },
    } = useForm<Inputs>({
	resolver: yupResolver(validationSchema)
    })
    const updateUserInfo = trpc.auth.upsertUserInfo.useMutation()
    const onFormSubmit = handleSubmit(async (data) => {
	if(session?.user?.id) {
	    updateUserInfo
		.mutateAsync({
		    userId: session?.user?.id,
		    height: data.height,
		    weight: data.weight,
		    gender: data.gender,
		    goal: data.goal,
		})
	}
	router.back()
    })
    
    const [userId, setUserId] = useState('')
    const userInfo = trpc.auth.getUserInfo.useQuery({ userId: userId })
    
    useEffect(() => {
	session?.user?.id ? setUserId(session?.user?.id) : null
    }, [session?.user?.id])

    useEffect(() => {
	if(userInfo.isError || userInfo.data === undefined || userInfo.data === null) {
	    null
	} else {
	    setValue('height', userInfo.data.height)
	    setValue('weight', userInfo.data.weight)
	    const gender = userInfo.data.gender as unknown as 'Male' | 'Female'
	    setValue('gender', gender)
	    const goal = userInfo.data.goal as unknown as Inputs['goal']
	    setValue('goal', goal)
	}
    }, [userInfo])
    
    const handleGenderChange = (event: any) => {
	const { target: { value } } = event
	setValue('gender', value as 'Male' | 'Female')
    }
    const handleGoalChange = (event: any) => {
	const { target: { value } } = event
	setValue('goal', value as 'MuscleGain' | 'FatLoss' | 'Maintanence')
    }

    return (
	<div className="bg-black min-h-screen pt-8">
	    <div className="w-[1100px] mx-auto bg-black flex flex-row space-x-4">
		<Sidebar/>
		<form className="flex flex-col space-y-5 min-h-screen grow">
		    <div className="flex flex-col space-y-2">
			<h1 className="text-white font-semibold text-3xl">Edit my details</h1>
			<h1 className="text-gray-400 font-medium text-md">Type your new details</h1>
		    </div>
		    <div className="bg-special-slate-component rounded-xl space-y-5">
			<div className="space-y-5">
			    <div className="space-y-3">
				<h1 className="text-white text-sm">Gender</h1>
				<FieldError error={errors.gender}/>
				<Select
				    value={getValues().gender}
				    onChange={handleGenderChange}
				    size='small'
				    className="rounded-2xl"
				    defaultValue={getValues().gender}
				    fullWidth
				>
				    <MenuItem key='Male' value='Male'>Male</MenuItem>
				    <MenuItem key='Female' value='Female'>Female</MenuItem>
				</Select>
			    </div>
			    <div className="space-y-3">
				<h1 className="text-white text-sm">Height</h1>
				<FieldError error={errors.height}/>
				<TextField 
				    {...register('height', { required: true })}
				    variant="outlined" 
				    size='small' 
				    type={'number'}
				    placeholder="Your height" 
				    fullWidth 
				    color={errors.height && 'error'}
				/>
			    </div>
			    <div className="space-y-3">
				<h1 className="text-white text-sm">Weight</h1>
				<FieldError error={errors.weight}/>
				<TextField 
				    {...register('weight', { required: true })}
				    variant="outlined" 
				    size='small' 
				    type="number"
				    placeholder="Your weight" 
				    fullWidth 
				    color={errors.weight && 'error'}
				/>
			    </div>
			    <div className="space-y-3">
				<h1 className="text-white text-sm">Goal</h1>
				<FieldError error={errors.goal}/>
				<Select
				    value={getValues().goal}
				    onChange={handleGoalChange}
				    size='small'
				    defaultValue={getValues().goal}
				    className="rounded-2xl"
				    fullWidth
				>
				    <MenuItem key='MuscleGain' value='MuscleGain'>Muscle Gain</MenuItem>
				    <MenuItem key='FatLoss' value='FatLoss'>Fat Loss</MenuItem>
				    <MenuItem key='Maintanence' value='Maintanence'>Maintanence</MenuItem>
				</Select>
			    </div>
			</div>
		    </div> 
		    <Button 
			onClick={() => onFormSubmit()}
			type='submit'
			variant="outlined" 
			className="rounded-xl h-12 normal-case"
		    >
			Update
		    </Button>
		</form>
	    </div>
	</div>
    )
}

const FieldError = ({ error }: any) => {
    if(error) {
	return (
	    <AnimatePresence
		mode='wait'
	    >
		<motion.div 
		    className="text-red-600 text-sm"
		    key={error?.message}
		    initial={{ y: 10, opacity: 0 }}
		    animate={{ y: 0, opacity: 1 }}
		    exit={{ y: -10, opacity: 0 }}
		    transition={{ duration: 0.3 }}
		>
		    {error?.message}
		</motion.div>
	    </AnimatePresence>
	)
    } else {
	return null
    }
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

EditProfile.getLayout = function getLayout(page: ReactElement) {
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

export default EditProfile
