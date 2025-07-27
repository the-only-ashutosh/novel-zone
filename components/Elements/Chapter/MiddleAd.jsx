"use client"
import React, {  useEffect } from 'react'

const ids = ["R-A-14241249-3","R-A-14241249-6"]

const MiddleAd = (props) => {
    useEffect(()=>{
        setTimeout(()=>{
          window.yaContextCb.push(() => {
            Ya.Context.AdvManager.render({
            "blockId": ids[Math.floor(Math.random() * 2)],
            "renderTo": "ad-2"
            })
          })
        },1000)
    },[])
  return (
    <>
    <div id="ad-2"/>
    {props.para}
    </>
  )
}

export default MiddleAd