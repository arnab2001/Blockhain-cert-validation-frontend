"use client"
import { ExternalLink,CheckCheck } from 'lucide-react';
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { FaCheckCircle } from "react-icons/fa";


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useEffect, useState } from "react"

import { Form} from "@/components/ui/form"

import { set, useForm } from "react-hook-form"

export default function Generate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const form = useForm();
  const [file, setFile] = useState(null);
  const [cid, setCid] = useState(null);
  const [data, setData] = useState(null);
  const [college, setCollege] = useState(null); // Assuming college data is stored in localStorage
  const [studentId, setStudentId] = useState(null);
  const [minLength, setMinLength] = useState(24); // Minimum Mongoid length (adjust based on your actual Mongoid format)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [certificateResponse, setCertificateResponse] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Assuming single file upload
  };

  const uploadToIPFS = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const cid = "https://ipfs.io/ipfs/z6MkjFW2Sd...";
      setCid(cid);
    } catch (error) {
      console.error(error); // Handle errors appropriately
    }
  };




  useEffect(() => {
    setCollege(JSON.parse(localStorage.getItem("data")));
  }, [localStorage.getItem("data")]);

  const getStudent = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3001/student/${studentId}`);
      if (response.status === 200) {
        setData(response.data.student[0]); // Assuming the first student in the response array
      } else {
        setError("Failed to fetch student");
      }
    } catch (error) {
      setError("Failed to fetch student");
    } finally {
      setLoading(false);
    }
  };

  // Throttling using a debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const debouncedGetStudent = debounce(getStudent, 1000); // Call getStudent after 500ms of no changes

  // Check Mongoid length before calling API
  const handleStudentIdChange = (e) => {
    setMinLength(e.target.value.length); // Update minimum length
    setStudentId(e.target.value);
    if (e.target.value.length >= minLength) {
      debouncedGetStudent(); // Call throttled getStudent if minimum length reached
    }
  };

  useEffect(() => {
    if (studentId && studentId.length >= minLength) {
      getStudent(); // Call getStudent directly if minimum length already met on initial render
    }
  }, [studentId, minLength]); // Dependency array: studentId and minLength

  const onSubmit = async (formData) => {
    console.log("College data:", college);
    console.log("Form data:", formData);
    const fullname = `${formData.firstName} ${formData.lastName}`;
    try {
      await axios.post("http://localhost:3001/certificate/generate", {
        ...{...formData, assignDate: new Date(formData.assignDate).getTime()},
        candidateName: fullname,
        orgName: college?.name,
        ipfsHash: "QmZxQh5",
      }).then((response) => {
        setCertificateResponse(response.data);
        
        
       
        console.log("Mail sent:", response.data);
      
        console.log("Certificate generated:", response.data);
      })

    

      

    


    } catch (error) {
      console.error(error); // Handle errors appropriately
    }
  };

  const mail = async (formData) => {
    try {
       await axios.post(`http://localhost:3001/certificate/mail/${certificateResponse.data.certificateId}`,
        {
          to: formData.email,
          subject: "Your Certificate has been uploaded",
          text: "Please download your certificate",
          html: `http://localhost:3000/verify/${certificateResponse.data.certificateId}`
        }
      ).then
      ((response) => {
        console.log("Mail sent:", response.data);
      });
    }
    catch (error) {
      console.error(error); // Handle errors appropriately
    }
  };

  useEffect(() => {
    if (certificateResponse) {
      mail();
    }
  }, [certificateResponse]);


    

  const firstName = data?.name?.split(" ")[0] || "";
  const lastName = data?.name?.split(" ")[1] || "";
  return (
    <Card className="w-[50%] ">
      <CardHeader>
        <CardTitle className="text-xl">Generate Certificate</CardTitle>
        <CardDescription>
          Enter Students Information to generate Certificate
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          

            <div className="grid gap-2">
                <Label htmlFor="studentId">Student ID</Label>
                <Input
                  {...register("studentId", { required: true })}
                  id="studentId"
                  type="text"
                  onChange={handleStudentIdChange}
                  defaultValue={data?.studentId || ""}
                />
                {/* {errors.studentId && (
                  <FormMessage className="text-red-500">{errors.studentId.message}</FormMessage>
                )} */}
              </div>
              <div className="grid grid-cols-2 gap-4">
                
                <div className="grid gap-2">
                  <Label htmlFor="first-name">First name</Label>
                  <Input
                    {...register("firstName", { required: true })}
                    id="first-name"
                    placeholder="Max"
                    defaultValue={firstName || ""}
                  />
                  {/* {errors.firstName && (
                    <FormMessage className="text-red-500">{errors.firstName.message}</FormMessage>
                  )} */}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input
                    {...register("lastName", { required: true })}
                    id="last-name"
                    placeholder="Robinson"
                    defaultValue={lastName || ""}
                  />
                  {/* {errors.lastName && (
                    <FormMessage className="text-red-500">{errors.lastName.message}</FormMessage>
                  )} */}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email", { required: true })}
                  id="emailId"
                  type="email"
                  placeholder="m@example.com"
                  defaultValue={data?.email || ""}
                />
                {/* {errors.email && (
                  <FormMessage className="text-red-500">{errors.email.message}</FormMessage>
                )} */}
              </div>

             

              <div className="grid gap-2">
                <Label htmlFor="courseName">Course</Label>
                <Input
                  {...register("courseName", { required: true })}
                  id="courseName"
                  defaultValue={data?.courseName || ""}
                />
                {/* {errors.courseName && (
                  <FormMessage className="text-red-500">{errors.courseName.message}</FormMessage>
                )} */}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="assignDate">Date</Label>
                  <Input {...register("assignDate", { required: true })} id="assignDate" type="date"  />
                  {/* {errors.assignDate && (
                    <FormMessage className="text-red-500">{errors.assignedOn.message}</FormMessage>
                  )} */}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="duration">duration</Label>
                  <Input {...register("duration", { required: true })} id="issuedBy" type="number" />
                  {/* {errors.duration && (
                    <FormMessage className="text-red-500">{errors.duration.message}</FormMessage>
                  )} */}
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="file">File</Label>
                <Input {...register("file")} id="file" onChange={handleFileChange} type="file" />
                <Button type="button" className="w-full" onClick={uploadToIPFS}>
  Upload to IPFS
</Button>
{cid && (

  <p className="text-green-500">IPFS CID: {cid}</p>
)}
  
              </div>

              <Button type="submit" className="w-full">
                Generate Certificate
              </Button>
            </form>
          </Form>

          {certificateResponse && (
            <Alert variant="success" className="color-green">
              <AlertTitle><p><CheckCheck color="#b4cc00" />Certificate Generated</p></AlertTitle>
              <AlertDescription>
                Certificate for {certificateResponse.data.candidateName} has been generated successfully.
                Click <Link href={`/certificate/${certificateResponse.data.certificateId}`} className=""><Button variant="link">here<ExternalLink className="mr-2 h-4 w-4" /></Button></Link> to view the certificate.
                <br/><p>View Certificate in Block Explorer: <Link href={`https://sepolia.etherscan.io/tx/${certificateResponse.receipt.transactionHash}`}> <Button variant="link">Click Here<ExternalLink className="mr-2 h-4 w-4" /></Button></Link> </p>
              </AlertDescription>
            </Alert>
          ) 
          }
          
        </div>

      </CardContent>
     
    </Card>
  )
}


