"use Client"
import Certificate from "./certificateCard";

import Verify from "./verification";
export default function VerifyPage() {
    return (
        <div className=" flex items-left justify-around p-20 ">
            <Certificate />
            <Verify />
        </div>
    );
}
