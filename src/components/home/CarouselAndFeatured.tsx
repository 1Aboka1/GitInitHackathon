import {Button} from "@mui/material"
import {useSession} from "next-auth/react"
import { GoNote } from 'react-icons/go'
import { GiWeightLiftingUp } from 'react-icons/gi'
import { BsQuestionCircle } from 'react-icons/bs'
import Image from "next/image"
import {useRouter} from "next/router"
import { Carousel as ReactCarousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import BarImage from '../../assets/barbg.jpg'

const CarouselAndFeatured = () => {
    return (
	<Carousel/>
    )
}

const Carousel = () => {
    const router = useRouter()
    const { data: session} = useSession()

    return (
	<div className="">
	    <ReactCarousel infiniteLoop interval={5000} showArrows={false} showThumbs={false} showStatus={false} stopOnHover={false} transitionTime={500}>
		<div className="flex flex-row bg-gradient-to-br from-blue-600 to-black items-center">
		    <div className="w-full min-h-[380px] space-y-4 items-center flex flex-col mt-36">
			<p className="text-white font-bold text-4xl">Workout Generator</p>
			<p className="text-gray-300 font-medium text-lg">Build your workout from scratch and start pursuing your goal</p>
			<Button onClick={() => session ? router.push('/exercises') : router.push('/auth/login')} variant="outlined" className='bg-black rounded-xl border-2 border-gray-300 text-white p-3 px-20'>Build</Button>
			<p className="text-sm text-gray-400">Completely free!</p>
			<div className="flex flex-row space-x-4">
			    <div className="flex text-white flex-row items-center space-x-2">
				<GiWeightLiftingUp size={50} className='bg-black rounded-full p-2'/>	
				<p className="font-medium text-lg">Thousands of exercises</p>
			    </div>
			    <div className="flex text-white flex-row items-center space-x-2">
				<GoNote size={50} className='bg-black text-white rounded-full p-2'/>	
				<p className="font-medium text-lg">Your personal program</p>
			    </div>
			    <div className="flex text-white flex-row items-center space-x-2">
				<BsQuestionCircle size={50} className='bg-black rounded-full p-2'/>	
				<p className="font-medium text-lg">Workout recommendations</p>
			    </div>
			</div>
		    </div>
		</div>
		<div></div>
	    </ReactCarousel>
	</div>
    )
}

export default CarouselAndFeatured
