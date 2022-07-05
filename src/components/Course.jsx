import { SearchIcon } from '@chakra-ui/icons'
import { Box, Input, IconButton, Select, Button,Grid, GridItem, Text,Image, Flex} from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'



export const Course = () => {


    const [state, setState] = useState([])
    const [search, setSearch] = useState(" ")
    const [page, setPage] = useState(1)
    // const [presentpage, setPresentPage] = useState(0)


    useEffect(() => {
        fetchData()
    },[page])

    const values = ["LowToHigh", "HighToLow"]

    const filterValues = ["beginner","intermediate","proficient"]

    const limit = 3

    const fetchData = () => {
        axios.get(`http://localhost:5000/courses?_page=${page}&_limit=${limit}`).then((res) => {
            // console.log(res.data);
            setState(res.data)
        })
    }

    const handleSearch = (e) => {
        e.preventDefault();
         axios.get(`http://localhost:5000/courses?q=${search}`).then((res) => {
            // console.log(res.data);
            setState(res.data)
            setSearch(" ")
        })
    }

    const handleSort = (e) => {
        let value = e.target.value
        if(value == "LowToHigh"){
            axios.get(`http://localhost:5000/courses?_sort=price&_order=asc`).then((res) => {
            // console.log(res.data);
            setState(res.data)
        })
        }else if(value == "HighToLow"){
            axios.get(`http://localhost:5000/courses?_sort=price&_order=desc`).then((res) => {
                // console.log(res.data);
                setState(res.data)
            })
        }
    }

    const handleFilter = (el) => {
        let value = el.target.value
        if(value == "beginner"){
            axios.get(`http://localhost:5000/courses?level=Beginner`).then((res) => {
            console.log(res.data);
            setState(res.data)
        })
        }
        else if(value == "intermediate"){
            axios.get(`http://localhost:5000/courses?level=Intermediate`).then((res) => {
                console.log(res.data);
                setState(res.data)
            })
        }
        else if(value == "proficient"){
            axios.get(`http://localhost:5000/courses?level=Proficient`).then((res) => {
                console.log(res.data);
                setState(res.data)
            })
        }
    }



  return (
    <>
    <Box>

    <Box display='flex' justifyContent='center' marginTop='30px'>
    <Input variant='filled' placeholder='Search Course Here' width={["150px","300px","450px"]} onChange={(e) => setSearch(e.target.value)}/>
    <IconButton aria-label='Search database' icon={<SearchIcon />} onClick={handleSearch}/>
    </Box>
    

    <Box display={["block","flex","flex"]} justifyContent='space-between' margin={["auto","10px","20px"]} marginBottom={["35px","50px","50px"]} marginTop='20px'>
    <Box w='150px'>
    <Select placeholder='Filter By' onChange={handleFilter} size='sm'>
       {filterValues.map((e,index) => (<option value={e} key={index}>{e}</option>)
        )}
    </Select>
    </Box>

    <Box w='150px'>
    <Select placeholder='Sort By' onChange={handleSort} size='sm'>
       {values.map((el,i) => (<option value={el} key={i}>{el}</option>)
        )}
    </Select>
    </Box>
    </Box>

    <Grid templateColumns={["repeat(1,300px)","","repeat(3,400px)"]} textAlign="center" gap={10} margin="auto" justifyContent={["center","","space-around"]} >
        {
            state.map((e) => <GridItem w={["","","300"]}  key={e.id} boxShadow='xl' borderRadius='10px' backgroundColor='#DAE5D0'>
            <Image src={e.image} alt="" w={["300px","300px","400px"]} h={["120px","150px","200px"]} margin='auto' borderTopRadius='10px'/>
            <Text fontSize='20px' textAlign={['center',"center","left"]} marginLeft='10px' marginTop='10px' fontWeight='bold'>Course Name: {e.title}</Text>
            <Box display={["block","",'flex']} justifyContent='space-between' margin='10px' fontSize='15px'>
            <Text>Course Duration: {e.hour}</Text>
            <Text>Level: <b>{e.level}</b></Text>
            </Box>
            <Text textAlign={['center',"center","left"]} marginLeft='10px' marginBottom='10px'><b>Price: ₹{e.price}</b></Text>
            </GridItem>)
            
        }
    </Grid>

        <Box display='flex' gap='10px' marginTop={['80px','100px','170px']} justifyContent='center'>
            <Button onClick = {() => {if(page == 1){
                            setPage(page)

                              }else{setPage(page-1)}  
                                }} disabled={page == 1} colorScheme='blue'>Prev</Button>

            <Button onClick = {() => {
            let totalpage = state.length+1
            if(page > totalpage){
                return

            }else{
                setPage(page+1)
            }
            }} disabled={page > state.length+1} colorScheme='blue'>Next</Button>
        </Box>

    </Box>
</>
  )
}
