import React,{createContext, useEffect, useState} from "react";
import axios from "axios";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./Display.css"
import { Modal, ModalHeader } from "reactstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Form from "./Form"

const visibleContext = createContext();
const visibleContextProvider = function Display(props) {
    const [show,setShows] = useState([])
    const [isEditable, setIsEditable] = useState(false);
    useEffect(()=>{
        axios.get("https://reqres.in/api/users?page=1")
        .then((response)=>{
            console.log(response)
           setShows(response.data.data)
        })
    }, []);
    return (        
    <div className="display_item">
        <Modal 
            size="1g"
            isOpen={isEditable}
            toggle={() => setIsEditable(!isEditable)}
        >
      <ModalHeader
      toggle={() => setIsEditable(!isEditable)}>
      <Form/>
      </ModalHeader>
      </Modal>
        <visibleContext.Provider props={show} vlaue={props.image}>
            <div className="container">
                {
                    show.map((value)=>{
                        return(
                            <div className="row">
                                <CardContent>                      
                                    <Typography sx = {{fontSize:17, fontWeight:700 , marginLeft:6}}>
                                        {value.first_name} {value.last_name}<br/>
                                    </Typography>
                                    <Typography>
                                        {value.email}<br/>
                                    </Typography>
                                </CardContent>
                                    <CardMedia sx={{ maxWidth: 200 }}
                                        component="img"
                                        image={value.avatar}
                                    />
                            </div>
                        )
                    })
                    
                }
                
                <button className="Details_enter" onClick={()=>setIsEditable(true)}>Enter Details</button>
                
                 
            </div>
       </visibleContext.Provider>
       {/* <button className="Details_enter" onClick={<Form/>}>Enter Details</button>  */}

    </div>
  )
}

export default visibleContextProvider