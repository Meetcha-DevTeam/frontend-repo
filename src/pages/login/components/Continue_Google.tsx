import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { postGoogleAuthCode } from "@/apis/useloginAPIs";

import google_logo from "../../../assets/Google.svg";

import { useNavigate } from "react-router-dom";

import "../styles/login.scss";

const Continue_Google = () => {
  const navigate=useNavigate();

  const login = useGoogleLogin({
    flow: "auth-code", // 인가 코드 방식
    
    onSuccess: async(codeResponse) => {
      try{
        const data=await postGoogleAuthCode(codeResponse.code);
        console.log("토큰 응답:",data);

        if(data.isSuccess){
          sessionStorage.setItem("access-token",data.data.accessToken);
          navigate("/login_complete");
        }else{
          alert("로그인 실패: "+data.message);
        }
      } catch(err){
        console.error("API 호출 실패:",err);
      }
    },
    onError:(error)=>{
      console.error("구글 로그인 실패: ",error);
    },
});

  return (
    <button className="google_button" onClick={login}>
      <img src={google_logo} alt="google_logo" />
      <p>Continue with Google</p>
    </button>
  );
};

export default Continue_Google;
