"use client";
import axios from 'axios';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
  } from "@/components/ui/card"

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { useRouter } from 'next/router';
import { set } from 'react-hook-form';
import { ShieldCheck } from 'lucide-react';

export default function Verify() {

    const [verified, setVerified] = useState(null); // Use useState inside the component
    const id = window.location.pathname.split('/')[2];
    const verifycert = async () => {
        const response = await axios.get(`http://localhost:3001/certificate/verify/${id}`);
        setVerified(response.data);
        
    }

    return (
        <div className=" flex items-left justify-around  ">
        <Card className="max-h-40 max-w-60">
        <CardHeader>
        <CardTitle className="text-xl ">Verify This Certificate </CardTitle>
        
        <Button  className="mt-4" onClick={verifycert}>Verify</Button>
        <CardDescription>
            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight transition-colors first:mt-0">
        
     
            {verified ? 
            <CardDescription className="flex flex-row ml-5 text-l color-green" ><ShieldCheck color="#17c700" /><p style={{color:"17c700"}} >Verified via Ethereum Network</p></CardDescription> :
            verified === false ?
            <CardDescription className="flex flex-row ml-5 text-xl" ><p style={{color:"red"}} >Not Verified</p></CardDescription> :
            verified === null ?
            <CardDescription className="flex flex-row ml-5 text-xl">
               <ShieldCheck className='mb-1 mr-2' /> <p > Click to verify</p>
                </CardDescription> : null

            }
        </h2>
          
        </CardDescription>
      </CardHeader>
        </Card>

    </div>
    );
}
