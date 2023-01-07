import type { ReactNode } from "react"
import {Button, TextField} from "@mui/material"
import { ReactElement, useEffect } from "react"
import { useState } from "react"
import { prisma } from "../../server/db/client"
import { trpc } from "../../utils/trpc"
import * as yup from 'yup'
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import { CldUploadWidget, CldImage } from 'next-cloudinary'
import { AnimatePresence} from "framer-motion"
import type {GetServerSideProps, InferGetServerSidePropsType} from "next"
import { AiOutlineUser } from 'react-icons/ai'
import {RiDashboard3Line} from "react-icons/ri"
import { BiCategory } from 'react-icons/bi'
import { CiDumbbell, CiLogout } from 'react-icons/ci'
import { AiOutlineForm } from 'react-icons/ai'
import { BsFillInboxesFill } from 'react-icons/bs'
import { motion } from 'framer-motion'
import { MdOutlineLocalShipping } from 'react-icons/md'
import {useRouter} from "next/router"
import Footer from "../../components/layouts/home/layoutComponents/Footer"
import Navbar from "../../components/layouts/home/layoutComponents/Navbar"

const WorkoutPlan = () => {
    const router = useRouter()
    const {
	register,
	handleSubmit,
	setValue,
	getValues,
	formState: { errors },
    } = useForm<Inputs>({
	resolver: yupResolver(validationSchema)
    })
    const [imageShouldUpdate, setImageShouldUpdate] = useState(false)

    useEffect(() => {
	setValue('name', category.name)
	setValue('description', category.description)
	setValue('image', category.image)
	setImageShouldUpdate(true)
    }, [])
    
    const createCategory = trpc.category.createCategory.useMutation()
    const onFormSubmit = handleSubmit((data) => {
	createCategory
	    .mutateAsync({
		name: data.name,
		description: data.description,
		image: data.image,
	    })
	    .then(() => {
		router.push('/admin/categories')	
	    })
    })

	<div className="bg-black min-h-screen pt-8">
	    <div className="w-[1100px] mx-auto bg-black flex flex-row">
		<Sidebar/>
		<div className="p">

		</div>
	    </div> 
	</div>
    return(
	<div className="flex flex-col space-y-5 min-h-screen mb-8">
	    <h1 className="text-white font-semibold text-xl">Редактировать категории</h1>
	    <div className="bg-special-slate-component rounded-xl p-3 px-5 space-y-5">
		<h1 className="text-gray-400 font-medium text-md">Заполните данные о категории</h1>
		<div className="space-y-5">
		    <div className="space-y-3">
			<h1 className="text-white text-sm">Название</h1>
			<FieldError error={errors.name}/>
			<TextField 
			    {...register('name', { required: true })}
			    variant="outlined" 
			    size="small" 
			    placeholder={'Название продукта'} 
			    fullWidth
			    color={errors.name && 'error'}
			/>
		    </div>
		    <div className="space-y-3">
			<h1 className="text-white text-sm">Описание</h1>
			<FieldError error={errors.description}/>
			<TextField 
			    {...register('description', { required: true })}
			    variant="outlined" 
			    size='small' 
			    multiline 
			    placeholder="Описание продукта" 
			    fullWidth 
			    rows={4}
			    color={errors.description && 'error'}
			/>
		    </div>
		    <div className="space-y-3">
			<h1 className="text-white text-sm">{'Картинка'}</h1>
			<FieldError error={errors.image}/>
			<ImageUploadWidget
			    setValue={setValue}
			    getValues={getValues}
			    imageShouldUpdate={imageShouldUpdate}
			    setImageShouldUpdate={setImageShouldUpdate}
			/>
		    </div>
		</div>
	    </div> 
	    <Button 
		onClick={() => onFormSubmit()}
		type='submit'
		variant="outlined" 
		className="rounded-xl h-12 normal-case"
	    >
		Добавить категорию 
	    </Button>
	</div>
    )
}
const Sidebar = () => {
    return (
	<div className="bg-black sticky px-4 space-y-4 min-h-screen">
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
			className="absolute bg-blue-900 w-60 rounded-tr-3xl rounded-br-3xl h-full z-0"
			initial={{ left: -500 }}
			animate={{ left: -50 }}
			transition={{ duration: 1 }}
		    />
		) : null
	    }
	</motion.div>
    )
}

WorkoutPlan.getLayout = function getLayout(page: ReactNode) {
    return (
	<>
	    <Navbar/>
	    {page}
	    <Footer/>
	</>
    )
}

export default WorkoutPlan
