import React, { useState } from "react";
import "./NavBar.css";
import {Link} from 'react-router-dom';
import AddAQuestion from "../AddAQuestion/AddAQuestion";
import { SearchBar } from '../searchbar/SearchBar';
import Logo from '../kurakoo-logo.png';
import {Button} from '@material-ui/core'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';


// function rand() {
//     return Math.round(Math.random() * 20) - 10;
//   }
  
//   function getModalStyle() {
//     const top = 50 + rand();
//     const left = 50 + rand();
  
//     return {
//       top: `${top}%`,
//       left: `${left}%`,
//       transform: `translate(-${top}%, -${left}%)`,
//     };
//   }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      top: 45,
      left: 350,
      width: 775,
      height: 580,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      
    },
  }));
  

export default function Navbar() {
    const classes = useStyles();
    // const [modalStyle] = React.useState(getModalStyle);
    const [openPopup, setOpenPopup] = useState(false);
    
    const handleOpen = () => {
        setOpenPopup(true);
      };

      const handleClose = () => {
        setOpenPopup(false);
      }

    return (
        <div>
            <nav className = "Nav">
                <div>
                   <Link to ="/"><img id = "logo" src= {Logo} alt = "alt"/></Link> 
                </div>
                <div className = "nav-options">
                    <div className = "option">
                        {data.svg1}
                    </div>
                    <div className = "option">
                        {data.svg2}
                    </div>
                    <div className = "option search">
                        <SearchBar/>
                    </div>
                    <div className = "option">
                    <Button variant="contained" 
                    type="button"
                    color="secondary" size="large"
                    onClick={handleOpen} >
                       <QuestionAnswerIcon/> &emsp; Ask Question
                    </Button>

                    </div>
                    <div className = "option">
                    <Link to ="/notification"> {data.notification}</Link>
                    </div>
                </div>
            </nav>
            <Modal
            open ={openPopup}
            onClose={handleClose}>
                <div  className={classes.paper}>
                <AddAQuestion/>
                </div>
                
            </Modal>
        </div>
    );
  
}


const data = {

    svg1: <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M33.056 35H1.94397C1.42897 35 0.934007 34.8156 0.570007 34.4874C0.205007 34.1592 0 33.7141 0 33.25V10.5H35V33.25C35 33.7141 34.795 34.1592 34.43 34.4874C34.066 34.8156 33.571 35 33.056 35ZM35 7H0V1.75C0 1.2859 0.205007 0.8408 0.570007 0.5126C0.934007 0.1844 1.42897 0 1.94397 0H33.056C33.571 0 34.066 0.1844 34.43 0.5126C34.795 0.8408 35 1.2859 35 1.75V7ZM7.77802 15.75V22.75H15.556V15.75H7.77802ZM7.77802 26.25V29.75H27.222V26.25H7.77802ZM19.444 17.5V21H27.222V17.5H19.444Z" fill="#411818"/>
    </svg> ,
    
    svg2: <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M34.9997 0C31.4597 0.2434 6.59174 2.6113 4.85374 19.6609C4.64274 21.4834 4.5227 23.3141 4.4437 25.1461L16.6717 12.9309C17.0987 12.5037 17.7927 12.5037 18.2197 12.9309C18.6477 13.3582 18.6477 14.0507 18.2197 14.4779L0.48075 32.1995C-0.16025 32.84 -0.16025 33.8791 0.48075 34.5196C1.12175 35.1601 2.16175 35.1601 2.80375 34.5196L6.70872 30.6183C9.58572 30.6087 12.4617 30.4454 15.3197 30.1152C18.9757 29.7433 21.9517 28.3057 24.3827 26.2501H17.4817L27.5168 22.9087C28.2858 21.8908 28.9768 20.8094 29.5978 19.6876H24.0508L31.3348 16.0502C34.1998 9.0823 34.8757 1.7951 34.9997 0Z" fill="#411818"/>
    </svg> ,
    
    notification: <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.21997 2.91662C7.49997 4.21282 6.11996 5.83322 5.07996 7.77772C4.03996 9.72212 3.45999 11.8016 3.35999 14.0161H0C0.1 11.3155 0.76999 8.77692 1.98999 6.40042C3.21999 4.02382 4.84 2.05242 6.88 0.486019L9.21997 2.91662ZM31.5601 14.0161C31.4601 11.8016 30.87 9.72212 29.8 7.77772C28.74 5.83322 27.34 4.21282 25.63 2.91662L28.05 0.486019C30.08 2.05242 31.69 4.02382 32.89 6.40042C34.09 8.77692 34.77 11.3155 34.92 14.0161H31.5601ZM28.28 14.9073V24.3865L31.64 27.8703V29.5717H3.28003V27.8703L6.64001 24.3865V14.9073C6.64001 12.2607 7.41998 9.92472 8.97998 7.89922C10.55 5.87372 12.53 4.56392 14.92 3.96982V2.83552C14.92 2.07942 15.17 1.45822 15.66 0.97212C16.16 0.48602 16.76 0.24292 17.46 0.24292C18.16 0.24292 18.75 0.48602 19.22 0.97212C19.69 1.45822 19.92 2.07942 19.92 2.83552V3.96982C22.37 4.56392 24.3799 5.87372 25.9399 7.89922C27.4999 9.92472 28.28 12.2607 28.28 14.9073ZM17.42 34.7568C16.54 34.7568 15.77 34.4193 15.12 33.7441C14.47 33.0689 14.14 32.2723 14.14 31.3541H20.78C20.78 31.7862 20.7 32.2183 20.55 32.6504C20.08 33.7846 19.27 34.4598 18.13 34.6758C17.92 34.7298 17.68 34.7568 17.42 34.7568Z" fill="#411818"/>
    </svg>
    
}