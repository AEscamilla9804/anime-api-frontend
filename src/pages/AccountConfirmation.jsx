import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../config/axios";
import ConfirmationMessage from "../components/ConfirmationMessage";
import ReturnBtn from "../components/ReturnBtn";

const AccountConfirmation = () => {
    const [message, setMessage] = useState({});
    const [loading, setLoading] = useState(true);

    const params = useParams();
    const { token } = params;

    useEffect(() => {
        const confirmAccount = async () => {
            try {
                const url = `/users/confirm/${token}`;
                const { data } = await axiosClient(url);
                setMessage({ msg: data.msg });
            } catch (error) {
                console.log(error);
                setMessage({ msg: 'Invalid Token', error: true });
            }

            setLoading(false);
        }

        confirmAccount();
    }, [token]);

  return (
    <>
        <div className="bg-[#2f3542] flex p-10 justify-center items-center text-center md:text-start md:h-screen md:w-1/2">
            <h1 className="text-gray-200 font-bold text-5xl">
                To all <span className="text-cyan-600">Ani</span>Verse new members: Welcome to the <span className="text-cyan-600">Family!</span>
            </h1>
        </div>

        <div className="relative flex flex-col gap-2 px-10 py-15 md:py-10 justify-center items-center md:h-screen md:w-1/2">
            { loading ? (
                <>
                    <img 
                    src="/no-results.webp" 
                    alt="Loading" 
                    className="w-60 h-60"
                />

                <p className="font-bold text-3xl">Awaiting for Confirmation...</p>
                </>
            ) : (
                <>
                    <ConfirmationMessage message={message} />
                    <ReturnBtn destination={'Login'}/>
                </>
            )}
        </div>
    </>
  )
}

export default AccountConfirmation