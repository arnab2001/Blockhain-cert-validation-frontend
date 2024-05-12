"use client";
import { Card ,CardHeader,CardDescription,CardTitle} from "@/components/ui/card";
import Generate from "./generate";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Page() {
    const [college, setCollege] = useState(null);
    useEffect(() => {
        setCollege(JSON.parse(localStorage.getItem("data")));
      }, [localStorage.getItem("data")]);

    return (
        <div className=" flex items-left justify-around  mt-10 ">
        <Generate className="justify-end" />
        <Card className="max-h-80">
        <CardHeader>
        <CardTitle className="text-xl">University Details </CardTitle>
        <CardDescription>
          This Certificate will be issued by
        </CardDescription>
        <CardDescription>
          <Image src="https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Maulana_Abul_Kalam_Azad_University_of_Technology_Logo.svg/440px-Maulana_Abul_Kalam_Azad_University_of_Technology_Logo.svg.png" alt="college" width={200} height={200} />
        </CardDescription>
        <CardDescription>
        <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
       
      </h2>
         
        </CardDescription>
      </CardHeader>
        </Card>

    </div>
    );
}