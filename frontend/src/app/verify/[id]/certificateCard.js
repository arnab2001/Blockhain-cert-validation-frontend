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
import { useEffect, useState } from "react";
import Image from 'next/image';

export default function Certificate() {
  // Data will be populated in getStaticProps or getServerSideProps
  const [data, setCertificateData] = useState({});
  const [parsedMetaData, setParsedMetaData] = useState({});
  const id = window.location.pathname.split('/')[2];
  console.log(id);
    

  const academicJson = {
    metaData: {
        "first Semester": {
            "Subjects": ["Maths", "Physics", "Chemistry"],
            "Marks": [90, 80, 70]
        },
        "Second Semester": {
            "Subjects": ["EE", "C++", "Maths-II"],
            "Marks": [90, 80, 70]
        },
        "Third Semester": {
            "Subjects": ["Java", "DBMS", "OS"],
            "Marks": [90, 80, 70]
        }
    }
}
  // Fetch certificate data from API http://localhost:3001/certificate/data/:id
    useEffect(() => {
        const fetchCertificateData = async () => {
        const response = await axios.get(`http://localhost:3001/certificate/data/${id}`);
        setCertificateData(response.data);
        };
        const decodedMetaData = data?.metaData ? Buffer.from(data.metaData, 'base64').toString('utf-8') : '';
        // setParsedMetaData(JSON?.parse(decodedMetaData))
        //call this api as well: http://localhost:3001/auth/663fb49b112bb411387e1aef

        fetchCertificateData();
    }, [id]);
    
  return (
    <Card className="shadow-md rounded-lg border border-gray-200">
    <CardHeader className="p-4 flex items-center justify-between">
      <div>
        <CardTitle className="text-2xl font-semibold leading-none tracking-tight">{data?.candidateName}</CardTitle>
        <CardDescription className="text-gray-600 text-sm">{`Issued by ${data?.orgName}`}</CardDescription>
        <Image src="https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Maulana_Abul_Kalam_Azad_University_of_Technology_Logo.svg/440px-Maulana_Abul_Kalam_Azad_University_of_Technology_Logo.svg.png" alt="college" width={200} height={200} />
      </div>
      <div className="flex items-center space-x-2">
        <p className="text-gray-500 text-sm">Assign Date: {data?.assignDate}</p>
        <p className="text-gray-500 text-sm">Duration: {data?.duration} {data?.duration === 1 ? 'Day' : 'Days'}</p>
      </div>
    </CardHeader>
    <CardContent className="p-4">
      <div className="flex flex-col space-y-2">
        <div className="text-gray-700 font-medium">Course Name:</div>
        <div className="text-gray-600">{data?.courseName}</div>
        <div className="text-gray-700 font-medium">Student ID:</div>
        <div className="text-gray-600">{data?.studentId}</div>
        {/* <div className="text-gray-700 font-medium">Metadata:</div>
        <div className="text-gray-600 prose max-w-prose overflow-hidden text-ellipsis">
          {data?.metaData}
        </div> */}
        <div className="text-gray-700 font-medium">Metadata:</div>
        <table className="table-auto w-full">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="px-4 py-2 text-sm font-medium text-gray-900">Semester</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-900">Subjects</th>
                <th className="px-4 py-2 text-sm font-medium text-gray-900">Marks</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(academicJson.metaData).map(([semester, data]) => (
                <tr key={semester} className="border-b border-gray-200">
                  <td className="px-4 py-4 text-sm text-gray-700">{semester}</td>
                  <td className="px-4 py-4 text-sm text-gray-700">{data.Subjects.join(', ')}</td>
                  <td className="px-4 py-4 text-sm text-gray-700">{data.Marks.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </CardContent>
    <CardFooter className="p-4 flex flex-col justify-between items-start">
      <p className="text-gray-500 text-sm">IPFS Hash: {data?.ipfsHash}</p>
  
        <p className="text-gray-500 text-sm">Transaction Hash: {data?.transactionHash}</p>
        <p className="text-gray-500 text-sm">Block Hash: {data?.blockHash}</p>
      
    </CardFooter>
  </Card>
  );
}

