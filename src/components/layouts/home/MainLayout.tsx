import type {ReactElement} from "react"

const MainLayout = ({ children }: {children: ReactElement}) => {
    return (
	<div className="bg-white lg:w-[1100px] mx-auto">
	    {children} 
	</div>
    )
}

export default MainLayout
