import {Button} from "@mui/material"
import {useSession} from "next-auth/react"
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
		    <Image src={BarImage} className='basis-1/2 mix-blend-overlay' alt='BarImage'/>
		    <div className="basis-1/2 space-y-2">
			<p className="text-white font-bold text-4xl">Workout Generator</p>
			<p className="text-white font-medium text-lg">Build your workout from scratch and start pursuing your goal</p>
			<div>

			</div>
			<Button onClick={() => session ? router.push('/profile') : router.push('/auth/login')} variant="outlined" className='bg-black rounded-xl border-2 border-gray-300 text-white p-3 px-20'>Build</Button>
			<p className="text-sm text-gray-400">Completely free!</p>
		    </div>
		</div>
		<div></div>
	    </ReactCarousel>
	</div>
    )
}

export default CarouselAndFeatured
