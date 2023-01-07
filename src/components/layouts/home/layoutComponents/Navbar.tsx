import {Button, InputAdornment, TextField} from "@mui/material"
import Image from "next/image"
import Logo from '../../../../assets/logo.jpg'
import {type ReactNode} from "react"
import { AiOutlineUser } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'
import { TfiMenuAlt } from 'react-icons/tfi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { MdFavoriteBorder } from 'react-icons/md'
import { BiMap } from 'react-icons/bi'
import {useRouter} from "next/router"
import {useSession} from "next-auth/react"
import {IconContext} from "react-icons"

const Navbar = () => {
    const router = useRouter()
    const { data: session} = useSession()
    const firstName = session?.user?.name?.substring(0, session?.user.name.indexOf(' '))

    return (
	<div className="sticky top-0 bg-black z-50 shadow-2xl shadow-black">
	    <div className="bg-black lg:w-[1100px] mx-auto p-1 space-y-2">
		<div className="flex flex-row items-center justify-between space-x-3">
		    <Image 
			src={Logo} 
			alt='Logo' 
			width={100} 
			height={10}
			className='object-none rounded-3xl'
		    />
		    <TextField
			variant="outlined" 
			size='medium' 
			fullWidth 
			placeholder="Search workout..."
			InputProps={{
			    endAdornment: (
				<InputAdornment position="end">
				    <BsSearch size={22}/>
				</InputAdornment>
			    )
			}}
		    />
		    <div className="flex flex-row space-x-2 items-center justify-center">
			<Button className='p-2 px-5 rounded-xl text-white whitespace-nowrap' variant="outlined">Home</Button>
			<Button className='p-2 px-5 rounded-xl text-white whitespace-nowrap' variant="outlined">Workout plans</Button>
			<Button className='p-2 px-5 rounded-xl text-white whitespace-nowrap' variant="outlined">Exercises list</Button>
			<div className="border rounded-xl border-gray-200">
			    {
				!session ? 
				<Button className='p-2 px-5 rounded-xl bg-gradient-to-br from-blue-600 border text-white whitespace-nowrap' variant="contained" onClick={() => router.push('/auth/login')}>Build your workout</Button> :
				<Button className='p-2 px-5 rounded-xl bg-gradient-to-br from-blue-600 border text-white whitespace-nowrap' variant="contained" onClick={() => router.push('/profile')}>Your workout</Button>
			    }
			</div>
		    </div>
		</div>
	    </div>
	</div>
    )
}

export const TopBar = () => {
    return (
	<div className="bg-white lg:w-[1200px] mx-auto p-2 space-y-2">
	    <div className="flex flex-row justify-between">
		<div className="flex flex-row space-x-1 items-center">
		    <BiMap/>			
		    <p className="text-sm">Усть-Каменогорск</p>
		</div>
		<h1>8-777-613-4709</h1>
	    </div>
	</div>
    )
}

const ButtonWithIconOnBottom = ({ text, icon, bold }: { text?: string, icon: ReactNode, bold?: boolean }) => {
    return (
	<IconContext.Provider value={{ color: '#89b4ff', className: "" }}>
	    <div className="flex flex-col items-center cursor-pointer">
		<div className="">
		    {icon}
		</div>
		<span className={"group-hover:text-[#89b4ff] transition duration-150 ease-in-out " + (bold ? "font-semibold" : '')}>
		    {text}
		</span>
	    </div>
	</IconContext.Provider>
    )
}

export default Navbar
