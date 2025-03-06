"use client"
import React, {  useEffect } from 'react'

const MiddleAd = (props) => {
    useEffect(()=>{
        setTimeout(()=>{
          window.yaContextCb.push(() => {
            Ya.Context.AdvManager.render({
            "blockId": "R-A-14241249-2",
            "renderTo": "yandex_rtb_R-A-14241249-2"
            })
          })
        },2500)
    })
  return (
    <>
    <div id="yandex_rtb_R-A-14241249-2"/>
    {props.para}
    </>
  )
}

export default MiddleAd