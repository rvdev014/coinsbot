import React from 'react'
import Routing from "./app/routing.tsx";
import { ChakraProvider } from '@chakra-ui/react'
import './App.scss'

function App() {
    return (
        <ChakraProvider>
            <Routing/>
        </ChakraProvider>
    )
}

export default App
