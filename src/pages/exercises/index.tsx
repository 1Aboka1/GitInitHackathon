import {Box, Chip, MenuItem, OutlinedInput, Select, SelectChangeEvent, Theme} from "@mui/material"
import {GetServerSideProps, InferGetServerSidePropsType, InferGetStaticPropsType} from "next"
import {useRouter} from "next/router"
import {ReactElement, useEffect, useState} from "react"
import Footer from "../../components/layouts/home/layoutComponents/Footer"
import Navbar from "../../components/layouts/home/layoutComponents/Navbar"
import MainLayout from "../../components/layouts/home/MainLayout"
import { prisma } from "../../server/db/client"
import {darkTheme} from "../../styles/themes"

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
console.log(query)
    const equipmentRoute = query['equipmentFilters']
    const muscleRoute = query['muscleFilters']
    const tempEquipmentFilters = typeof equipmentRoute === 'string' ? equipmentRoute.split(',') : equipmentRoute
    const tempMuscleFilters = typeof muscleRoute === 'string' ? muscleRoute.split(',') : muscleRoute
    const exercises = await prisma.primaryMuscle.findMany({
	include: {
	    exercises: true,
	},
	where: {
	    id: query?.id as string,
	},
    })

    const muscleFilters = await prisma.primaryMuscle.findMany()
    const equipmentFilters = await prisma.equipment.findMany()

    return {
	props: {
	    exercises: JSON.parse(JSON.stringify(exercises)),
	    muscleFilters: JSON.parse(JSON.stringify(muscleFilters)),
	    equipmentFilters: JSON.parse(JSON.stringify(equipmentFilters)),
	}
    }
}

const Exercises = ({ exercises, muscleFilters, equipmentFilters }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [selectedMuscleFilters, setSelectedMuscleFilters] = useState<string[]>([])
    const [selectedEquipmentFilters, setSelectedEquipmentFilters] = useState<string[]>([])
    const router = useRouter()

    useEffect(() => {
	if((router.query['muscleFilters'] === undefined || router.query['equipmentFilters'] === undefined)) {
	    router.push('/exercises?muscleFilters=[]&equipmentFilters=[]', undefined, { shallow: true })
	} else {
	    const muscleRoute = router.query['muscleFilters']
	    const tempMuscleFilters = typeof muscleRoute === 'string' ? muscleRoute.split(',') : muscleRoute
	    setSelectedMuscleFilters(tempMuscleFilters)
	    const equipmentRoute = router.query['equipmentFilters']
	    const tempEquipmentFilters = typeof equipmentRoute === 'string' ? equipmentRoute.split(',') : equipmentRoute
	    setSelectedEquipmentFilters(tempEquipmentFilters)
	}
    }, [])

    const handleMuscleFilterChange = (event: SelectChangeEvent<typeof selectedMuscleFilters>) => {
	const { target: { value } } = event
	const tempFilters = typeof value === 'string' ? value.split(',') : value
	setSelectedMuscleFilters(tempFilters)
	const tempEquipmentFilters = router.query['equipmentFilters']
	router.push(`/exercises?muscleFilters=${tempFilters}&equipmentFilters=${tempEquipmentFilters}`)
    }

    const handleEquipmentFilterChange = (event: SelectChangeEvent<typeof selectedEquipmentFilters>) => {
	const { target: { value } } = event
	const tempFilters = typeof value === 'string' ? value.split(',') : value
	setSelectedEquipmentFilters(tempFilters)
	const tempMuscleFilters = router.query['muscleFilters']
	router.push(`/exercises?muscleFilters=${tempMuscleFilters}&equipmentFilters=${tempFilters}`)
    }

    return (
	<div className="min-h-screen bg-black pt-10 space-y-5">
	    <div className="border-b pb-4 flex flex-row items-center justify-between">
		<h1 className="text-white text-4xl font-semibold">Exercises</h1>
	    </div>
	    <div className="flex flex-row justify-between items-center px-10">
		<div className="flex flex-row space-x-4 items-center">
		    <p className="text-gray-200">Muscle Group:</p>
		    <Select
			size="small"
			className="rounded-xl w-56"
			multiple
			value={selectedMuscleFilters}
			onChange={handleMuscleFilterChange}
			input={<OutlinedInput label='Chip'/>}
			renderValue={(selected) => (
			  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
			    {selected.map((value) => (
			      <Chip key={value} label={value} />
			    ))}
			  </Box>
			)}
			MenuProps={MenuProps}
		    >
			{
			    muscleFilters.map((muscle: typeof muscleFilters[0]) => {
				return (
				    <MenuItem
					key={muscle.id}
					value={muscle.name}
					style={getStyles(muscle.name, selectedMuscleFilters, darkTheme)}
				    >
					{muscle.name}
				    </MenuItem>
				)
			    })
			}
		    </Select>
		</div>
		<div className="flex flex-row space-x-4 items-center">
		    <p className="text-gray-200">Equipment:</p>
		    <Select
			size="small"
			className="rounded-xl w-56"
			multiple
			value={selectedEquipmentFilters}
			onChange={handleEquipmentFilterChange}
			input={<OutlinedInput label='Chip'/>}
			renderValue={(selected) => (
			  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
			    {selected.map((value) => (
			      <Chip key={value} label={value} />
			    ))}
			  </Box>
			)}
			MenuProps={MenuProps}
		    >
			{
			    equipmentFilters.map((equipment: typeof equipmentFilters[0]) => {
				return (
				    <MenuItem
					key={equipment.id}
					value={equipment.name}
					style={getStyles(equipment.name, selectedEquipmentFilters, darkTheme)}
				    >
					{equipment.name}
				    </MenuItem>
				)
			    })
			}
		    </Select>
		</div>
	    </div>
	</div>
    )
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

Exercises.getLayout = function getLayout(page: ReactElement) {
    return (
	<>
	    <Navbar/>
		<MainLayout>
		    {page}
		</MainLayout>
	    <Footer/>
	</>
    )
}
 
export default Exercises
