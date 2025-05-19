import { useNavigate } from "react-router";
import { UpdateUserForm } from "../components/UpdateUserForm"
import { Button } from "@/components/ui";
import { ArrowLeft } from "lucide-react";

export const UpdateProfilePage = () => {
    const navigate = useNavigate();
    return (

        <div className=" relative flex flex-col gap-4 p-4 w-full items-center justify-center">

            <Button variant="outline" size="icon" className="cursor-pointer absolute top-4 left-4" onClick={() => { navigate(-1) }}>
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Volver</span>
            </Button>
            <div className=" flex flex-row  mt-4 w-full">

                <UpdateUserForm />
            </div>
        </div >
    )
}
