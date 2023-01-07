import type {ReactElement} from "react"

const MainLayout = ({ children }: {children: ReactElement}) => {
    return (
	<div className="bg-black">
	    <div className="bg-black lg:w-[1100px] mx-auto">
		{children} 
	    </div>
	</div>
    )
}

export default MainLayout
