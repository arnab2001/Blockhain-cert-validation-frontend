"use client"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'
// Assuming you're using `ethereum` library for MetaMask interaction


export function LoginForm() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
const router = useRouter();
  const connectToMetaMask = async () => {
    
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        if (accounts.length > 0) {
          setIsConnected(true);
          localStorage.setItem("account", accounts[0]);

          const response = await axios.post("http://localhost:3001/auth/login", {
            publicAddress: "0x8f46b9aa5e90ffaa629d983b4cb72efa768acd92",
          });
          if (response.status === 200) {
            console.log("Logged in successfully");
            
            const data = await response.json(); 
            console.log("Login successful!", data);
            localStorage.setItem("data", JSON.stringify(data.university))
            
          }
          else {
            console.log("Failed to login");
          }

          
          console.log("Connected to MetaMask account:", accounts[0]);
        } else {
          console.log("No accounts found in MetaMask");
        }
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
        // Handle connection error (e.g., display error message to user)
      }
      finally {
        router.push('/dashboard');
      }
    } else {
      console.log("MetaMask not detected");
      // Handle MetaMask not installed (e.g., display message to user)
    }
    
  };

  return (
    <Card className="w-full pt-10 max-w-sm ">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Connect your Metamask wallet to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2 justify-center">
          <Image src="https://freelogopng.com/images/all_img/1683021055metamask-icon.png" width={200} height={200} />
        </div>
        {isConnected ? (
          <div>
            <p>Connected account: {account}</p>
          </div>
        ) : (
          <Button className="w-full" onClick={connectToMetaMask}>
            Connect with Metamask
          </Button>
        )}
      </CardContent>
      <CardFooter>
       
      </CardFooter>
    </Card>
  );
}
