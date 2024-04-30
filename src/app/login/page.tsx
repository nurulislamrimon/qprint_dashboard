"use client";
import { useUserLoginMutation } from "@/store/features/auth/authApi";
import { useRouter } from "next/navigation";
import { storeUserInfo } from "@/services/auth.service";
import { RootState } from "@/store/store";
import { setPhoneNumber, setPassword } from "@/store/features/auth/authSlice";
import CustomGlobalInput from "@/components/shared/CustomGlobalInput";
import ButtonPrimary from "@/components/ui/btn/ButtonPrimary.";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import logo from "@/assets/logo.png";
import Image from "next/image";
import { toast } from "react-toastify";
interface ILogin {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const { email, password }: ILogin = useAppSelector(
    (state: RootState) => state.authSlice
  );
  const [userLogin] = useUserLoginMutation();
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await userLogin({ email, password }).unwrap();
      if (res?.data?.accessToken) {
        router.push("/dashboard");
      }
      storeUserInfo({ accessToken: res?.data?.accessToken });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center shadow-product-card-shadow login-container-image bg-[url('/src/assets/login-background.png')]">
      <div className="bg-white p-5 md:p-12 rounded-cust   om-5px text-center">
        <span className="bg-main-bg-color-opacity-32 p-2 rounded-full text-xs text-fuchsia-800 text-center">
          Panel
        </span>
        <div className="flex items-center justify-center my-5">
          <Image
            src={logo}
            className="[width:clamp(140px,50vw,160px)]"
            alt="Logo"
          />
        </div>
        <p className="text-center text-lg text-black-opacity-50">
          Best online ecommerce website for you
        </p>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-5 mt-20">
            <CustomGlobalInput
              value={email}
              onChange={(e) => dispatch(setPhoneNumber(e.target.value))}
              placeholder="Email"
              type="text"
              className={`w-full md:w-[500px]`}
              name="email"
            />
            <CustomGlobalInput
              value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              placeholder="Password"
              type="password"
              className={`w-full md:w-[500px]`}
              name="password"
            />
            <ButtonPrimary type="submit" buttonText="Login" />

            <div className="flex items-center justify-start gap-2">
              <input
                type="checkbox"
                id="remember-me"
                name="remember-me"
                value="remember-me"
                className="checked:bg-fuchsia-400 border-main-border-color bg-red-700 checked:border-transparent rounded-lg"
              />
              <label htmlFor="remember-me" className="text-black-opacity-50">
                Remember Me for 30 days
              </label>
            </div>
          </div>
        </form>
        <a
          href="/dashboard"
          className="main-text-color text-lg font-bold mt-10"
        >
          Visit Website
        </a>
      </div>
    </div>
  );
};

export default Login;
