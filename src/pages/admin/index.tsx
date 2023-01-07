import type {ReactElement} from "react"
import MainLayout from "../../components/layouts/admin/MainLayout"

const Admin = () => {
    return(
	<div className="flex flex-row">
	    Admin page
	</div>
    )
}

Admin.getLayout = function getLayout(page: ReactElement) {
    return (
	<>
	    <MainLayout>
		{page}
	    </MainLayout>
	</>
    )
}

export default Admin
