"use client"
import React, {useEffect } from 'react'

const ids = ["R-A-14241249-4","R-A-14241249-5"]

const EndAd = (props) => {
       useEffect(()=>{
           setTimeout(()=>{
             window.yaContextCb.push(() => {
               Ya.Context.AdvManager.render({
               "blockId": ids[Math.floor(Math.random() * 2)],
               "renderTo": "ad-3"
               })
             })
           },2000)
       },[])
  return (
    <>
    {props.para}
    <div id="ad-3"/>
    </>
  )
}

export default EndAd