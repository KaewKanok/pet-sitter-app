"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

// import { IoNotificationsOutline } from "react-icons/io5";
import { FaRegComments } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { PiBell } from "react-icons/pi";
import LogoutModal from "../confirm-logout/LogoutModal";
import { BeatLoader } from "react-spinners";

function Navbar({ session }) {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  if (isLoading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <BeatLoader size={15} color={"#FF7037"} margin={2} />
      </div>
    );
  }
  function handleDropDown() {
    console.log("first");
    setIsOpen(!isOpen); // Toggle dropdown visibility
  }
  const handleOpenModal = () => {
    setIsPressed(true);
    setConfirmLogout(true);
  };

  const handleCloseModal = () => {
    setConfirmLogout(false);
  };

  return (
    <nav className="w-full h-[80px]  p-[12px_20px] flex justify-center items-center text-center lg:p-[0px_80px]">
      <div className="flex justify-between items-center text-center max-w-[1440px] p- w-full">
        <img
          src="/logo-black.png"
          className="w-[78.97px] h-[24px] sm:w-[131.61px] sm:h-[40px] cursor-pointer"
          onClick={() => router.push("/")}
        />
        {!session && (
          <div className="flex lg:gap-4 gap-0 text-body1 text-black  max-sm:hidden">
            <button
              onClick={() => {
                setIsLoading(true);

                router.push("/login/pet-sitter");
              }}
              className="lg:p-[16px_24px] p-[16px_20px] hover:text-orange-500 active:text-orange-600"
            >
              Become a Pet Sitter
            </button>
            <button
              onClick={() => {
                setIsLoading(true);

                router.push("/login");
              }}
              className="lg:p-[16px_24px] p-[16px_20px] hover:text-orange-500 active:text-orange-600"
            >
              Login
            </button>
            <button
              onClick={() => {
                setIsLoading(true);

                router.push("/search");
              }}
              className="bg-orange-500 text-white rounded-full text-[16px] font-bold lg:p-[16px_24px] p-[16px_20px] hover:bg-orange-400 active:bg-orange-600"
            >
              Find A Pet Sitter
            </button>
          </div>
        )}
        {session && (
          <div className="flex gap-6 items-center max-sm:hidden">
            <div className="flex gap-2 relative">
              <div className="w-[48px] h-[48px] bg-gray-100 rounded-full flex justify-center items-center">
                <PiBell className="w-[24px] h-[24px] text-gray-400" />
              </div>
              <div className="w-[48px] h-[48px] bg-gray-100 rounded-full flex justify-center items-center">
                <FaRegComments className="w-[24px] h-[24px] text-gray-400" />
              </div>
              <button
                className="w-[48px] h-[48px] bg-gray-100 rounded-full flex justify-center items-center relative"
                onClick={handleDropDown}
              >
                <FaRegUser
                  className={`w-[24px] h-[24px] ${
                    isOpen
                      ? "text-orange-500"
                      : "text-gray-400 hover:text-gray-500 active:text-gray-600"
                  }`}
                />
              </button>
            </div>
            <Link
              href=""
              className="bg-orange-500 text-white rounded-full text-[16px] font-bold lg:p-[16px_24px] p-[16px_20px] hover:bg-orange-400 active:bg-orange-600"
            >
              Find A Pet Sitter
            </Link>
          </div>
        )}
        <div className="sm:hidden flex justify-center items-center gap-[24px]">
          <PiBell className="w-[24px] h-[24px] text-gray-400" />
          <FaRegComments className="w-[24px] h-[24px] text-gray-400" />
          <div
            className="w-[24px] h-[24px] flex flex-col justify-around "
            onClick={handleDropDown}
          >
            <div className="border-2 rounded border-gray-600"></div>
            <div className="border-2 rounded border-gray-600"></div>
            <div className="border-2 rounded border-gray-600"></div>
          </div>
        </div>
      </div>

      {/* drop down */}
      {isOpen && session && (
        <nav className="rounded-[4px] z-50 mt-2 p-[40px_16px] sm:p-[0px_4px] absolute top-[48px] sm:top-[70px] w-screen sm:w-[186px] sm:right-20  lg:right-36 xl:right-36 custom1:right-[14rem] custom2:right-[20rem] bg-white text-black text-body2 shadow-lg shadow-black/4">
          <div className="flex flex-col py-[8px] gap-[16px]">
            <button className="flex justify-start items-center gap-[16px] sm:gap-[12px]  p-[16px] sm:p-[8px_24px]  hover:text-gray-400">
              <svg
                width="20"
                height="20"
                viewBox="0 0 18 18"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.0904 9.59169C12.9074 8.94891 13.5038 8.06746 13.7965 7.06997C14.0892 6.07249 14.0637 5.00858 13.7236 4.02625C13.3835 3.04391 12.7457 2.19202 11.8988 1.58907C11.052 0.986122 10.0383 0.662109 8.99878 0.662109C7.95923 0.662109 6.94554 0.986122 6.09872 1.58907C5.2519 2.19202 4.61406 3.04391 4.27395 4.02625C3.93384 5.00858 3.90837 6.07249 4.20108 7.06997C4.49378 8.06746 5.09012 8.94891 5.90711 9.59169C4.50717 10.1526 3.28568 11.0828 2.37285 12.2833C1.46002 13.4838 0.890079 14.9094 0.723777 16.4084C0.711739 16.5178 0.721374 16.6285 0.752131 16.7342C0.782888 16.8399 0.834166 16.9386 0.903036 17.0245C1.04213 17.1979 1.24443 17.309 1.46544 17.3334C1.68646 17.3577 1.90808 17.2932 2.08155 17.1541C2.25502 17.015 2.36613 16.8127 2.39044 16.5917C2.57343 14.9627 3.35018 13.4582 4.57229 12.3657C5.7944 11.2732 7.37619 10.6692 9.01544 10.6692C10.6547 10.6692 12.2365 11.2732 13.4586 12.3657C14.6807 13.4582 15.4575 14.9627 15.6404 16.5917C15.6631 16.7965 15.7608 16.9856 15.9147 17.1225C16.0686 17.2595 16.2678 17.3346 16.4738 17.3334H16.5654C16.7839 17.3082 16.9835 17.1978 17.1209 17.0261C17.2583 16.8544 17.3222 16.6353 17.2988 16.4167C17.1317 14.9135 16.5587 13.4842 15.6412 12.2819C14.7236 11.0795 13.4962 10.1496 12.0904 9.59169ZM8.99878 9.00002C8.33951 9.00002 7.69504 8.80453 7.14688 8.43825C6.59871 8.07198 6.17147 7.55139 5.91918 6.9423C5.66689 6.33321 5.60087 5.66299 5.72949 5.01639C5.85811 4.36979 6.17558 3.77584 6.64175 3.30967C7.10793 2.84349 7.70187 2.52602 8.34848 2.39741C8.99508 2.26879 9.6653 2.3348 10.2744 2.58709C10.8835 2.83938 11.4041 3.26662 11.7703 3.81479C12.1366 4.36295 12.3321 5.00742 12.3321 5.66669C12.3321 6.55074 11.9809 7.39859 11.3558 8.02371C10.7307 8.64883 9.88283 9.00002 8.99878 9.00002Z"
                  fill="currentColor"
                />
              </svg>
              Profile
            </button>
            <button className="flex justify-start items-center gap-[16px] sm:gap-[12px] p-[16px] sm:p-[8px_24px] hover:text-gray-400">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.2481 12.378C15.3157 10.889 13.7276 10 12 10C10.2725 10 8.68429 10.889 7.75201 12.378L5.50519 15.9657C5.1324 16.5611 4.9604 17.2486 5.00767 17.954C5.05494 18.6596 5.31721 19.3166 5.76604 19.8543C6.21518 20.3919 6.80867 20.7592 7.4823 20.9168C8.15594 21.0743 8.84649 21.0071 9.47918 20.7225L9.52044 20.7037C11.1126 20.0012 12.9324 20.0075 14.5206 20.7225C14.9302 20.9068 15.3642 21 15.8021 21C16.0402 21 16.2797 20.9723 16.517 20.917C17.1907 20.7595 17.7841 20.3922 18.2334 19.8546C18.6824 19.3171 18.9449 18.6599 18.9923 17.9544C19.0397 17.2486 18.8677 16.5611 18.4949 15.9656L16.2481 12.378ZM17.3103 19.0465C16.7388 19.7303 15.8143 19.9465 15.0096 19.5844C14.0531 19.1538 13.0265 18.9386 11.9995 18.9386C10.9735 18.9386 9.94698 19.1536 8.99114 19.5837L8.96395 19.596C8.16542 19.9417 7.25449 19.7227 6.6893 19.0465C6.11843 18.3625 6.05345 17.3941 6.52773 16.6366L8.77471 13.0489C9.48266 11.9184 10.6883 11.2434 12 11.2434C13.3117 11.2434 14.5175 11.9184 15.2256 13.0489L17.4722 16.6365C17.9467 17.3943 17.8815 18.3628 17.3103 19.0465Z"
                  fill="currentColor"
                />
                <path
                  d="M5.49763 12.8405C6.12624 12.5765 6.60379 12.0227 6.84241 11.2809C7.06929 10.5751 7.05071 9.77818 6.78978 9.03689C6.52871 8.2961 6.05383 7.69137 5.45273 7.33389C4.82101 6.95853 4.12713 6.89741 3.49957 7.1619C2.23701 7.69267 1.65761 9.39859 2.20816 10.9655C2.64795 12.2127 3.67367 13 4.71069 13C4.97548 13 5.24102 12.9486 5.49763 12.8405ZM3.27417 10.5169C2.94976 9.59351 3.23478 8.61131 3.90992 8.32747C4.03183 8.2761 4.16073 8.25058 4.29231 8.25058C4.4954 8.25058 4.70519 8.31122 4.90709 8.43135C5.27016 8.64707 5.56023 9.02161 5.72377 9.48573C5.88717 9.95017 5.90174 10.4405 5.76466 10.8665C5.63902 11.257 5.39861 11.5441 5.08788 11.6746C4.41363 11.9588 3.59963 11.4394 3.27417 10.5169Z"
                  fill="currentColor"
                />
                <path
                  d="M9.99984 9C11.6541 9 13 7.43009 13 5.5004C13 3.57023 11.6541 2 9.99984 2C8.34573 2 7 3.57023 7 5.5004C7 7.43009 8.34573 9 9.99984 9ZM9.99984 3.22578C10.9939 3.22578 11.8028 4.24622 11.8028 5.5004C11.8028 6.7541 10.9939 7.77422 9.99984 7.77422C9.00582 7.77422 8.19723 6.7541 8.19723 5.5004C8.19723 4.24622 9.00582 3.22578 9.99984 3.22578Z"
                  fill="currentColor"
                />
                <path
                  d="M15.9387 9.87912C16.2117 9.96092 16.4904 10 16.7677 10C18.062 10 19.3233 9.14965 19.8046 7.84281C20.0818 7.09054 20.0635 6.29512 19.7533 5.60322C19.4286 4.87902 18.827 4.35327 18.059 4.12268C17.291 3.8924 16.46 3.98838 15.7196 4.39311C15.0123 4.77988 14.4703 5.40704 14.1936 6.15931C13.6094 7.74623 14.3922 9.41494 15.9387 9.87912ZM15.4125 6.52495C15.5932 6.03375 15.9386 5.62902 16.3851 5.38486C16.7982 5.15895 17.2489 5.10146 17.6539 5.22294C18.0588 5.34457 18.3815 5.634 18.5627 6.03813C18.7584 6.47485 18.7668 6.98581 18.5857 7.47701C18.2248 8.45729 17.2191 9.0413 16.344 8.77887C15.4695 8.5163 15.0515 7.50523 15.4125 6.52495Z"
                  fill="currentColor"
                />
                <path
                  d="M22.1082 10.4868C21.0511 9.58343 19.4697 9.97448 18.5833 11.3596C17.6978 12.7454 17.8362 14.6084 18.8917 15.5124C19.2767 15.8423 19.7315 16 20.197 16C21.0084 16 21.8525 15.5209 22.4166 14.6399C23.3022 13.2542 23.1639 11.3912 22.1082 10.4868ZM21.525 13.8764C21.0016 14.6937 20.1166 14.9648 19.5519 14.4809C18.9876 13.9977 18.9532 12.9396 19.4752 12.1228C19.8222 11.5806 20.329 11.2789 20.7961 11.2789C21.0324 11.2789 21.2585 11.3561 21.4485 11.5186C22.0123 12.0024 22.0466 13.0601 21.525 13.8764Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.50688 15.9659L7.7537 12.3782C8.68598 10.8892 10.2742 10.0002 12.0017 10.0002C13.7293 10.0002 15.3174 10.8892 16.2498 12.3782L18.4966 15.9658C18.8694 16.5613 19.0414 17.2488 18.994 17.9545C18.9466 18.6601 18.6841 19.3172 18.2351 19.8548C17.7858 20.3924 17.1923 20.7597 16.5187 20.9172C16.2814 20.9725 16.0419 21.0002 15.8038 21.0002C15.3659 21.0002 14.9319 20.907 14.5223 20.7227C12.9341 20.0077 11.1143 20.0014 9.52213 20.7039L9.48087 20.7227C8.84818 21.0073 8.15763 21.0745 7.48399 20.917C6.81036 20.7594 6.21687 20.3921 5.76773 19.8545C5.3189 19.3168 5.05663 18.6598 5.00936 17.9542C4.96209 17.2488 5.13409 16.5613 5.50688 15.9659ZM9.64468 20.9777C9.6442 20.9779 9.64371 20.9782 9.64323 20.9784L9.60396 20.9963C8.9114 21.3078 8.15362 21.3816 7.41571 21.2091C6.67791 21.0365 6.02782 20.6337 5.53751 20.0468C5.04767 19.46 4.76149 18.7424 4.71003 17.9743C4.65857 17.2063 4.84607 16.456 5.25261 15.8067L7.49943 12.219C8.48542 10.6442 10.1687 9.7002 12.0017 9.7002C13.8348 9.7002 15.5179 10.6443 16.5041 12.2189L17.8337 14.342C17.5532 13.3431 17.7218 12.1535 18.3322 11.1982C19.2842 9.7107 21.067 9.20113 22.3048 10.2589C23.5021 11.2846 23.6156 13.3237 22.6711 14.8017C22.062 15.7529 21.1299 16.3002 20.1987 16.3002C19.6725 16.3002 19.1574 16.1242 18.7221 15.7606L18.7509 15.8065C19.1574 16.4559 19.3449 17.2064 19.2933 17.9747C19.2417 18.7428 18.9554 19.4604 18.4654 20.0471C17.9749 20.6339 17.3249 21.0368 16.587 21.2093C16.3277 21.2698 16.0652 21.3002 15.8038 21.3002C15.3229 21.3002 14.847 21.1977 14.3992 20.9963C12.8891 20.3165 11.1587 20.3102 9.64468 20.9777ZM18.8934 15.5126C19.2784 15.8425 19.7332 16.0002 20.1987 16.0002C21.0101 16.0002 21.8542 15.5211 22.4183 14.6401C23.3039 13.2544 23.1656 11.3914 22.1099 10.487C21.0528 9.58363 19.4714 9.97467 18.585 11.3598C17.6994 12.7456 17.8379 14.6086 18.8934 15.5126ZM8.99284 19.5839C9.94867 19.1538 10.9752 18.9387 12.0012 18.9387C13.0282 18.9387 14.0548 19.154 15.0113 19.5846C15.816 19.9467 16.7405 19.7305 17.312 19.0467C17.8832 18.363 17.9483 17.3945 17.4739 16.6367L15.2272 13.0491C14.5191 11.9186 13.3134 11.2436 12.0017 11.2436C10.69 11.2436 9.48435 11.9186 8.7764 13.0491L6.52942 16.6368C6.05514 17.3943 6.12012 18.3627 6.691 19.0467C7.25618 19.7229 8.16711 19.9419 8.96564 19.5962L8.99284 19.5839ZM8.84433 19.3218L8.86921 19.3106C9.86425 18.8628 10.9333 18.6387 12.0012 18.6387C13.0701 18.6387 14.1388 18.8628 15.1344 19.311C15.8147 19.6172 16.5953 19.4364 17.0818 18.8543C17.5694 18.2707 17.6255 17.4441 17.2196 16.7959L14.973 13.2083C14.973 13.2083 14.973 13.2083 14.973 13.2083C14.3186 12.1636 13.2079 11.5436 12.0017 11.5436C10.7954 11.5436 9.6849 12.1636 9.03066 13.2083L6.7837 16.796C6.78369 16.796 6.7837 16.796 6.7837 16.796C6.37802 17.444 6.43395 18.2705 6.92132 18.8545C7.40195 19.4294 8.17002 19.6126 8.84433 19.3218ZM6.8441 11.2811C6.60548 12.0229 6.12793 12.5767 5.49932 12.8407C5.24271 12.9488 4.97717 13.0002 4.71238 13.0002C3.67536 13.0002 2.64964 12.2129 2.20985 10.9657C1.6593 9.39879 2.2387 7.69286 3.50126 7.1621C4.12882 6.89761 4.8227 6.95873 5.45442 7.33409C6.05552 7.69156 6.5304 8.29629 6.79147 9.03709C7.0524 9.77837 7.07098 10.5753 6.8441 11.2811ZM3.385 6.88554C4.10804 6.58091 4.90168 6.6567 5.60767 7.07618C6.27658 7.47398 6.79303 8.13896 7.07441 8.93737C7.35572 9.73655 7.37788 10.6008 7.12971 11.3729C6.86854 12.1847 6.33684 12.8144 5.61549 13.1173C5.32149 13.2411 5.0164 13.3002 4.71238 13.3002C3.52058 13.3002 2.39907 12.4044 1.92693 11.0655C1.34096 9.39774 1.93274 7.49605 3.385 6.88554ZM3.91161 8.32767C3.23647 8.6115 2.95145 9.5937 3.27587 10.5171C3.60132 11.4396 4.41532 11.959 5.08957 11.6748C5.40031 11.5443 5.64072 11.2572 5.76635 10.8667C5.90343 10.4407 5.88886 9.95036 5.72546 9.48592C5.56192 9.02181 5.27185 8.64726 4.90878 8.43154C4.70688 8.31141 4.49709 8.25078 4.294 8.25078C4.16242 8.25078 4.03352 8.2763 3.91161 8.32767ZM5.44246 9.58549C5.29821 9.1762 5.04839 8.86345 4.75554 8.68946C4.59401 8.59334 4.43648 8.55078 4.294 8.55078C4.20174 8.55078 4.1125 8.56856 4.0281 8.60413C3.79522 8.70203 3.60408 8.93182 3.50701 9.26618C3.41042 9.59888 3.41613 10.0112 3.55888 10.4175C3.70219 10.8236 3.94819 11.1263 4.21332 11.2956C4.47693 11.4638 4.74512 11.4944 4.97306 11.3984C5.18572 11.309 5.37558 11.1018 5.48076 10.7748C5.59574 10.4175 5.58642 9.99468 5.44246 9.58549ZM15.8542 10.1667C14.1285 9.64869 13.2748 7.79142 13.9138 6.05585C14.2157 5.23504 14.8068 4.55142 15.5773 4.13009C16.384 3.68912 17.2977 3.5809 18.1468 3.83552C18.9973 4.09085 19.668 4.67607 20.0287 5.48069C20.373 6.24856 20.3904 7.1255 20.0878 7.94668C19.5633 9.37075 18.1902 10.3002 16.7694 10.3002C16.4638 10.3002 16.1559 10.2571 15.8542 10.1667ZM19.8063 7.843C20.0835 7.09074 20.0652 6.29532 19.755 5.60341C19.4303 4.87922 18.8287 4.35346 18.0607 4.12288C17.2927 3.8926 16.4617 3.98857 15.7213 4.3933C15.014 4.78007 14.472 5.40724 14.1953 6.1595C13.611 7.74642 14.3939 9.41513 15.9404 9.87932C16.2134 9.96111 16.4921 10.0002 16.7694 10.0002C18.0637 10.0002 19.325 9.14984 19.8063 7.843ZM15.6957 6.6288C15.3797 7.48709 15.7615 8.29035 16.4318 8.49171C17.1232 8.69904 17.9875 8.23847 18.3059 7.37355C18.4626 6.94849 18.4512 6.51924 18.2906 6.16103C18.1431 5.83207 17.8864 5.60569 17.5693 5.51045C17.2502 5.41478 16.8821 5.4561 16.5307 5.64826C16.1498 5.85657 15.8521 6.20363 15.6957 6.6288ZM17.6556 5.22313C18.0605 5.34476 18.3832 5.6342 18.5644 6.03832C18.7601 6.47504 18.7685 6.98601 18.5874 7.47721C18.2265 8.45749 17.2208 9.04149 16.3457 8.77907C15.4712 8.51649 15.0532 7.50543 15.4142 6.52514C15.5949 6.03395 15.9403 5.62922 16.3868 5.38505C16.7999 5.15915 17.2506 5.10165 17.6556 5.22313ZM19.5536 14.4811C20.1183 14.965 21.0033 14.6939 21.5267 13.8766C22.0483 13.0603 22.014 12.0026 21.4502 11.5188C21.2602 11.3563 21.034 11.2791 20.7978 11.2791C20.3307 11.2791 19.8239 11.5808 19.4769 12.123C18.9549 12.9398 18.9893 13.9979 19.5536 14.4811ZM19.7296 12.2847C19.5008 12.6428 19.3959 13.0518 19.4077 13.4174C19.4197 13.7859 19.5478 14.0812 19.7487 14.2533C19.9422 14.4191 20.1942 14.4638 20.4678 14.38C20.7463 14.2946 21.0442 14.0737 21.2741 13.7148C21.5026 13.357 21.6075 12.9482 21.5956 12.5827C21.5837 12.2143 21.4558 11.9189 21.2549 11.7466C21.1217 11.6327 20.9657 11.5791 20.7978 11.5791C20.4585 11.5791 20.0367 11.8047 19.7296 12.2847ZM13.3017 5.50059C13.3017 7.55097 11.8632 9.3002 10.0015 9.3002C8.14003 9.3002 6.70169 7.55093 6.70169 5.50059C6.70169 3.44984 8.13998 1.7002 10.0015 1.7002C11.8632 1.7002 13.3017 3.44981 13.3017 5.50059ZM11.5045 5.50059C11.5045 4.34336 10.7686 3.52597 10.0015 3.52597C9.2345 3.52597 8.49892 4.34329 8.49892 5.50059C8.49892 6.65732 9.23442 7.47442 10.0015 7.47442C10.7687 7.47442 11.5045 6.65725 11.5045 5.50059ZM13.0017 5.50059C13.0017 7.43028 11.6558 9.0002 10.0015 9.0002C8.34742 9.0002 7.00169 7.43028 7.00169 5.50059C7.00169 3.57043 8.34742 2.0002 10.0015 2.0002C11.6558 2.0002 13.0017 3.57043 13.0017 5.50059ZM11.8045 5.50059C11.8045 4.24642 10.9956 3.22597 10.0015 3.22597C9.00751 3.22597 8.19892 4.24642 8.19892 5.50059C8.19892 6.75429 9.00751 7.77442 10.0015 7.77442C10.9956 7.77442 11.8045 6.75429 11.8045 5.50059Z"
                  fill="currentColor"
                />
              </svg>
              Your pet
            </button>
            <button className="flex justify-start items-center gap-[16px] sm:gap-[12px] p-[16px] sm:p-[8px_24px] hover:text-gray-400">
              <svg
                width="20"
                height="20"
                viewBox="0 0 18 10"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.09316 8.575C2.01391 8.49913 1.92046 8.43966 1.81816 8.4C1.61528 8.31665 1.38771 8.31665 1.18483 8.4C1.08254 8.43966 0.989082 8.49913 0.909829 8.575C0.833962 8.65425 0.774491 8.74771 0.734829 8.85C0.671013 9.00176 0.653577 9.16902 0.684723 9.33068C0.715868 9.49234 0.794198 9.64115 0.909829 9.75833C0.99083 9.83194 1.08384 9.89113 1.18483 9.93333C1.28458 9.97742 1.39244 10.0002 1.5015 10.0002C1.61055 10.0002 1.71841 9.97742 1.81816 9.93333C1.91915 9.89113 2.01216 9.83194 2.09316 9.75833C2.20879 9.64115 2.28712 9.49234 2.31827 9.33068C2.34941 9.16902 2.33198 9.00176 2.26816 8.85C2.2285 8.74771 2.16903 8.65425 2.09316 8.575ZM4.83483 1.66667H16.5015C16.7225 1.66667 16.9345 1.57887 17.0908 1.42259C17.247 1.26631 17.3348 1.05435 17.3348 0.833333C17.3348 0.61232 17.247 0.400358 17.0908 0.244078C16.9345 0.0877975 16.7225 0 16.5015 0H4.83483C4.61382 0 4.40185 0.0877975 4.24557 0.244078C4.08929 0.400358 4.0015 0.61232 4.0015 0.833333C4.0015 1.05435 4.08929 1.26631 4.24557 1.42259C4.40185 1.57887 4.61382 1.66667 4.83483 1.66667ZM2.09316 4.40833C1.97598 4.2927 1.82717 4.21437 1.66551 4.18323C1.50385 4.15208 1.33659 4.16952 1.18483 4.23333C1.08384 4.27553 0.99083 4.33472 0.909829 4.40833C0.833962 4.48759 0.774491 4.58104 0.734829 4.68333C0.690741 4.78308 0.667969 4.89094 0.667969 5C0.667969 5.10906 0.690741 5.21692 0.734829 5.31667C0.777031 5.41765 0.83622 5.51067 0.909829 5.59167C0.99083 5.66528 1.08384 5.72446 1.18483 5.76667C1.28458 5.81075 1.39244 5.83353 1.5015 5.83353C1.61055 5.83353 1.71841 5.81075 1.81816 5.76667C1.91915 5.72446 2.01216 5.66528 2.09316 5.59167C2.16677 5.51067 2.22596 5.41765 2.26816 5.31667C2.31225 5.21692 2.33502 5.10906 2.33502 5C2.33502 4.89094 2.31225 4.78308 2.26816 4.68333C2.2285 4.58104 2.16903 4.48759 2.09316 4.40833ZM16.5015 4.16667H4.83483C4.61382 4.16667 4.40185 4.25446 4.24557 4.41074C4.08929 4.56702 4.0015 4.77899 4.0015 5C4.0015 5.22101 4.08929 5.43297 4.24557 5.58926C4.40185 5.74554 4.61382 5.83333 4.83483 5.83333H16.5015C16.7225 5.83333 16.9345 5.74554 17.0908 5.58926C17.247 5.43297 17.3348 5.22101 17.3348 5C17.3348 4.77899 17.247 4.56702 17.0908 4.41074C16.9345 4.25446 16.7225 4.16667 16.5015 4.16667ZM2.09316 0.241667C2.01391 0.165799 1.92046 0.106329 1.81816 0.0666666C1.6664 0.00285041 1.49914 -0.0145849 1.33748 0.0165602C1.17583 0.0477053 1.02702 0.126035 0.909829 0.241667C0.83622 0.322667 0.777031 0.415679 0.734829 0.516667C0.690741 0.616417 0.667969 0.724274 0.667969 0.833333C0.667969 0.942392 0.690741 1.05025 0.734829 1.15C0.777031 1.25099 0.83622 1.344 0.909829 1.425C0.99083 1.49861 1.08384 1.5578 1.18483 1.6C1.33659 1.66382 1.50385 1.68125 1.66551 1.65011C1.82717 1.61896 1.97598 1.54063 2.09316 1.425C2.16677 1.344 2.22596 1.25099 2.26816 1.15C2.31225 1.05025 2.33502 0.942392 2.33502 0.833333C2.33502 0.724274 2.31225 0.616417 2.26816 0.516667C2.22596 0.415679 2.16677 0.322667 2.09316 0.241667ZM16.5015 8.33333H4.83483C4.61382 8.33333 4.40185 8.42113 4.24557 8.57741C4.08929 8.73369 4.0015 8.94565 4.0015 9.16667C4.0015 9.38768 4.08929 9.59964 4.24557 9.75592C4.40185 9.9122 4.61382 10 4.83483 10H16.5015C16.7225 10 16.9345 9.9122 17.0908 9.75592C17.247 9.59964 17.3348 9.38768 17.3348 9.16667C17.3348 8.94565 17.247 8.73369 17.0908 8.57741C16.9345 8.42113 16.7225 8.33333 16.5015 8.33333Z"
                  fill="currentColor"
                />
              </svg>
              Hisyory
            </button>
          </div>
          <div className="py-[8px] border-t border-gray-200 flex flex-col gap-[16px]">
            <button
              className="flex justify-start items-center gap-[16px] sm:gap-[12px] p-[16px] sm:p-[8px_24px] hover:text-gray-400"
              onClick={handleOpenModal}
            >
              <svg
                width="20"
                height="16.67"
                viewBox="0 0 14 18"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.332031 8.99996C0.332031 9.22097 0.419829 9.43293 0.576109 9.58922C0.732389 9.7455 0.944351 9.83329 1.16536 9.83329H7.49036L5.5737 11.7416C5.49559 11.8191 5.4336 11.9113 5.39129 12.0128C5.34898 12.1144 5.3272 12.2233 5.3272 12.3333C5.3272 12.4433 5.34898 12.5522 5.39129 12.6538C5.4336 12.7553 5.49559 12.8475 5.5737 12.925C5.65117 13.0031 5.74333 13.0651 5.84488 13.1074C5.94643 13.1497 6.05535 13.1715 6.16536 13.1715C6.27537 13.1715 6.3843 13.1497 6.48585 13.1074C6.58739 13.0651 6.67956 13.0031 6.75703 12.925L10.0904 9.59163C10.1662 9.51237 10.2257 9.41892 10.2654 9.31663C10.3487 9.11374 10.3487 8.88618 10.2654 8.68329C10.2257 8.581 10.1662 8.48755 10.0904 8.40829L6.75703 5.07496C6.67933 4.99726 6.58709 4.93563 6.48557 4.89358C6.38405 4.85153 6.27525 4.82988 6.16536 4.82988C6.05548 4.82988 5.94667 4.85153 5.84516 4.89358C5.74364 4.93563 5.6514 4.99726 5.5737 5.07496C5.496 5.15266 5.43436 5.2449 5.39231 5.34642C5.35026 5.44794 5.32862 5.55674 5.32862 5.66663C5.32862 5.77651 5.35026 5.88532 5.39231 5.98683C5.43436 6.08835 5.496 6.18059 5.5737 6.25829L7.49036 8.16663H1.16536C0.944351 8.16663 0.732389 8.25442 0.576109 8.4107C0.419829 8.56698 0.332031 8.77895 0.332031 8.99996ZM11.1654 0.666626H2.83203C2.16899 0.666626 1.53311 0.930018 1.06426 1.39886C0.595423 1.8677 0.332031 2.50358 0.332031 3.16663V5.66663C0.332031 5.88764 0.419829 6.0996 0.576109 6.25588C0.732389 6.41216 0.944351 6.49996 1.16536 6.49996C1.38638 6.49996 1.59834 6.41216 1.75462 6.25588C1.9109 6.0996 1.9987 5.88764 1.9987 5.66663V3.16663C1.9987 2.94561 2.0865 2.73365 2.24278 2.57737C2.39906 2.42109 2.61102 2.33329 2.83203 2.33329H11.1654C11.3864 2.33329 11.5983 2.42109 11.7546 2.57737C11.9109 2.73365 11.9987 2.94561 11.9987 3.16663V14.8333C11.9987 15.0543 11.9109 15.2663 11.7546 15.4225C11.5983 15.5788 11.3864 15.6666 11.1654 15.6666H2.83203C2.61102 15.6666 2.39906 15.5788 2.24278 15.4225C2.0865 15.2663 1.9987 15.0543 1.9987 14.8333V12.3333C1.9987 12.1123 1.9109 11.9003 1.75462 11.744C1.59834 11.5878 1.38638 11.5 1.16536 11.5C0.944351 11.5 0.732389 11.5878 0.576109 11.744C0.419829 11.9003 0.332031 12.1123 0.332031 12.3333V14.8333C0.332031 15.4963 0.595423 16.1322 1.06426 16.6011C1.53311 17.0699 2.16899 17.3333 2.83203 17.3333H11.1654C11.8284 17.3333 12.4643 17.0699 12.9331 16.6011C13.402 16.1322 13.6654 15.4963 13.6654 14.8333V3.16663C13.6654 2.50358 13.402 1.8677 12.9331 1.39886C12.4643 0.930018 11.8284 0.666626 11.1654 0.666626Z"
                  fill="currentColor"
                />
              </svg>
              Logout
            </button>
            <Link
              href=""
              className="sm:hidden bg-orange-500 text-white rounded-full text-[16px] font-bold lg:p-[16px_24px] p-[16px_20px] hover:bg-orange-400 active:bg-orange-600"
            >
              Find A Pet Sitter
            </Link>
          </div>

          <LogoutModal
            isOpen={confirmLogout}
            onClose={handleCloseModal}
            setDropdownOpen={setIsOpen}
          />
        </nav>
      )}

      {isOpen && !session && (
        <nav className="rounded-[4px] z-50 mt-2 p-[40px_16px] sm:p-[0px_4px] absolute top-[48px] sm:top-[70px] w-screen sm:w-[186px] sm:right-20 bg-white text-black text-body1 shadow-lg shadow-black/4">
          <div className="flex flex-col f  py-[8px] gap-[16px] ">
            <button
              className="p-[16px] text-left hover:text-orange-500 active:text-orange-600"
              onClick={() => {
                setIsLoading(true);

                router.push("/login/sitter");
              }}
            >
              Become a Pet Sitter
            </button>
            <button
              className="p-[16px] text-left hover:text-orange-500 active:text-orange-600"
              onClick={() => {
                setIsLoading(true);

                router.push("/login");
              }}
            >
              Login
            </button>
            <button
              className="bg-orange-500  w-full text-white rounded-full text-[16px] font-bold  p-[16px_20px] hover:bg-orange-400 active:bg-orange-600"
              onClick={() => {
                setIsLoading(true);

                router.push("/");
              }}
            >
              Find A Pet Sitter
            </button>
          </div>
        </nav>
      )}
    </nav>
  );
}

export default Navbar;
