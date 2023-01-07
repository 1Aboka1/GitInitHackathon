import {Box, Button, Chip, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField, Theme, ThemeProvider} from "@mui/material"
import {GetServerSideProps, InferGetServerSidePropsType, InferGetStaticPropsType} from "next"
import {useRouter} from "next/router"
import { IoAdd } from 'react-icons/io5'
import { BiDumbbell } from 'react-icons/bi'
import { Button as ChakraButton } from '@chakra-ui/react'
import {ReactElement, useEffect, useState} from "react"
import Footer from "../../components/layouts/home/layoutComponents/Footer"
import Navbar from "../../components/layouts/home/layoutComponents/Navbar"
import MainLayout from "../../components/layouts/home/MainLayout"
import { prisma } from "../../server/db/client"
import {darkTheme} from "../../styles/themes"
import {ChakraProvider, extendTheme, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ThemeConfig, useColorMode} from "@chakra-ui/react"
import {trpc} from "../../utils/trpc"
import {useSession} from "next-auth/react"

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const equipmentRoute = query['equipmentFilters'] as string
    const tempEquipmentFilters = typeof equipmentRoute === 'string' ? equipmentRoute.split(',') : equipmentRoute
    const muscleRoute = query['muscleFilters'] as string
    const tempMuscleFilters = typeof muscleRoute === 'string' ? muscleRoute.split(',') : muscleRoute
    const exercises = await prisma.exercise.findMany({
	where: {
	    OR: [
		{
		    primaryMuscles: {
			some: {
			    name: {
				in: tempMuscleFilters,
			    }
			}
		    },
		},
		{
		    equipments: {
			some: {
			    name: {
				in: tempEquipmentFilters,
			    }
			}
		    },
		},
	    ],
	},
	select: {
	    id: true,
	    name: true,
	    image: true,
	    primaryMuscles: true,
	    equipments: true,
	}
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

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}
const theme = extendTheme({ config })

const Exercises = ({ exercises, muscleFilters, equipmentFilters }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [selectedMuscleFilters, setSelectedMuscleFilters] = useState<string[]>([])
    const [selectedEquipmentFilters, setSelectedEquipmentFilters] = useState<string[]>([])
    const router = useRouter()
    const [isModalOpen, setModalOpen] = useState(false)
    const { data: session } = useSession()
    const [modalExcercise, setModalExcercise] = useState<string>('')

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
	const index = tempFilters.indexOf('[]')
	if (index > -1) { 
	    tempFilters.splice(index, 2)
	}
	setSelectedMuscleFilters(tempFilters)
	const tempEquipmentFilters = router.query['equipmentFilters']
	const index1 = tempFilters.indexOf('[]')
	if (index1 > -1) { 
	    tempFilters.splice(index1, 2)
	}
	router.push(`/exercises?muscleFilters=${tempFilters}&equipmentFilters=${tempEquipmentFilters}`)
    }

    const handleEquipmentFilterChange = (event: SelectChangeEvent<typeof selectedEquipmentFilters>) => {
	const { target: { value } } = event
	const tempFilters = typeof value === 'string' ? value.split(',') : value
	const index = tempFilters.indexOf('[]')
	if (index > -1) { 
	    tempFilters.splice(index, 2)
	}
	setSelectedEquipmentFilters(tempFilters)
	const tempMuscleFilters = router.query['muscleFilters']
	const index1 = tempFilters.indexOf('[]')
	if (index1 > -1) { 
	    tempFilters.splice(index1, 2)
	}
	router.push(`/exercises?muscleFilters=${tempMuscleFilters}&equipmentFilters=${tempFilters}`)
    }

    useEffect(() => {
	session?.user?.id ? setUserId(session?.user?.id) : null
    }, [session?.user?.id])

    const [userInfoId, setUserInfoId] = useState('')
    const [userId, setUserId] = useState('')

    const userInfo = trpc.auth.getUserInfo.useQuery({ userId: userId })
    const workoutPlan = trpc.workoutPlan.getWorkoutPlan.useQuery({ userInfoId: userInfoId })
    const addExercise = trpc.workoutPlan.addExerciseToWorkoutPlan.useMutation()

    useEffect(() => {
	userInfo.data?.id ? setUserInfoId(userInfo.data?.id) : null
    }, [userInfo.data?.id])
    
    const handleSomething = () => {
	if(workoutPlan.data?.id) {
	    addExercise
		.mutateAsync({
		    exerciseId: modalExcercise,
		    workoutId: workoutPlan.data?.id,
		})
		.catch((error) => {
		    console.log(error)
		})
	}
    }

    return (
	<div className="min-h-screen bg-black pt-10 space-y-3">
	    <ChakraProvider theme={theme}>
		<Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
		    <ModalOverlay/>
		    <ModalContent>
			<ModalHeader>Add new exercise</ModalHeader>
			<ModalCloseButton/>
			<ModalBody>
			    <ThemeProvider theme={darkTheme}>
				<div className="flex flex-col space-y-4">
				    <div className="flex flex-row space-x-2 justify-between">
					<TextField variant="outlined" className="rounded-xl bg-gray-900" placeholder="Sets"/>
					<TextField variant="outlined" className="rounded-xl bg-gray-900" placeholder="Reps"/>
					<TextField variant="outlined" className="rounded-xl bg-gray-900" placeholder="Rests"/>
				    </div>
				    <Button onClick={handleSomething} className="rounded-xl bg-gradient-to-tl from-blue-500 to-gray-500 text-white font-semibold" variant="contained">Add</Button>
				</div>
			    </ThemeProvider>
			</ModalBody>
			<ModalFooter>
			</ModalFooter>
		    </ModalContent>
		</Modal>
	    </ChakraProvider>
	    <div className="pb-4 flex flex-row items-center justify-between">
		<h1 className="text-white text-4xl font-semibold">Exercises</h1>
	    </div>
	    <div className="flex flex-row justify-between items-center px-10 border-b border-gray-500 pb-4">
		<div className="flex flex-row space-x-4 items-center">
		    <p className="text-gray-200 font-medium text-lg">Muscle Group:</p>
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
		    <p className="text-gray-200 font-medium text-lg">Equipment:</p>
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
	    <div className="flex flex-col divide-y divide-dotted space-y-6">
		{
		    exercises.map((exercise: typeof exercises[0]) => <Excercise setModalExcercise={setModalExcercise} setModalOpen={setModalOpen} key={exercise.id} exercise={exercise}/>)	
		}
	    </div>
	</div>
    )
}

const Excercise = ({ exercise, setModalOpen, setModalExcercise }: any) => {
    const [equipments, setEquipments] = useState<string>()
    const [primaryMuscles, setPrimaryMuscles] = useState<string>()
    useEffect(() => {
	let tempEquip = ''
	exercise['equipments'].forEach((item: any) => {
	    tempEquip += `${tempEquip} ${item.name},`
	})
	setEquipments(tempEquip.substring(0, tempEquip.length - 1))
	let tempMuscle = ''
	exercise['primaryMuscles'].forEach((item: any) => {
	    tempMuscle += `${tempMuscle} ${item.name},`
	})
	setPrimaryMuscles(tempMuscle.substring(0, tempMuscle.length - 1))
    }, [])

    if(equipments && primaryMuscles) {
	return (
	    <div className="flex flex-row justify-between items-center pt-3">
		<div className="space-y-1">
		    <h1 className="text-3xl font-semibold text-white">{exercise.name}</h1>
		    <p className="text-gray-100 ">Equipment: <span className="text-gray-400">{equipments}</span></p>
		    <p className="text-gray-100">Primary Muscles: <span className="text-gray-400">{primaryMuscles}</span></p>
		</div>
		<div className="flex flex-row space-x-3">
		    <Button
			variant="contained"
			className='text-white rounded-xl bg-gradient-to-tr from-blue-700'
		    >
			View details
		    </Button>
		    <Button
			variant="outlined"
			className='rounded-xl border border-blue-800 text-white px-3'
			onClick={() => {setModalExcercise(exercise.id); setModalOpen(true) }}
		    >
			<IoAdd className="mr-2" size={24}/>
			Add
		    </Button>
		</div>
	    </div>
	)
    }
    
    return null
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
