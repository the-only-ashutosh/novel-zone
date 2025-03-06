"use client"
import React, {  useEffect } from 'react'

const TopAd = (props) => {
    useEffect(()=>{
        setTimeout(()=>{
          window.yaContextCb.push(() => {
            Ya.Context.AdvManager.render({
            "blockId": "R-A-14241249-1",
            "renderTo": "yandex_rtb_R-A-14241249-1"
            })
          })
        },2000)
    })
  return (
    <>
    <div id="yandex_rtb_R-A-14241249-1"/>
    {props.para}
    </>
  )
}

export default TopAd