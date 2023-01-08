import {Box, Button, Chip, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField, Theme, ThemeProvider} from "@mui/material"
import { AnimatePresence, motion } from "framer-motion"
import {GetServerSideProps, InferGetServerSidePropsType, InferGetStaticPropsType} from "next"
import * as yup from 'yup'
import {useRouter} from "next/router"
import { IoAdd } from 'react-icons/io5'
import { BiDumbbell } from 'react-icons/bi'
import { Button as ChakraButton } from '@chakra-ui/react'
import {ReactElement, useEffect, useReducer, useState} from "react"
import Footer from "../../components/layouts/home/layoutComponents/Footer"
import Navbar from "../../components/layouts/home/layoutComponents/Navbar"
import MainLayout from "../../components/layouts/home/MainLayout"
import { prisma } from "../../server/db/client"
import {darkTheme} from "../../styles/themes"
import {ChakraProvider, extendTheme, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ThemeConfig, useColorMode} from "@chakra-ui/react"
import {trpc} from "../../utils/trpc"
import {useSession} from "next-auth/react"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import Image from "next/image"

export const getServerSideProps: GetServerSideProps = async ({ query, params }) => {
    const exercise = await prisma.exercise.findFirst({
	where: {
	    id: params?.exerciseId as string,
	},
	select: {
	    id: true,
	    name: true,
	    description: true,
	    image: true,
	    primaryMuscles: true,
	    equipments: true,
	},
    })

    return {
	props: {
	    exercise: JSON.parse(JSON.stringify(exercise)),
	}
    }
}

const Exercise = ({ exercise }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    console.log(exercise)
    return (
	<div className="min-h-screen pt-9 space-y-6">
	    <h1 className="text-gray-300 font-bold text-4xl border-b border-gray-500 pb-4">{exercise.name}</h1>  
	    <h1 className="text-3xl font-semibold text-gray-300">Benefits and Instructions</h1>
	    <div className="flex flex-row justify-center w-full">
		<img src={exercise.image} alt={exercise.name}/>
	    </div>
	    <p className="text-gray-200 whitespace-pre-wrap">{exercise.description}</p>
	    <p className="text-gray-600 text-sm">Source: {exercise.image}</p>
	</div>
    )
}

Exercise.getLayout = function getLayout(page: ReactElement) {
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
 
export default Exercise
