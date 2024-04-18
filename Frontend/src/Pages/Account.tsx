import Footer from "../components/Footer"
import Header from "../components/Header"
import { CiEdit } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa6";
import { IoExitOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { ReactNode, useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import Button from "../components/Button";
import LikedProduct from "../components/LikedProduct";
import UserPanelTemplate from "../components/UserPanelTemplate";
import UserDataUpdater from "../components/UserDataUpdater"

interface orderStatusProps {
    count: number
    text: string
    status: "processing" | "delivered" | "returned"
}

const Account = () => {

    const [activeMenu, setActiveMenu] = useState("account-details")
    const [userdataToRender, setUserdataToRender] = useState<ReactNode | null>(null)
    const [activeEditShown, setActiveEditShown] = useState<Record<string, unknown> | null>(null)
    const activeEditChanger = (prop: string) => { setActiveEditShown({ [prop]: true }) }
    const dataEditorCloser = () => setActiveEditShown(null)

    useEffect(() => {
        switch (activeMenu) {
            case "orders":
                setUserdataToRender(
                    <UserPanelTemplate title="سفارش های من">
                        <div className="flex items-center justify-evenly gap-4 border-gray-700 p-3">
                            <OrderStatus count={2} status="processing" text="جاری" />
                            <OrderStatus count={0} status="delivered" text="تحویل شده" />
                            <OrderStatus count={1} status="returned" text="مرجوع شده" />
                        </div>
                    </UserPanelTemplate>
                );
                break;
            case "likes":
                setUserdataToRender(
                    <UserPanelTemplate title="علاقه مندی ها">
                        <div className="grid grid-cols-3 ml-auto p-3 gap-3">
                            {[3, 4, 5].map(prd => <LikedProduct key={prd} />)}
                        </div>
                    </UserPanelTemplate>
                );
                break;
            case "messages":
                setUserdataToRender(
                    <UserPanelTemplate title="پیغام‌ها">
                        <div className="flex flex-col gap-2 p-3">
                            <div data-aos-duration="600" data-aos="fade-right" className="rounded-md p-2 w-full text-[14px] border border-gray-600/15 flex items-center justify-between bg-secondary-black bg-black/15">
                                <p>پیغام‌ خوشامد گویی</p>
                                <Button Icon={<IoTrashOutline />} fn={() => { }} />
                            </div>
                            <div data-aos-duration="600" data-aos="fade-right" className="rounded-md p-2 w-full text-[14px] border border-gray-600/15 flex items-center justify-between bg-secondary-black bg-black/15">
                                <p>پیغام‌ خوشامد گویی</p>
                                <Button Icon={<IoTrashOutline />} fn={() => { }} />
                            </div>
                        </div>
                    </UserPanelTemplate>
                );
                break;
            default:
                setUserdataToRender(
                    <UserPanelTemplate title="اطلاعات شخصی">
                        <div className="grid grid-cols-2 ch:border ch:border-gray-600/15">

                            <UserDataUpdater
                                dataEditorCloser={dataEditorCloser}
                                fn={() => { }}
                                name="name-lname"
                                title="نام و نام خانوادگی"
                                inputValue="مهدی رضایی"
                                readOnly={!activeEditShown?.fullName}
                                editToggle={() => activeEditChanger("fullName")}
                            />

                            <UserDataUpdater
                                dataEditorCloser={dataEditorCloser}
                                fn={() => { }}
                                name="meli-code"
                                title="کد ملی"
                                inputValue="344363456"
                                readOnly={!activeEditShown?.meliCode}
                                editToggle={() => activeEditChanger("meliCode")}
                            />

                            <UserDataUpdater
                                dataEditorCloser={dataEditorCloser}
                                fn={() => { }}
                                name="phonoNumber"
                                title="شماره موبایل"
                                inputValue="۰۹۰۳۴۳۴۵۳۴۵"
                                readOnly={!activeEditShown?.phonoNumber}
                                editToggle={() => activeEditChanger("phonoNumber")}
                            />

                            <UserDataUpdater
                                dataEditorCloser={dataEditorCloser}
                                fn={() => { }}
                                name="email"
                                title="ایمیل"
                                inputValue="eftekharierfan5555555555@gmial.com"
                                readOnly={!activeEditShown?.email}
                                editToggle={() => activeEditChanger("email")}
                            />

                            <UserDataUpdater
                                dataEditorCloser={dataEditorCloser}
                                fn={() => { }}
                                name="changePass"
                                title="تغییر رمز عبور"
                                inputValue="54897540987"
                                readOnly={!activeEditShown?.changePass}
                                editToggle={() => activeEditChanger("changePass")}
                            />

                            <UserDataUpdater
                                dataEditorCloser={dataEditorCloser}
                                fn={() => { }}
                                name="cashBack"
                                title="باز گرداندن پول به این شماره کارت"
                                inputValue="6037998194989710"
                                readOnly={!activeEditShown?.cashBack}
                                editToggle={() => activeEditChanger("cashBack")}
                            />

                        </div>
                    </UserPanelTemplate>
                );
        }
    }, [activeMenu, activeEditShown])

    return (

        <section className="bg-primary-black">

            <Header />

            <span className='md:pt-[160px] pt-[130px] block'></span>


            <div className="flex container gap-5 text-white text-[12px] mb-5">

                <div data-aos-duration="600" data-aos="fade-left" className="flex-1 ch:px-3 ch:relative ch:py-5 overflow-hidden ch:transition-all bg-secondary-black border border-dark-gold ch:duration-300 h-min rounded-md">

                    <div className={`flex items-center justify-between border-b border-gray-600/15 pb-2 hover:bg-black/15`}>
                        <div className="flex items-center flex-col gap-1">
                            <p className="text-[15px]">مهدی راضایی</p>
                            <p className="text-[13px] text-description-text">09032754452</p>
                        </div>
                        <CiEdit onClick={() => setActiveMenu("account-details")} className="size-7 text-blue-white cursor-pointer" />
                    </div>

                    <div onClick={() => setActiveMenu("account-details")} className={`flex items-center gap-2 border-b ${activeMenu == "account-details" && "activeMenu ch:mr-2"} border-gray-600/15 pb-3 cursor-pointer hover:bg-black/15`}>
                        <FaRegUser className="size-5" />
                        <p>اطلاعات حساب کاربری</p>
                    </div>

                    <div onClick={() => setActiveMenu("orders")} className={`flex ${activeMenu == "orders" && "activeMenu ch:mr-2"} items-center relative gap-2 border-b border-gray-600/15 pb-3 cursor-pointer hover:bg-black/15`}>
                        <IoBagHandleOutline className="size-5" />
                        <p>سفارش ها</p>
                    </div>

                    <div onClick={() => setActiveMenu("likes")} className={`flex ${activeMenu == "likes" && "activeMenu ch:mr-2"} items-center gap-2 border-b border-gray-600/15 pb-3 cursor-pointer hover:bg-black/15`}>
                        <FaRegHeart className="size-[17px]" />
                        <p>لیست های من</p>
                    </div>

                    <div onClick={() => setActiveMenu("messages")} className={`flex items-center ${activeMenu == "messages" && "activeMenu ch:mr-2"} justify-between border-b border-gray-600/15 pb-3 cursor-pointer hover:bg-black/15`}>
                        <div className="flex items-center gap-2">
                            <FaRegBell className="size-5" />
                            <p>پیغام‌ها</p>
                        </div>
                        <div className="bg-white-red text-[15px] flex-center size-5 rounded-sm text-center">5</div>
                    </div>

                    <div className="flex text-white-red items-center gap-2 border-b border-gray-600/15 pb-3 cursor-pointer hover:bg-black/15">
                        <IoExitOutline className="size-5" />
                        <p>خروج</p>
                    </div>

                </div>

                {userdataToRender}

            </div>

            <Footer />

        </section>

    )
}


const OrderStatus = ({ count, status, text }: orderStatusProps) => {

    const [src, setSrc] = useState<orderStatusProps["status"] | null>(null)

    useEffect(() => {

        switch (status) {
            case "returned": { setSrc("returned"); break }
            case "delivered": { setSrc("delivered"); break }
            case "processing": { setSrc("processing"); break }
        }

    }, [status])

    return (
        <div className="flex items-center gap-3 mt-10">
            <div><img src={`/images/${src}.svg`} /></div>
            <div className="flex items-center gap-3 flex-col">
                <p className="text-white font-bold text-[14px]">{count} سفارش</p>
                <p className="text-description-text">{text}</p>
            </div>
        </div>
    )
}

export default Account;