import React from "react";
import Head from "next/head";
import ContactUs from "./contactUs/contactus";
export default function home(){
  return(
    <>
     <Head><title>ContactUs</title></Head>
     <ContactUs></ContactUs>
  </>
  ) 
}