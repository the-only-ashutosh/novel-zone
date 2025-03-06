"use client"
import React, {  useEffect } from 'react'

const EndAd = (props) => {
    useEffect(()=>{
        setTimeout(()=>{
          window.yaContextCb.push(() => {
            Ya.Context.AdvManager.render({
            "blockId": "R-A-14241249-3",
            "renderTo": "yandex_rtb_R-A-14241249-3"
            })
          })
        },3000)
    })
  return (
    <>
    {props.para}
    <div id="yandex_rtb_R-A-14241249-3"/>
    </>
  )
}

export default EndAd