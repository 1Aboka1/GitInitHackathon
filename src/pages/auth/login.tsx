import {Button, Checkbox, FormControlLabel, InputAdornment, TextField} from "@mui/material"
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

type Inputs = {
    email: string,
    password: string,
    passwordConfirmation: string,
    firstName: string,
    lastName: string,
    checkbox: boolean,
}

const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm")
const validationSchema = yup.object({
    email: yup.string().required('Укажите почту')
	.matches(emailRegex, 'Укажите правильную почту'),
    password: yup.string().required('Укажите пароль'),
})

const Login = () => {
    const router = useRouter()
    const { data: session, status } = useSession()
    if(status === 'authenticated') {
	router.push('/')	
    }

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
    const onFormSubmit = handleSubmit(async (data) => {
	const result = await signIn('credentials', {
	    redirect: false,
	    email: data.email,
	    password: data.password,
	    callbackUrl: '/',
	})

	router.push('/')
    })
    
    return (
	<div className="bg-custom-blue-1000 h-screen w-screen flex flex-col justify-center">
	    <motion.div 
		className="flex flex-row mx-auto basis-3/5 lg:basis-4/5 rounded-3xl bg-gray-500"
		initial={{ opacity: 0, scale: 0.5 }}
		animate={{ opacity: 1, scale: 1 }}
		transition={{ duration: 0.5 }}
	    >
		<form className="bg-custom-blue-1000 rounded-3xl border border-gray-200 w-[95vw] md:w-[60vw] lg:w-[30vw] p-4 z-10" onSubmit={onFormSubmit}>
		    <Link href={'/'}>
			<h1 className="text-gray-200 font-bold">SketchFit</h1>
		    </Link>
		    <AnimatePresence 
			mode="wait"
		    >
			<motion.div 
			    className="flex h-full justify-center items-center"
			    initial={{ x: 10, opacity: 0 }}
			    animate={{ x: 0, opacity: 1 }}
			    exit={{ x: -10, opacity: 0 }}
			    transition={{ duration: 0.2 }}
			>
			    <EmailTab 
				formControl={register}
				errors={errors}
				clearErrors={clearErrors}
			    />
			</motion.div>	
		    </AnimatePresence>
		</form>
	    </motion.div> 
	</div>
    )
}

const EmailTab = ({ formControl, errors, clearErrors }: any) => {
    useEffect(() => {
	clearErrors()
    }, [])

    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    return (
	<div className="flex justify-center items-center flex-nowrap text-gray-100 w-full px-4">
	    <div className="flex flex-col space-y-16 items-center w-full justify-center flex-nowrap">
		<div className="justify-center flex space-y-2 flex-col flex-nowrap items-center">
		    <h1 className="font-medium text-3xl">Login</h1> 
		    <p className="font-medium text-sm">Sign in with</p>
		</div>
		<div className="flex flex-col space-y-4 w-full">
		    <Button className="w-full items-center rounded-xl space-x-3 bg-gray-200" variant="contained" onClick={() => signIn("discord")}>
			<FaDiscord size={40} className="cursor-pointer"/>
			<p>Discord</p>
		    </Button>
		    <Button className="w-full items-center  rounded-xl space-x-3 bg-custom-blue-100" variant="contained" onClick={() => signIn("github")}>
			<FaGithub size={40} className="cursor-pointer"/>
			<p className="text-white">Github</p>
		    </Button>
		</div>
		<p className="text-sm text-gray-300">By signing in you agree with our privacy policy.</p>
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

export default Login 
