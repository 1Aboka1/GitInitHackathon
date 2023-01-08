import {useEffect} from "react"
import { signOut } from "next-auth/react"
import {useRouter} from "next/router"

const SignOutPage = () => {
    const router = useRouter()
    useEffect(() => {
	signOut()
	router.push('/')
    }, [])

    return (
	<div>

	</div>
    )
}

export default SignOutPage
