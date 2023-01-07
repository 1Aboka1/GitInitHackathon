import { signOut, useSession } from "next-auth/react"
import Head from "next/head"
import {useRouter} from "next/router"
import type {ReactElement} from "react"
import CarouselAndFeatured from "../components/home/CarouselAndFeatured"
import Footer from "../components/layouts/home/layoutComponents/Footer"
import Navbar, {TopBar} from "../components/layouts/home/layoutComponents/Navbar"
import MainLayout from "../components/layouts/home/MainLayout"
import { CldImage} from 'next-cloudinary'

const Home = () => { 
    const { data: session, status } = useSession()
    const router = useRouter()

    return (
	<div className="bg-black">
	    <Head>
		<title>SketchFit - push your limits.</title>
		<meta name="viewport" content="initial-scale=1.0, width=device-width"/>
	    </Head>
	    <CarouselAndFeatured/>
	    <button onClick={() => signOut()}>out</button>
	</div>	
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (
	<>
	    <Navbar/>
		{page}
	    <Footer/>
	</>
    )
}
 
export default Home
