import React from 'react'
import './styles.css'
import tickIcon from '../../assets/tickIcon.svg'
import reviewStar from '../../assets/reviewStar.png'
import { PiChatCenteredLight } from "react-icons/pi";
import { VscStarFull } from "react-icons/vsc";
import { IoIosCheckmarkCircle } from "react-icons/io";


export const SummaryOfReviews = () => {
  return (
    <div className='summaryOfReviewsContainer'>
      <h2 className='reviewTitle'>Summary of Reviews</h2>
      <div className='reviewAuthentication'>
      <IoIosCheckmarkCircle size={24} color='#317AAB'/>
        <p>Reviews have been summarised from Times readers from Feefo</p>
      </div>
      <div className='reviewRating'>
        <div className='reviewStars'>
        <VscStarFull size={24} color='#317AAB'/>
        <VscStarFull size={24} color='#317AAB'/>
        <VscStarFull size={24} color='#317AAB'/>
        <VscStarFull size={24} color='#317AAB'/>
        <VscStarFull size={24} color='#317AAB'/>
        </div>
        <p className='reviewText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
      <div className='linkToReviews'>
      <PiChatCenteredLight size={24}/>
      <p>View Reviews in Feefo</p>
      </div>
    </div>
  )
}

